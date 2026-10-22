// Client compatibile con la superficie di Prisma usata dal sito, con Firestore (o un altro Store) come backend.
import { randomUUID } from 'crypto';
import { DELEGATES, MODELS, type ModelMeta } from './meta';
import type { Doc, Store } from './store';

type Where = Record<string, any>;

export class UniqueConstraintError extends Error {
    code = 'P2002';
    constructor(model: string, fields: string[]) {
        super(`Unique constraint failed on ${model}(${fields.join(', ')})`);
    }
}

const isDate = (v: unknown): v is Date => v instanceof Date;
const norm = (v: unknown) => (isDate(v) ? v.getTime() : v);

function cmp(a: any, b: any): number {
    a = norm(a);
    b = norm(b);
    if (a === b) return 0;
    if (a === null || a === undefined) return 1; // i null vanno in fondo
    if (b === null || b === undefined) return -1;
    return a < b ? -1 : 1;
}

function matchField(value: any, cond: any): boolean {
    if (cond === null || typeof cond !== 'object' || isDate(cond)) return norm(value) === norm(cond);
    for (const [op, arg] of Object.entries(cond)) {
        const v = norm(value);
        const a = norm(arg);
        switch (op) {
            case 'equals': if (v !== a) return false; break;
            case 'not': if (matchField(value, arg)) return false; break;
            case 'in': if (!(arg as any[]).map(norm).includes(v)) return false; break;
            case 'notIn': if ((arg as any[]).map(norm).includes(v)) return false; break;
            case 'contains': if (typeof v !== 'string' || !v.toLowerCase().includes(String(a).toLowerCase())) return false; break;
            case 'startsWith': if (typeof v !== 'string' || !v.toLowerCase().startsWith(String(a).toLowerCase())) return false; break;
            case 'endsWith': if (typeof v !== 'string' || !v.toLowerCase().endsWith(String(a).toLowerCase())) return false; break;
            case 'gt': if (!(v != null && (v as any) > (a as any))) return false; break;
            case 'gte': if (!(v != null && (v as any) >= (a as any))) return false; break;
            case 'lt': if (!(v != null && (v as any) < (a as any))) return false; break;
            case 'lte': if (!(v != null && (v as any) <= (a as any))) return false; break;
            case 'mode': break; // sempre case-insensitive
            default: throw new Error(`Operatore Prisma non supportato: ${op}`);
        }
    }
    return true;
}

function matches(row: Doc, where?: Where): boolean {
    if (!where) return true;
    for (const [key, cond] of Object.entries(where)) {
        if (cond === undefined) continue;
        if (key === 'AND') { if (![].concat(cond).every((w: any) => matches(row, w))) return false; }
        else if (key === 'OR') { if (![].concat(cond).some((w: any) => matches(row, w))) return false; }
        else if (key === 'NOT') { if ([].concat(cond).some((w: any) => matches(row, w))) return false; }
        else if (!matchField(row[key], cond)) return false;
    }
    return true;
}

/** Espande una chiave unique composta (es. pageId_blockId: {pageId, blockId}) in condizioni semplici. */
function flattenWhere(where: Where = {}): Where {
    const out: Where = {};
    for (const [k, v] of Object.entries(where)) {
        if (/^[A-Za-z]+_[A-Za-z]+/.test(k) && v && typeof v === 'object' && !isDate(v) && !['AND', 'OR', 'NOT'].includes(k)) Object.assign(out, v);
        else out[k] = v;
    }
    return out;
}

function simpleEq(where?: Where): [string, unknown] | undefined {
    if (!where) return undefined;
    for (const [k, v] of Object.entries(where)) {
        if (['AND', 'OR', 'NOT', 'id'].includes(k)) continue;
        if (typeof v === 'string' || typeof v === 'boolean' || typeof v === 'number') return [k, v];
    }
    return undefined;
}

