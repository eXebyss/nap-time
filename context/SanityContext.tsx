'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import sanityClient from '@/lib/sanity.client';
import {
    InstallationGuideData,
    SanityContextProviderProps,
    SanityContextValue,
} from './types';

const SanityContext = createContext<SanityContextValue | null>(null);

export const useSanityContext = () => useContext(SanityContext);

export const SanityProvider = ({
    children,
}: SanityContextProviderProps): JSX.Element => {
    const [installationGuideData, setInstallationGuideData] = useState<
        InstallationGuideData[]
    >([
        {
            title: '',
            description: '',
            steps: [],
        },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await sanityClient.fetch(
                    `*[_type == "installationGuide"]`,
                );

                if (res) {
                    setInstallationGuideData(res);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const value = useMemo(() => {
        return {
            installationGuideData,
        };
    }, [installationGuideData]);

    return (
        <SanityContext.Provider value={value}>
            {children}
        </SanityContext.Provider>
    );
};
