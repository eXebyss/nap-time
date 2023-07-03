import BlockContent from '@sanity/block-content-to-react';
import { getSanityData } from '@/utils';

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
                    <BlockContent blocks={privacyPolicyData[0].content} />
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
