import { PrismaClient } from '@prisma/client'
import { createFirestoreClient } from '@/lib/db/firestore'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// DB_BACKEND=firestore usa Firestore tramite l'adattatore in lib/db; altrimenti SQLite via Prisma (default).
const create = (): PrismaClient =>
    process.env.DB_BACKEND === 'firestore'
        ? (createFirestoreClient() as unknown as PrismaClient)
        : new PrismaClient({
            // adapter if using driver adapters in the future
        })

export const prisma = globalForPrisma.prisma || create()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
