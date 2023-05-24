import { Metadata } from 'next';
import InstallationGuide from '@/components/InstallationGuide/InstallationGuide';
import { getSanityData } from '@/utils';
import { siteTitle } from '@/constants';

export const metadata: Metadata = {
    title: `${siteTitle}: Installation`,
    openGraph: {
        title: `${siteTitle}: Installation`,
    },
};

const InstallationGuidePage = async () => {
    const installationGuideData = await getSanityData(
        `*[_type == "installationGuide"]`,
    );

    return (
        <main>
            <InstallationGuide installationGuideData={installationGuideData} />
        </main>
    );
};

export default InstallationGuidePage;
