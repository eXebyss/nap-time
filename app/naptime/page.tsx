import { Metadata } from 'next';
import NapTimeList from '@/components/NapTimeList/NapTimeList';
import { siteTitle } from '@/constants';

export const metadata: Metadata = {
    title: `${siteTitle}: Nap History`,
    openGraph: {
        title: `${siteTitle}: Nap History`,
    },
};

export default function NapTime() {
    return (
        <main>
            <NapTimeList />
        </main>
    );
}
