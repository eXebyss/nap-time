import { QuerySnapshot, DocumentData } from 'firebase/firestore';

export interface BabyName {
    id: string;
    name: string;
}
export interface FirestoreContextProviderProps {
    children: React.ReactNode;
}

export type FirestoreContextType = {
    babyData: BabyData | null;
    fetchFirestoreData: () => Promise<void>;
};

export interface FirestoreContextState {
    babyData: BabyData | null;
}

export type FirestoreContextAction = {
    type: 'SET_BABY_DATA';
    payload: BabyData;
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
