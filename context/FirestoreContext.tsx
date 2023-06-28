'use client';

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react';

import { useAuthContext } from '@/context/AuthContext';
import getSubDocument from '@/firebase/firestore/getSubDocument';
import {
    FirestoreContextProviderProps,
    FirestoreContextType,
    FirestoreContextAction,
    FirestoreContextState,
} from './types';

const FirestoreContext = createContext<FirestoreContextType>({
    babyData: null,
    fetchFirestoreData: async () => {},
});

export const useFirestoreContext = () => useContext(FirestoreContext);

export const FirestoreContextProvider = ({
    children,
}: FirestoreContextProviderProps): JSX.Element => {
    const authContext = useAuthContext();
    const user = authContext?.user;

    const initialState: FirestoreContextState = {
        babyData: null,
    };

    const reducer = (
        state: FirestoreContextState,
        action: FirestoreContextAction,
    ) => {
        switch (action.type) {
            case 'SET_BABY_DATA':
                return { ...state, babyData: action.payload };
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

    const contextValue = useMemo(() => {
        const fetchFirestoreData = async () => {
            if (user?.uid) {
                const data = await getSubDocument('user', user?.uid, 'baby');

                if (data?.result) {
                    dispatch({ type: 'SET_BABY_DATA', payload: data });
                }
            }
        };

        return {
            babyData: state.babyData,
            fetchFirestoreData,
        };
    }, [state, user?.uid]);

    return (
        <FirestoreContext.Provider value={contextValue}>
            {children}
        </FirestoreContext.Provider>
    );
};
