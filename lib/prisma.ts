import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({
    // adapter if using driver adapters in the future
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
// Trigger reload: 2026-01-11
