import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '')     // Remove all non-word chars
        .replace(/--+/g, '-')       // Replace multiple - with single -
        .replace(/^-+/, '')          // Trim - from start of text
        .replace(/-+$/, '');         // Trim - from end of text
}

async function main() {
    console.log('🚀 Starting Seeding database...')

    // 1. Users
    const usersPath = path.join(process.cwd(), 'data/users.json')
    if (fs.existsSync(usersPath)) {
        const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'))
        for (const user of users) {
            await prisma.user.upsert({
                where: { email: user.email },
                update: {
                    name: user.name,
                    password: user.password,
                    role: user.role,
                    driveFolderId: user.driveFolderId
                },
                create: {
                    email: user.email,
                    name: user.name,
                    password: user.password,
                    role: user.role,
                    driveFolderId: user.driveFolderId
                }
            })
        }
        console.log('✅ Users seeded.')
    }

    // 2. Testimonials
    const testimonialsPath = path.join(process.cwd(), 'data/testimonials.json')
    if (fs.existsSync(testimonialsPath)) {
        const testimonials = JSON.parse(fs.readFileSync(testimonialsPath, 'utf8'))
        for (const t of testimonials) {
            await prisma.testimonial.upsert({
                where: { id: t.id },
                update: {
                    quote: t.quote,
                    author: t.author,
                    company: t.company,
                    rating: t.rating || 5,
                    result: t.result,
                    service: t.service
                },
                create: {
                    id: t.id,
                    quote: t.quote,
                    author: t.author,
                    company: t.company,
                    rating: t.rating || 5,
                    result: t.result,
                    service: t.service
                }
            })
        }
        console.log('✅ Testimonials seeded.')
    }

    // 3. Projects (Portfolio)
    const portfolioPath = path.join(process.cwd(), 'data/portfolio.json')
    if (fs.existsSync(portfolioPath)) {
        const projects = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'))
        for (const p of projects) {
            await prisma.project.upsert({
                where: { id: p.id },
                update: {
                    title: p.title,
                    client: p.client,
                    category: p.category,
                    year: p.year,
                    description: p.description,
                    results: JSON.stringify(p.results),
                    tags: JSON.stringify(p.tags),
                    image: p.image,
                    color: p.color,
                    showOnHome: p.showOnHome
                },
                create: {
                    id: p.id,
                    title: p.title,
                    client: p.client,
                    category: p.category,
                    year: p.year,
                    description: p.description,
                    results: JSON.stringify(p.results),
                    tags: JSON.stringify(p.tags),
                    image: p.image,
                    color: p.color,
                    showOnHome: p.showOnHome
                }
            })
        }
        console.log('✅ Projects seeded.')
    }

    // 4. Clients
    const clientsPath = path.join(process.cwd(), 'data/clients.json')
    if (fs.existsSync(clientsPath)) {
        const clients = JSON.parse(fs.readFileSync(clientsPath, 'utf8'))
        for (const [index, c] of clients.entries()) {
            if (!c.name) continue;
            await prisma.client.create({
                data: {
                    name: c.name,
                    logo: c.logo,
                    url: c.url,
                    description: c.description,
                    socials: JSON.stringify(c.socials || {}),
                    showInSuccessStories: c.showInSuccessStories || false,
                    order: index
                }
            })
        }
        console.log('✅ Clients seeded.')
    }

    // 5. Services & Pages
    const servicesPath = path.join(process.cwd(), 'data/services.json')
    if (fs.existsSync(servicesPath)) {
        const services = JSON.parse(fs.readFileSync(servicesPath, 'utf8'))
        for (const [slug, s] of Object.entries(services)) {
            const service = s as any;
            await prisma.service.upsert({
                where: { slug },
                update: {
                    title: service.title,
                    uvpTitle: service.uvpTitle,
                    uvpSubtitle: service.uvpSubtitle,
                    ctaText: service.ctaText,
                    description: service.description,
                    clientCount: service.clientCount,
                    stats: JSON.stringify(service.stats),
                    benefits: JSON.stringify(service.benefits),
                    faq: JSON.stringify(service.faq),
                    testimonials: JSON.stringify(service.testimonials),
                    comparison: JSON.stringify(service.comparison)
                },
                create: {
                    slug,
                    title: service.title,
                    uvpTitle: service.uvpTitle,
                    uvpSubtitle: service.uvpSubtitle,
                    ctaText: service.ctaText,
                    description: service.description,
                    clientCount: service.clientCount,
                    stats: JSON.stringify(service.stats),
                    benefits: JSON.stringify(service.benefits),
                    faq: JSON.stringify(service.faq),
                    testimonials: JSON.stringify(service.testimonials),
                    comparison: JSON.stringify(service.comparison)
                }
            })

            await prisma.page.upsert({
                where: { slug },
                update: {
                    title: service.title,
                    content: JSON.stringify(service)
                },
                create: {
                    slug,
                    title: service.title,
                    content: JSON.stringify(service),
                    published: true
                }
            })
        }
        console.log('✅ Services and Pages seeded.')
    }

    // 6. Site Config
    const configPath = path.join(process.cwd(), 'data/site-config.json')
    if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
        for (const [key, value] of Object.entries(config)) {
            await prisma.siteConfig.upsert({
                where: { key },
                update: { value: JSON.stringify(value) },
                create: { key, value: JSON.stringify(value) }
            })
        }
        console.log('✅ Site Config seeded.')
    }

    // 7. Blog
    const blogPath = path.join(process.cwd(), 'data/blog.json')
    if (fs.existsSync(blogPath)) {
        const posts = JSON.parse(fs.readFileSync(blogPath, 'utf8'))
        for (const post of posts) {
            const slug = post.slug || slugify(post.title)
            await prisma.blogPost.upsert({
                where: { slug },
                update: {
                    title: post.title,
                    content: JSON.stringify(post.content || post.description),
                    excerpt: post.excerpt || post.description,
                    image: post.image,
                    author: post.author,
                    category: typeof post.category === 'string' ? post.category : post.category?.join(', '),
                    published: post.published ?? true
                },
                create: {
                    slug,
                    title: post.title,
                    content: JSON.stringify(post.content || post.description),
                    excerpt: post.excerpt || post.description,
                    image: post.image,
                    author: post.author,
                    category: typeof post.category === 'string' ? post.category : post.category?.join(', '),
                    published: post.published ?? true
                }
            })
        }
        console.log('✅ Blog seeded.')
    }

    // 8. FAQ
    const faqPath = path.join(process.cwd(), 'data/faq.json')
    if (fs.existsSync(faqPath)) {
        const faqs = JSON.parse(fs.readFileSync(faqPath, 'utf8'))
        for (const [index, f] of faqs.entries()) {
            await prisma.faq.create({
                data: {
                    question: f.question,
                    answer: f.answer,
                    order: index,
                    category: f.category
                }
            })
        }
        console.log('✅ FAQs seeded.')
    }

    console.log('🏁 Seed completed successfully.')
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
