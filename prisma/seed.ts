import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
    const servicesPath = path.join(process.cwd(), 'data/services.json')
    const seoAppPath = path.join(process.cwd(), 'data/services.ts') // Check ts file too? usually json is strictly data
    const seoPath = path.join(process.cwd(), 'data/seo-meta.json')

    let services = {}
    if (fs.existsSync(servicesPath)) {
        services = JSON.parse(fs.readFileSync(servicesPath, 'utf-8'))
    } else {
        console.log('No services.json found, skipping pages seed (or manual seed needed)')
    }

    const seoMeta = fs.existsSync(seoPath) ? JSON.parse(fs.readFileSync(seoPath, 'utf-8')) : {}

    console.log('Seeding database from JSON files...')

    for (const [slug, service] of Object.entries(services)) {
        const s = service as any
        console.log(`Processing service: ${slug}`)

        // Create Page
        const page = await prisma.page.upsert({
            where: { slug },
            update: {
                title: s.title || slug,
                content: JSON.stringify(s)
            },
            create: {
                slug,
                title: s.title || slug,
                content: JSON.stringify(s), // Storing the whole old object as content for now
                published: true
            }
        })

        // Create SEO
        const meta = seoMeta[slug] || {}
        const defaultTitle = s.title ? `${s.title} | W[r]Digital` : undefined

        await prisma.seoMetadata.upsert({
            where: { pageId: page.id },
            update: {
                metaTitle: meta.title || defaultTitle,
                metaDescription: meta.description || s.description
            },
            create: {
                pageId: page.id,
                metaTitle: meta.title || defaultTitle,
                metaDescription: meta.description || s.description,
                ogTitle: meta.ogTitle,
                ogDescription: meta.ogDescription,
                robotsIndex: true
            }
        })
    }

    console.log('Seed completed.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
