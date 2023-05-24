import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import imageUrl from '@/utils/sanity.imageUrl';

interface InstallationGuideProps {
    installationGuideData: {
        title?: string;
        description?: string;
        steps: {
            title: string;
            description: string;
            image?: any;
        }[];
    }[];
}

const InstallationGuide = ({
    installationGuideData,
}: InstallationGuideProps) => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div>
                    <h1 className="font-bold my-2 fhd:my-4">
                        Installation guide
                    </h1>
                    {installationGuideData?.map((data) => (
                        <div key={uuidv4()}>
                            <h2 className="my-2 fhd:my-4">{data?.title}</h2>
                            <p className="underline">{data?.description}</p>
                            {data?.steps.map((step) => (
                                <div key={uuidv4()}>
                                    <p>
                                        <span className="font-bold">
                                            {step.title}
                                        </span>
                                    </p>
                                    {step.image && (
                                        <Image
                                            src={imageUrl(step.image).url()}
                                            alt={step.title}
                                            width={500}
                                            height={500}
                                            priority
                                            className="w-auto h-auto mx-auto"
                                        />
                                    )}
                                    <p>{step.description}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InstallationGuide;
