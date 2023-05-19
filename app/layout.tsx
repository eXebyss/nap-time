import { Coda } from 'next/font/google';
import Footer from '@/components/UI/Footer/Footer';
import '../styles/global/global.scss';
import { AuthContextProvider, FirestoreContextProvider } from '@/context';
import { ogUrl, siteDescription, siteTitle } from '@/constants';
import { Metadata } from 'next';

const coda = Coda({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-coda',
});

export const metadata: Metadata = {
    title: `${siteTitle}: Home`,
    description: `${siteDescription}`,
    themeColor: '#f2f2f2',
    appleWebApp: true,
    openGraph: {
        title: `${siteTitle}: Home`,
        description: `${siteDescription}`,
        url: `${ogUrl}`,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-theme="light" className={`${coda.variable}`}>
            <head>
                <link rel="manifest" href="/manifest.webmanifest" />
            </head>
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
