// Metadati dei modelli (derivati da prisma/schema.prisma) usati dall'adattatore Firestore.
// Se cambi lo schema Prisma, aggiorna anche questo file.

export type Relation = { kind: 'one' | 'many'; model: string; fk: string; fkOn: 'self' | 'other' };

export type ModelMeta = {
    defaults?: Record<string, unknown>;
    optional?: string[];          // campi nullable: se assenti vengono letti come null
    dates?: string[];             // campi DateTime
    updatedAt?: boolean;          // @updatedAt
    unique?: string[][];          // vincoli unique (anche composti)
    relations?: Record<string, Relation>;
    cascade?: { model: string; fk: string }[]; // figli da eliminare con onDelete: Cascade
};

const ts = ['createdAt', 'updatedAt'];

export const MODELS: Record<string, ModelMeta> = {
    Testimonial: { defaults: { rating: 5, deleted: false }, optional: ['company', 'result'], dates: ts, updatedAt: true },
    Page: {
        defaults: { published: false }, dates: ts, updatedAt: true, unique: [['slug']],
        relations: {
            seo: { kind: 'one', model: 'SeoMetadata', fk: 'pageId', fkOn: 'other' },
            pageBlocks: { kind: 'many', model: 'PageBlock', fk: 'pageId', fkOn: 'other' },
            schemaMarkup: { kind: 'many', model: 'SchemaMarkup', fk: 'pageId', fkOn: 'other' },
        },
        cascade: [{ model: 'SeoMetadata', fk: 'pageId' }, { model: 'SchemaMarkup', fk: 'pageId' }, { model: 'PageBlock', fk: 'pageId' }],
    },
    SeoMetadata: {
        defaults: { robotsIndex: true, robotsFollow: true },
        optional: ['metaTitle', 'metaDescription', 'canonicalUrl', 'focusKeyword', 'ogTitle', 'ogDescription', 'ogImage'],
        unique: [['pageId']],
        relations: { page: { kind: 'one', model: 'Page', fk: 'pageId', fkOn: 'self' } },
    },
    SchemaMarkup: { relations: { page: { kind: 'one', model: 'Page', fk: 'pageId', fkOn: 'self' } } },
    Redirect: { defaults: { statusCode: 301, active: true }, dates: ['createdAt'], unique: [['oldUrl']] },
    Media: { optional: ['altText', 'width', 'height', 'focalPoint', 'variants'], dates: ['createdAt'] },
    Block: {
        defaults: { isGlobal: false }, optional: ['styles', 'category'], dates: ts, updatedAt: true,
        relations: { pageBlocks: { kind: 'many', model: 'PageBlock', fk: 'blockId', fkOn: 'other' } },
        cascade: [{ model: 'PageBlock', fk: 'blockId' }],
    },
    PageBlock: {
        optional: ['overrides', 'hidden'], unique: [['pageId', 'blockId']],
        relations: {
            block: { kind: 'one', model: 'Block', fk: 'blockId', fkOn: 'self' },
            page: { kind: 'one', model: 'Page', fk: 'pageId', fkOn: 'self' },
        },
    },
    ABTest: {
        defaults: { trafficB: 50, status: 'draft' },
        optional: ['elementId', 'goal', 'goalTarget', 'startDate', 'endDate', 'results', 'winner'],
        dates: [...ts, 'startDate', 'endDate'], updatedAt: true,
    },
    DynamicVariable: { defaults: { autoUpdate: false }, optional: ['formula', 'description'], dates: ts, updatedAt: true, unique: [['key']] },
    Interlink: { defaults: { score: 0, status: 'suggested' }, optional: ['context'], dates: ['createdAt'] },
    User: { defaults: { role: 'user' }, optional: ['name', 'driveFolderId'], dates: ts, updatedAt: true, unique: [['email']] },
    Project: { defaults: { color: '#FACC15', showOnHome: false, deleted: false }, dates: ts, updatedAt: true },
    Client: {
        defaults: { showInSuccessStories: false, deleted: false, order: 0 },
        optional: ['logo', 'url', 'description', 'socials'], dates: ts, updatedAt: true,
    },
    Service: {
        defaults: { clientCount: 0, order: 0, deleted: false },
        optional: ['uvpTitle', 'uvpSubtitle', 'ctaText', 'stats', 'benefits', 'faq', 'testimonials', 'comparison'],
        dates: ts, updatedAt: true, unique: [['slug']],
    },
    SiteConfig: { dates: ts, updatedAt: true, unique: [['key']] },
    BlogPost: {
        defaults: { featured: false, published: false, deleted: false },
        optional: ['excerpt', 'image', 'author', 'category', 'date', 'readTime', 'tags', 'metaDescription', 'metaTitle'],
        dates: ts, updatedAt: true, unique: [['slug']],
    },
    Faq: { defaults: { order: 0, deleted: false }, optional: ['category'], dates: ts, updatedAt: true },
    ConsentLog: { defaults: { accepted: true }, optional: ['ipAddress', 'userAgent'], dates: ['createdAt'] },
    Lead: {
        defaults: { status: 'new' },
        optional: ['name', 'company', 'website', 'phone', 'message', 'budget', 'services', 'ipAddress'],
        dates: ts, updatedAt: true,
    },
};

/** Nome del delegate Prisma (prisma.aBTest) -> nome del modello (ABTest). */
export const DELEGATES: Record<string, string> = Object.fromEntries(
    Object.keys(MODELS).map((m) => [m.charAt(0).toLowerCase() + m.slice(1), m]),
);
