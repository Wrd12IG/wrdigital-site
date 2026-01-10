import { AuthProvider } from '@/components/AuthProvider';

export default function AreaClientiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            {/* Area clienti ha il suo layout senza navbar/footer del sito */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'var(--color-bg-primary)',
                zIndex: 9999,
                overflow: 'auto'
            }}>
                {children}
            </div>
        </AuthProvider>
    );
}
