'use client';

import {
    useState,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useCallback,
} from 'react';
import { useAuthContext } from '@/context/AuthContext';
import getSubDocument from '@/firebase/firestore/getSubDocument';
import addSubData from '@/firebase/firestore/addSubDocument';
import {
    FirestoreContextProviderProps,
    FirestoreContextType,
    BabyData,
    NapTimeData,
} from './types';

const FirestoreContext = createContext<FirestoreContextType>({
    babyData: null,
    babyName: null,
    babyNapTime: [],
    fetchBabyData: async () => {},
    addBabyName: () => {},
});

export const useFirestoreContext = () => useContext(FirestoreContext);

export const FirestoreContextProvider = ({
    children,
}: FirestoreContextProviderProps): JSX.Element => {
    const [babyData, setBabyData] = useState<BabyData | null>(null);
    const [babyName, setBabyName] = useState(
        babyData?.result?.docs[0]?.data()?.name,
    );
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

    const addBabyName = useCallback(
        (value: string) => {
            user?.uid && addSubData('user', user.uid, 'baby', { name: value });
            setBabyName(value);
        },
        [user, setBabyName],
    );

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

        return { babyData, babyName, babyNapTime, fetchBabyData, addBabyName };
    }, [babyData, babyName, babyNapTime, user?.uid, addBabyName]);

    return (
        <FirestoreContext.Provider value={contextValue}>
            {children}
        </FirestoreContext.Provider>
    );
};
