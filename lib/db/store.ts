// Livello di persistenza minimale: Firestore in produzione, memoria nei test.

export type Doc = Record<string, any>;

export interface Store {
    /** Tutti i documenti della collezione; `eq` è un filtro di uguaglianza opzionale (spinto a Firestore). */
    list(collection: string, eq?: [string, unknown]): Promise<Doc[]>;
    get(collection: string, id: string): Promise<Doc | null>;
    set(collection: string, id: string, data: Doc): Promise<void>;
    delete(collection: string, id: string): Promise<void>;
    setMany(collection: string, docs: { id: string; data: Doc }[]): Promise<void>;
    deleteMany(collection: string, ids: string[]): Promise<void>;
}

const toPlain = (id: string, data: Doc): Doc => {
    const out: Doc = { id };
    for (const [k, v] of Object.entries(data)) {
        out[k] = v && typeof v === 'object' && typeof (v as any).toDate === 'function' ? (v as any).toDate() : v;
    }
    return out;
};

const clean = (data: Doc): Doc => {
    const out: Doc = {};
    for (const [k, v] of Object.entries(data)) if (k !== 'id' && v !== undefined) out[k] = v;
    return out;
};

export class FirestoreStore implements Store {
    constructor(private db: FirebaseFirestore.Firestore) {}

    async list(collection: string, eq?: [string, unknown]) {
        let q: FirebaseFirestore.Query = this.db.collection(collection);
        if (eq) q = q.where(eq[0], '==', eq[1]);
        const snap = await q.get();
        return snap.docs.map((d) => toPlain(d.id, d.data()));
    }
    async get(collection: string, id: string) {
        const d = await this.db.collection(collection).doc(id).get();
        return d.exists ? toPlain(d.id, d.data()!) : null;
    }
    async set(collection: string, id: string, data: Doc) {
        await this.db.collection(collection).doc(id).set(clean(data));
    }
    async delete(collection: string, id: string) {
        await this.db.collection(collection).doc(id).delete();
    }
    async setMany(collection: string, docs: { id: string; data: Doc }[]) {
        for (let i = 0; i < docs.length; i += 400) {
            const batch = this.db.batch();
            for (const { id, data } of docs.slice(i, i + 400)) batch.set(this.db.collection(collection).doc(id), clean(data));
            await batch.commit();
        }
    }
    async deleteMany(collection: string, ids: string[]) {
        for (let i = 0; i < ids.length; i += 400) {
            const batch = this.db.batch();
            for (const id of ids.slice(i, i + 400)) batch.delete(this.db.collection(collection).doc(id));
            await batch.commit();
        }
    }
}

export class MemoryStore implements Store {
    private data = new Map<string, Map<string, Doc>>();
    private col(c: string) {
        if (!this.data.has(c)) this.data.set(c, new Map());
        return this.data.get(c)!;
    }
    async list(collection: string, eq?: [string, unknown]) {
        const rows: Doc[] = [...this.col(collection).entries()].map(([id, d]) => ({ ...d, id }));
        return eq ? rows.filter((r) => r[eq[0]] === eq[1]) : rows;
    }
    async get(collection: string, id: string) {
        const d = this.col(collection).get(id);
        return d ? { ...d, id } : null;
    }
    async set(collection: string, id: string, data: Doc) {
        this.col(collection).set(id, clean(data));
    }
    async delete(collection: string, id: string) {
        this.col(collection).delete(id);
    }
    async setMany(collection: string, docs: { id: string; data: Doc }[]) {
        for (const d of docs) await this.set(collection, d.id, d.data);
    }
    async deleteMany(collection: string, ids: string[]) {
        for (const id of ids) this.col(collection).delete(id);
    }
}
