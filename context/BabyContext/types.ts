import { NapTimeData } from '../types';

export interface BabyName {
    id: string;
    name: string;
}

export interface BabyContextProviderProps {
    children: React.ReactNode;
}

export type BabyContextType = {
    babyId: string | null;
    babyName: string | null;
    babyNames: BabyName[];
    babyNapTime: NapTimeData[];
    fetchBabyData: () => Promise<void>;
    addBabyName: (name: string) => Promise<void>;
    selectBabyName: (name: string) => void;
    updateBabyName: (newName: string) => Promise<void>;
    deleteBabyName: () => Promise<void>;
};

export interface BabyContextState {
    babyName: BabyName | null;
    babyNames: BabyName[];
    babyNapTime: NapTimeData[];
}

export type BabyContextAction =
    | { type: 'SET_BABY_NAME'; payload: BabyName }
    | { type: 'SET_BABY_NAMES'; payload: BabyName[] }
    | { type: 'SET_BABY_NAP_TIME'; payload: NapTimeData[] };
