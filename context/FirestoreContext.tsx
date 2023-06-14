'use client';

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useCallback,
    useReducer,
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

interface FirestoreContexState {
    babyData: BabyData | null;
    babyName: string | null;
    babyNapTime: NapTimeData[];
}

type FirestoreContextAction =
    | { type: 'SET_BABY_DATA'; payload: BabyData }
    | { type: 'SET_BABY_NAME'; payload: string }
    | { type: 'SET_BABY_NAP_TIME'; payload: NapTimeData[] };

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
    const authContext = useAuthContext();
    const user = authContext?.user;

    const initialState: FirestoreContexState = {
        babyData: null,
        babyName: null,
        babyNapTime: [],
    };

    const reducer = (
        state: FirestoreContexState,
        action: FirestoreContextAction,
    ) => {
        switch (action.type) {
            case 'SET_BABY_DATA':
                return { ...state, babyData: action.payload };
            case 'SET_BABY_NAME':
                return { ...state, babyName: action.payload };
            case 'SET_BABY_NAP_TIME':
                return { ...state, babyNapTime: action.payload };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (user?.uid) {
            const fetchData = async () => {
                const data = await getSubDocument('user', user?.uid, 'baby');
                dispatch({ type: 'SET_BABY_DATA', payload: data });
            };

            fetchData();
        }
    }, [user?.uid]);

    useEffect(() => {
        if (state.babyData?.result) {
            dispatch({
                type: 'SET_BABY_NAP_TIME',
                payload: state.babyData.result?.docs[0]?.data()?.napTime,
            });
        }
    }, [state.babyData?.result]);

    const addBabyName = useCallback(
        (value: string) => {
            user?.uid && addSubData('user', user.uid, 'baby', { name: value });
            dispatch({ type: 'SET_BABY_NAME', payload: value });
        },
        [user],
    );

    const contextValue = useMemo(() => {
        const fetchBabyData = async () => {
            if (user?.uid) {
                const data = await getSubDocument('user', user?.uid, 'baby');

                if (data?.result) {
                    dispatch({ type: 'SET_BABY_DATA', payload: data });
                    dispatch({
                        type: 'SET_BABY_NAP_TIME',
                        payload: data.result?.docs[0]?.data()?.napTime,
                    });
                }
            }
        };

        return {
            babyData: state.babyData,
            babyName: state?.babyData?.result?.docs[0]?.data()?.name,
            babyNapTime: state.babyNapTime,
            fetchBabyData,
            addBabyName,
        };
    }, [state, user?.uid, addBabyName]);

    return (
        <FirestoreContext.Provider value={contextValue}>
            {children}
        </FirestoreContext.Provider>
    );
};
