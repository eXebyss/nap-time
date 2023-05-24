import { Metadata } from 'next';
import NapTimeList from '@/components/NapTimeList/NapTimeList';
import { siteTitle } from '@/constants';

export const metadata: Metadata = {
    title: `${siteTitle}: Installation`,
    openGraph: {
        title: `${siteTitle}: Installation`,
    },
};

export default function NapTime() {
    return (
        <main>
            <NapTimeList />
        </main>
    );
}
