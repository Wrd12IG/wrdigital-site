import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

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

                console.log('--- AUTH DEBUG ---');
                console.log('Attempting login for:', credentials.email.toLowerCase());

                // Fetch user from Database instead of JSON file
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email.toLowerCase() }
                });

                if (!user) {
                    console.log('User not found in DB');
                    return null;
                }
                console.log('User found:', user.email, 'Role:', user.role);

                const isValid = await bcrypt.compare(credentials.password, user.password);
                console.log('Password valid:', isValid);

                if (!isValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name || '',
                    driveFolderId: user.driveFolderId || '',
                    role: user.role
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
