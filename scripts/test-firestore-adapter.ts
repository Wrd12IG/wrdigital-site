// Test dell'adattatore su MemoryStore: npx tsx scripts/test-firestore-adapter.ts
import assert from 'node:assert/strict';
import { createClient } from '../lib/db/client';
import { MemoryStore } from '../lib/db/store';

(async () => {
    const db: any = createClient(new MemoryStore());

    // default + id + date
    const l1 = await db.lead.create({ data: { email: 'a@x.it', source: 'newsletter' } });
    await new Promise((r) => setTimeout(r, 5));
    const l2 = await db.lead.create({ data: { email: 'b@x.it', source: 'contact_form', name: 'Bruno' } });
    await new Promise((r) => setTimeout(r, 5));
    await db.lead.create({ data: { email: 'c@x.it', source: 'contact_form' } });
    assert.equal(l1.status, 'new');
    assert.equal(l1.phone, null);
    assert.ok(l1.createdAt instanceof Date && l1.id);

    // where / orderBy / take / count / groupBy
    const recent = await db.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 2 });
    assert.equal(recent.length, 2);
    assert.equal(recent[0].email, 'c@x.it');
    assert.equal(await db.lead.count({ where: { source: 'newsletter' } }), 1);
    const groups = await db.lead.groupBy({ by: ['source'], _count: true });
    assert.deepEqual(Object.fromEntries(groups.map((g: any) => [g.source, g._count])), { newsletter: 1, contact_form: 2 });
    assert.equal((await db.lead.findMany({ where: { OR: [{ name: { contains: 'brun' } }, { email: 'a@x.it' }] } })).length, 2);

    // update + findUnique
    const u = await db.lead.update({ where: { id: l2.id }, data: { status: 'won' } });
    assert.equal(u.status, 'won');
    assert.ok(u.updatedAt >= l2.updatedAt);
    assert.equal((await db.lead.findUnique({ where: { id: l2.id } })).status, 'won');

    // unique + upsert (siteConfig)
    await db.siteConfig.upsert({ where: { key: 'k' }, update: { value: '2' }, create: { key: 'k', value: '1' } });
    await db.siteConfig.upsert({ where: { key: 'k' }, update: { value: '2' }, create: { key: 'k', value: '1' } });
    assert.equal(await db.siteConfig.count(), 1);
    assert.equal((await db.siteConfig.findUnique({ where: { key: 'k' } })).value, '2');
    await assert.rejects(db.user.create({ data: { email: 'u@x.it', password: 'h' } }).then(() => db.user.create({ data: { email: 'u@x.it', password: 'h' } })), (e: any) => e.code === 'P2002');

    // relazioni, _count, chiave composta, cascade
    const page = await db.page.create({ data: { slug: 'p', title: 'P', content: '{}' } });
    await db.seoMetadata.upsert({ where: { pageId: page.id }, update: { metaTitle: 'T' }, create: { pageId: page.id, metaTitle: 'T0' } });
    const withSeo = await db.page.findMany({ include: { seo: true }, orderBy: { updatedAt: 'desc' } });
    assert.equal(withSeo[0].seo.metaTitle, 'T0');
    assert.equal((await db.page.findUnique({ where: { slug: 'nope' } })), null);
    const block = await db.block.create({ data: { name: 'b', type: 't', content: '{}' } });
    await db.pageBlock.create({ data: { pageId: page.id, blockId: block.id, order: 1 } });
    const blocks = await db.block.findMany({ include: { _count: { select: { pageBlocks: true } } } });
    assert.equal(blocks[0]._count.pageBlocks, 1);
    assert.ok(await db.pageBlock.findUnique({ where: { pageId_blockId: { pageId: page.id, blockId: block.id } } }));
    await db.page.delete({ where: { id: page.id } });
    assert.equal(await db.seoMetadata.count(), 0);
    assert.equal(await db.pageBlock.count(), 0);

    // createMany / deleteMany / updateMany / select
    assert.deepEqual(await db.faq.createMany({ data: [{ question: 'q1', answer: 'a', order: 2 }, { question: 'q2', answer: 'a', order: 1 }] }), { count: 2 });
    assert.deepEqual((await db.faq.findMany({ where: { deleted: false }, orderBy: { order: 'asc' }, select: { question: true } })).map((f: any) => f.question), ['q2', 'q1']);
    assert.equal((await db.faq.updateMany({ where: { deleted: false }, data: { deleted: true } })).count, 2);
    assert.equal((await db.faq.deleteMany({ where: { deleted: true } })).count, 2);
    assert.equal(await db.faq.count(), 0);

    console.log('OK: adattatore Firestore (MemoryStore) — tutti i test passati');
})().catch((e) => { console.error(e); process.exit(1); });