export function createClient(store: Store) {
    const newId = () => randomUUID().replace(/-/g, '');

    function hydrate(model: string, row: Doc): Doc {
        const meta = MODELS[model];
        const out = { ...row };
        for (const f of meta.optional || []) if (out[f] === undefined) out[f] = null;
        for (const f of meta.dates || []) if (typeof out[f] === 'string') out[f] = new Date(out[f]);
        return out;
    }

    async function load(model: string, where?: Where): Promise<Doc[]> {
        const w = flattenWhere(where);
        const rows = await store.list(model, simpleEq(w));
        return rows.map((r) => hydrate(model, r)).filter((r) => matches(r, w));
    }

    function sortRows(rows: Doc[], orderBy: any) {
        if (!orderBy) return rows;
        const specs: [string, 'asc' | 'desc'][] = [];
        for (const o of ([] as any[]).concat(orderBy)) for (const [k, d] of Object.entries(o)) specs.push([k, d as any]);
        return [...rows].sort((a, b) => {
            for (const [k, dir] of specs) {
                const c = cmp(a[k], b[k]);
                if (c !== 0) return dir === 'desc' ? -c : c;
            }
            return 0;
        });
    }

    async function shape(model: string, row: Doc, args: any): Promise<Doc> {
        const meta = MODELS[model];
        let out: Doc = row;
        const extras: Doc = {};
        const rels = { ...(args.include || {}), ...(args.select || {}) };
        for (const [name, spec] of Object.entries(rels)) {
            if (!spec) continue;
            if (name === '_count') {
                const counts: Doc = {};
                for (const rel of Object.keys((spec as any).select || {})) counts[rel] = (await resolveRelation(meta, row, rel)).length;
                extras._count = counts;
                continue;
            }
            const relMeta = meta.relations?.[name];
            if (!relMeta) continue;
            const related = await resolveRelation(meta, row, name);
            const sub = typeof spec === 'object' ? spec : {};
            const shaped = await Promise.all(related.map((r) => shape(relMeta.model, r, sub)));
            extras[name] = relMeta.kind === 'one' ? shaped[0] ?? null : shaped;
        }
        if (args.select) {
            out = {};
            for (const [k, on] of Object.entries(args.select)) if (on && row[k] !== undefined) out[k] = row[k];
        }
        return { ...out, ...extras };
    }

    async function resolveRelation(meta: ModelMeta, row: Doc, name: string): Promise<Doc[]> {
        const rel = meta.relations?.[name];
        if (!rel) throw new Error(`Relazione sconosciuta: ${name}`);
        if (rel.fkOn === 'self') {
            const target = row[rel.fk] ? await store.get(rel.model, row[rel.fk]) : null;
            return target ? [hydrate(rel.model, target)] : [];
        }
        const rows = await store.list(rel.model, [rel.fk, row.id]);
        return rows.map((r) => hydrate(rel.model, r));
    }

    async function assertUnique(model: string, data: Doc, ignoreId?: string) {
        for (const fields of MODELS[model].unique || []) {
            if (fields.some((f) => data[f] === undefined || data[f] === null)) continue;
            const rows = await store.list(model, [fields[0], data[fields[0]]]);
            const clash = rows.find((r) => r.id !== ignoreId && fields.every((f) => norm(r[f]) === norm(data[f])));
            if (clash) throw new UniqueConstraintError(model, fields);
        }
    }

    function buildNew(model: string, data: Doc): Doc {
        const meta = MODELS[model];
        const now = new Date();
        const row: Doc = { ...data };
        for (const [k, v] of Object.entries(meta.defaults || {})) if (row[k] === undefined) row[k] = v;
        if (meta.dates?.includes('createdAt') && !row.createdAt) row.createdAt = now;
        if (meta.updatedAt) row.updatedAt = row.updatedAt || now;
        return row;
    }

    async function create(model: string, args: any) {
        const id = args.data.id || newId();
        const row = buildNew(model, args.data);
        await assertUnique(model, row);
        await store.set(model, id, row);
        return shape(model, hydrate(model, { ...row, id }), args);
    }

    async function findFirst(model: string, args: any = {}) {
        let rows = sortRows(await load(model, args.where), args.orderBy);
        if (args.skip) rows = rows.slice(args.skip);
        return rows[0] ? shape(model, rows[0], args) : null;
    }

    async function update(model: string, args: any) {
        const current = (await load(model, args.where))[0];
        if (!current) throw Object.assign(new Error(`Record to update not found (${model})`), { code: 'P2025' });
        const next = { ...current, ...args.data };
        if (MODELS[model].updatedAt) next.updatedAt = new Date();
        await assertUnique(model, next, current.id);
        await store.set(model, current.id, next);
        return shape(model, hydrate(model, next), args);
    }

    async function remove(model: string, id: string) {
        for (const c of MODELS[model].cascade || []) {
            const kids = await store.list(c.model, [c.fk, id]);
            if (kids.length) await removeMany(c.model, kids.map((k) => k.id));
        }
        await store.delete(model, id);
    }

    async function removeMany(model: string, ids: string[]) {
        for (const c of MODELS[model].cascade || []) {
            for (const id of ids) {
                const kids = await store.list(c.model, [c.fk, id]);
                if (kids.length) await removeMany(c.model, kids.map((k) => k.id));
            }
        }
        await store.deleteMany(model, ids);
    }

    function delegate(model: string) {
        return {
            async findMany(args: any = {}) {
                let rows = sortRows(await load(model, args.where), args.orderBy);
                if (args.skip) rows = rows.slice(args.skip);
                if (args.take !== undefined) rows = rows.slice(0, args.take);
                return Promise.all(rows.map((r) => shape(model, r, args)));
            },
            findFirst: (args?: any) => findFirst(model, args),
            findUnique: (args: any) => findFirst(model, args),
            async findFirstOrThrow(args: any) {
                const r = await findFirst(model, args);
                if (!r) throw Object.assign(new Error('No record found'), { code: 'P2025' });
                return r;
            },
            findUniqueOrThrow(args: any) { return this.findFirstOrThrow(args); },
            create: (args: any) => create(model, args),
            async createMany(args: any) {
                const list = ([] as Doc[]).concat(args.data);
                const docs: { id: string; data: Doc }[] = [];
                for (const d of list) {
                    const row = buildNew(model, d);
                    try { await assertUnique(model, row); } catch (e) { if (args.skipDuplicates) continue; throw e; }
                    docs.push({ id: d.id || newId(), data: row });
                }
                await store.setMany(model, docs);
                return { count: docs.length };
            },
            update: (args: any) => update(model, args),
            async updateMany(args: any) {
                const rows = await load(model, args.where);
                const now = new Date();
                await store.setMany(model, rows.map((r) => ({
                    id: r.id,
                    data: { ...r, ...args.data, ...(MODELS[model].updatedAt ? { updatedAt: now } : {}) },
                })));
                return { count: rows.length };
            },
            async upsert(args: any) {
                const exists = (await load(model, args.where))[0];
                return exists ? update(model, { where: args.where, data: args.update, include: args.include, select: args.select })
                    : create(model, { data: { ...flattenWhere(args.where), ...args.create }, include: args.include, select: args.select });
            },
            async delete(args: any) {
                const current = (await load(model, args.where))[0];
                if (!current) throw Object.assign(new Error(`Record to delete not found (${model})`), { code: 'P2025' });
                await remove(model, current.id);
                return current;
            },
            async deleteMany(args: any = {}) {
                const rows = await load(model, args.where);
                await removeMany(model, rows.map((r) => r.id));
                return { count: rows.length };
            },
            async count(args: any = {}) {
                return (await load(model, args.where)).length;
            },
            async groupBy(args: any) {
                const rows = await load(model, args.where);
                const groups = new Map<string, Doc[]>();
                for (const r of rows) {
                    const key = JSON.stringify(args.by.map((f: string) => norm(r[f])));
                    groups.set(key, [...(groups.get(key) || []), r]);
                }
                return [...groups.values()].map((g) => {
                    const out: Doc = {};
                    for (const f of args.by) out[f] = g[0][f];
                    if (args._count) out._count = args._count === true ? g.length : { _all: g.length };
                    return out;
                });
            },
        };
    }

    const delegates: Record<string, ReturnType<typeof delegate>> = {};
    for (const [name, model] of Object.entries(DELEGATES)) delegates[name] = delegate(model);
    return Object.assign(delegates, {
        async $connect() {},
        async $disconnect() {},
        async $transaction(arg: any) {
            return Array.isArray(arg) ? Promise.all(arg) : arg(delegates);
        },
    });
}
