const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- BLOG POSTS ---');
  try {
    const posts = await prisma.blogPost.findMany();
    console.log('Count:', posts.length);
    posts.forEach(p => {
        console.log('ID: ' + p.id + ' | Title: ' + p.title.substring(0, 20) + '... | Published: ' + p.published + ' | Deleted: ' + p.deleted);
    });
  } catch(e) { console.error('Error fetching posts:', e); }

  console.log('\n--- PROJECTS ---');
  try {
    const projects = await prisma.project.findMany();
    console.log('Count:', projects.length);
    projects.forEach(p => {
        console.log('ID: ' + p.id + ' | Title: ' + p.title.substring(0, 20) + '... | Deleted: ' + p.deleted);
    });
  } catch(e) { console.error('Error fetching projects:', e); }
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
