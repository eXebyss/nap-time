export type InstallationGuideData = {
    title: string;
    description: string;
    steps: { title: string; description: string; image: {} }[];
};

export type SanityContextValue = {
    installationGuideData: InstallationGuideData[] | null;
};

export interface SanityContextProviderProps {
    children: React.ReactNode;
}
