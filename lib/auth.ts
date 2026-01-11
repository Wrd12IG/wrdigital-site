import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

// Tipo per l'utente, esteso con role
export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    driveFolderId: string;
    role?: string;
}

// Funzione per caricare gli utenti dal file JSON
export function getUsers(): User[] {
    const filePath = path.join(process.cwd(), 'data', 'users.json');
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    try {
        return JSON.parse(fileContent);
    } catch {
        return [];
    }
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const users = getUsers();
                const user = users.find(u => u.email.toLowerCase() === credentials.email.toLowerCase());

                if (!user) {
                    return null;
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    driveFolderId: user.driveFolderId,
                    role: user.role || 'user'
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.driveFolderId = (user as any).driveFolderId;
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id as string;
                (session.user as any).driveFolderId = token.driveFolderId as string;
                (session.user as any).role = token.role as string;
            }
            return session;
        }
    },
    pages: {
        signIn: '/area-clienti',
        error: '/area-clienti',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 giorni
    },
    secret: process.env.NEXTAUTH_SECRET || 'wrdigital-secret-key-change-in-production',
};
