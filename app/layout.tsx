/* eslint-disable react/no-invalid-html-attribute */
import { Coda } from 'next/font/google';
import Footer from '@/components/UI/Footer/Footer';
import '../styles/global/global.scss';
import {
    AuthContextProvider,
    FirestoreContextProvider,
    BabyContextProvider,
} from '@/context';
import { ogUrl, siteDescription, siteTitle } from '@/constants';
import { Metadata } from 'next';
import Navbar from '@/components/UI/Navbar/Navbar';

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
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-2048-2732.jpg"
                    media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-2732-2048.jpg"
                    media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-1668-2388.jpg"
                    media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-2388-1668.jpg"
                    media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-1536-2048.jpg"
                    media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-2048-1536.jpg"
                    media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-1668-2224.jpg"
                    media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-2224-1668.jpg"
                    media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-1620-2160.jpg"
                    media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-2160-1620.jpg"
                    media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-1290-2796.jpg"
                    media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-2796-1290.jpg"
                    media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-1179-2556.jpg"
                    media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-2556-1179.jpg"
                    media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-1284-2778.jpg"
                    media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-2778-1284.jpg"
                    media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-1170-2532.jpg"
                    media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-2532-1170.jpg"
                    media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-1125-2436.jpg"
                    media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-2436-1125.jpg"
                    media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-1242-2688.jpg"
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-2688-1242.jpg"
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-828-1792.jpg"
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-1792-828.jpg"
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-1242-2208.jpg"
                    media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-2208-1242.jpg"
                    media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-750-1334.jpg"
                    media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-1334-750.jpg"
                    media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-640-1136.jpg"
                    media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="apple-splash-1136-640.jpg"
                    media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
            </head>
            <body>
                <AuthContextProvider>
                    <FirestoreContextProvider>
                        <BabyContextProvider>
                            <Navbar />
                            {children}
                        </BabyContextProvider>
                    </FirestoreContextProvider>
                </AuthContextProvider>
                <Footer />
            </body>
        </html>
    );
}
