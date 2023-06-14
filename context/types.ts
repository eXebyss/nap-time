import { QuerySnapshot, DocumentData } from 'firebase/firestore';

export interface FirestoreContextProviderProps {
    children: React.ReactNode;
}

export type FirestoreContextType = {
    babyData: BabyData | null;
    babyName: string | null;
    babyNapTime: NapTimeData[];
    fetchBabyData: () => Promise<void>;
    addBabyName: (value: string) => void;
};

export type BabyData = {
    result: QuerySnapshot<DocumentData> | null;
    error: unknown;
};

export interface NapTimeData {
    start: string;
    finish: string;
    type: string;
}

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
