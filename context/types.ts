import { QuerySnapshot, DocumentData } from 'firebase/firestore';

export type FirestoreContextType = {
    babyData: BabyData | null;
    babyNapTime: NapTimeData[];
    fetchBabyData: () => Promise<void>;
};

export type BabyData = {
    result: QuerySnapshot<DocumentData> | null;
    error: unknown;
};

export interface NapTimeData {
    start: string;
    finish: string;
}
