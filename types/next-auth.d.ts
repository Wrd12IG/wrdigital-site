import 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            driveFolderId?: string;
        };
    }

    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        driveFolderId?: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        driveFolderId?: string;
    }
}
