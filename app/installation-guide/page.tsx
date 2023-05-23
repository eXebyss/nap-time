import InstallationGuide from '@/components/InstallationGuide/InstallationGuide';
import { SanityProvider } from '@/context';
import { NextPage } from 'next';

const InstallationGuidePage: NextPage = () => {
    return (
        <main>
            <SanityProvider>
                <InstallationGuide />
            </SanityProvider>
        </main>
    );
};

export default InstallationGuidePage;
