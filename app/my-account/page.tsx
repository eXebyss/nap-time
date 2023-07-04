import MyAccount from '@/components/MyAccount/MyAccount';
import { siteTitle } from '@/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: `${siteTitle}: My Account`,
    openGraph: {
        title: `${siteTitle}: My Account`,
    },
};

export default function MyAccountPage() {
    return (
        <main>
            <MyAccount />
        </main>
    );
}
