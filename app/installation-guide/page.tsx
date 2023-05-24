import InstallationGuide from '@/components/InstallationGuide/InstallationGuide';
import { getSanityData } from '@/utils';

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
