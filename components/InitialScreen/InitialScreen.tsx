'use client';

import { useAuthContext } from '@/context';
import WelcomeText, { WelcomeTextShimmer } from './WelcomeText';
import InitialButtons from './InitialButtons';
import InitialForm from './InitialForm';
import { InitialScreenContextProvider } from './InitialScreenContext';

const InitialScreen = () => {
    const authContext = useAuthContext();
    const loading = authContext?.loading;

    const initialContent = loading ? (
        <WelcomeTextShimmer />
    ) : (
        <>
            <div className="text-center w-full">
                <WelcomeText />
            </div>
            <InitialButtons />
            <InitialForm />
        </>
    );

    return (
        <InitialScreenContextProvider>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse w-full">
                    {initialContent}
                </div>
            </div>
        </InitialScreenContextProvider>
    );
};

export default InitialScreen;
