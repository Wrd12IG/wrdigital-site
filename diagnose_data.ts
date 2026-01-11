import { prisma } from './lib/prisma';

async function main() {
  console.log('--- BLOG POSTS ---');
  const posts = await prisma.blogPost.findMany();
  posts.forEach(p => {
    console.log(`ID: ${p.id} | Title: ${p.title.substring(0, 20)}... | Published: ${p.published} | Deleted: ${p.deleted}`);
  });

  console.log('\n--- PROJECTS ---');
  const projects = await prisma.project.findMany();
  projects.forEach(p => {
    console.log(`ID: ${p.id} | Title: ${p.title.substring(0, 20)}... | Deleted: ${p.deleted}`);
  });
}

main()
  .catch(console.error)
  .finally(async () => await prisma.());
