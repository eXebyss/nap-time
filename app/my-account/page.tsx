import { Metadata } from 'next';
import { siteTitle } from '@/constants';

export const metadata: Metadata = {
    title: `${siteTitle}: My Account`,
    openGraph: {
        title: `${siteTitle}: My Account`,
    },
};

export default function NapTime() {
    return (
        <main>
            <h1>My Account</h1>
        </main>
    );
}
