import { PortableText } from '@portabletext/react';
import { getSanityData } from '@/utils';
import { siteTitle } from '@/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: `${siteTitle}: Privacy Policy`,
    openGraph: {
        title: `${siteTitle}: Privacy Policy`,
    },
};

const PrivacyPolicyPage = async () => {
    const privacyPolicyData = await getSanityData(
        `*[_type == "privacyPolicy"]`,
    );

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-justify">
                <div className="max-w-2xl fhd:max-w-4xl">
                    <h1 className="text-center mb-4 fhd:mb-8">
                        {privacyPolicyData[0].title}
                    </h1>
                    <PortableText value={privacyPolicyData[0].content} />
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
