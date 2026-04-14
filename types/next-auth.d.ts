import 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            driveFolderId?: string;
            role?: string;
        };
    }

    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        driveFolderId?: string;
        role?: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string; // Change to string to match User.id
        driveFolderId?: string;
        role?: string;
    }
}
