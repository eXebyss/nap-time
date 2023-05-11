import { Coda } from 'next/font/google';
import Footer from '@/components/UI/Footer/Footer';
import '../styles/global/global.scss';
import { AuthContextProvider, FirestoreContextProvider } from '@/context';

const coda = Coda({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-coda',
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-theme="light" className={`${coda.variable}`}>
            <head />
            <body>
                <AuthContextProvider>
                    <FirestoreContextProvider>
                        {children}
                    </FirestoreContextProvider>
                </AuthContextProvider>
                <Footer />
            </body>
        </html>
    );
}
