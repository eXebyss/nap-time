'use client';

import { useState, createContext, useContext, useEffect, useMemo } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import getSubDocument from '@/firebase/firestore/getSubDocument';
import { FirestoreContextType, BabyData, NapTimeData } from './types';

const FirestoreContext = createContext<FirestoreContextType>({
    babyData: null,
    babyNapTime: [],
    fetchBabyData: async () => {},
});

export const useFirestoreContext = () => useContext(FirestoreContext);

interface FirestoreContextProviderProps {
    children: React.ReactNode;
}

export const FirestoreContextProvider = ({
    children,
}: FirestoreContextProviderProps): JSX.Element => {
    const [babyData, setBabyData] = useState<BabyData | null>(null);
    const [babyNapTime, setBabyNapTime] = useState<NapTimeData[]>([]);
    const authContext = useAuthContext();

    const user = authContext?.user;

    useEffect(() => {
        if (user?.uid) {
            const fetchData = async () => {
                const data = await getSubDocument('user', user?.uid, 'baby');
                setBabyData(data);
            };

            fetchData();
        }
    }, [user?.uid]);

    useEffect(() => {
        if (babyData?.result) {
            setBabyNapTime(babyData.result?.docs[0]?.data()?.napTime);
        }
    }, [babyData?.result]);

    const contextValue = useMemo(() => {
        const fetchBabyData = async () => {
            if (user?.uid) {
                const data = await getSubDocument('user', user?.uid, 'baby');

                if (data?.result) {
                    setBabyData(data);
                    setBabyNapTime(data.result?.docs[0]?.data()?.napTime);
                }
            }
        };

        return { babyData, babyNapTime, fetchBabyData };
    }, [babyData, babyNapTime, user?.uid]);

    return (
        <FirestoreContext.Provider value={contextValue}>
            {children}
        </FirestoreContext.Provider>
    );
};
