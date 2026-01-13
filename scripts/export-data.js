
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function exportData() {
    console.log('Exporting data from database to JSON files...');

    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }

    // 1. Testimonials
    const testimonials = await prisma.testimonial.findMany();
    fs.writeFileSync(
        path.join(dataDir, 'testimonials.json'),
        JSON.stringify(testimonials, null, 2)
    );
    console.log(`Exported ${testimonials.length} testimonials.`);

    // 2. Portfolio (Projects)
    const projects = await prisma.project.findMany();
    fs.writeFileSync(
        path.join(dataDir, 'portfolio.json'),
        JSON.stringify(projects, null, 2)
    );
    console.log(`Exported ${projects.length} projects.`);

    // 3. Blog Posts
    const blogPosts = await prisma.blogPost.findMany();
    fs.writeFileSync(
        path.join(dataDir, 'blog.json'),
        JSON.stringify(blogPosts, null, 2)
    );
    console.log(`Exported ${blogPosts.length} blog posts.`);

    // 4. Clients
    const clients = await prisma.client.findMany();
    fs.writeFileSync(
        path.join(dataDir, 'clients.json'),
        JSON.stringify(clients, null, 2)
    );
    console.log(`Exported ${clients.length} clients.`);

    // 5. Site Config (SEO Meta etc)
    const siteConfig = await prisma.siteConfig.findMany();
    fs.writeFileSync(
        path.join(dataDir, 'site-config.json'),
        JSON.stringify(siteConfig, null, 2)
    );
    console.log(`Exported ${siteConfig.length} site config items.`);

    console.log('Data export completed successfully.');
}

exportData()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
