'use client';

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useCallback,
    useReducer,
} from 'react';
import {
    getFirestore,
    doc,
    deleteDoc,
    addDoc,
    updateDoc,
    collection,
} from 'firebase/firestore';
import firebaseApp from '@/firebase/config';
import { useAuthContext } from '@/context/AuthContext';
import getSubDocument from '@/firebase/firestore/getSubDocument';
import {
    BabyContextType,
    BabyContextAction,
    BabyContextProviderProps,
    BabyContextState,
    BabyName,
} from './types';
import { useFirestoreContext } from '../FirestoreContext';

const BabyContext = createContext<BabyContextType>({
    babyId: '',
    babyName: null,
    babyNames: [],
    babyNapTime: [],
    fetchBabyData: async () => {},
    addBabyName: async () => {},
    selectBabyName: () => {},
    updateBabyName: async () => {},
    deleteBabyName: async () => {},
});

export const useBabyContext = () => useContext(BabyContext);

export const BabyContextProvider = ({
    children,
}: BabyContextProviderProps): JSX.Element => {
    const authContext = useAuthContext();
    const { babyData } = useFirestoreContext();
    const user = authContext?.user;

    const firestore = getFirestore(firebaseApp);

    const initialState: BabyContextState = {
        babyName: null,
        babyNames: [],
        babyNapTime: [],
    };

    const reducer = (state: BabyContextState, action: BabyContextAction) => {
        switch (action.type) {
            case 'SET_BABY_NAME':
                return { ...state, babyName: action.payload };
            case 'SET_BABY_NAMES':
                return { ...state, babyNames: action.payload };
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

                const babyNames = data?.result?.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name,
                }));

                dispatch({ type: 'SET_BABY_NAMES', payload: babyNames || [] });
            };

            fetchData();
        }
    }, [user?.uid]);

    useEffect(() => {
        if (babyData?.result) {
            const docId = babyData.result?.docs
                .filter((doc) => doc.id === state.babyName?.id)
                .map((doc) => ({ id: doc.id }));

            const { id } = docId[0];

            const doc = babyData.result.docs.find((doc) => doc.id === id);

            dispatch({
                type: 'SET_BABY_NAP_TIME',
                payload: doc?.data()?.napTime,
            });
        }
    }, [babyData?.result, state.babyName?.id]);

    useEffect(() => {
        const savedBabyName = localStorage.getItem('babyName');

        if (savedBabyName) {
            const parsedBabyName: BabyName = JSON.parse(savedBabyName);

            dispatch({ type: 'SET_BABY_NAME', payload: parsedBabyName });
        } else {
            const defaultBabyName = babyData?.result?.docs[0]?.data()?.name;
            const defaultBabyId = babyData?.result?.docs[0]?.id;

            if (defaultBabyName && defaultBabyId) {
                dispatch({
                    type: 'SET_BABY_NAME',
                    payload: { id: defaultBabyId, name: defaultBabyName },
                });

                localStorage.setItem(
                    'babyName',
                    JSON.stringify({
                        id: defaultBabyId,
                        name: defaultBabyName,
                    }),
                );
            }
        }
    }, [babyData]);

    const addBabyName = useCallback(
        async (name: string) => {
            if (user?.uid) {
                const babyCollectionRef = collection(
                    firestore,
                    'user',
                    user.uid,
                    'baby',
                );

                const newBabyDocRef = await addDoc(babyCollectionRef, { name });

                const newBabyName: BabyName = {
                    id: newBabyDocRef.id,
                    name,
                };

                const updatedBabyNames = [...state.babyNames, newBabyName];

                dispatch({ type: 'SET_BABY_NAMES', payload: updatedBabyNames });

                dispatch({ type: 'SET_BABY_NAME', payload: newBabyName });

                localStorage.setItem('babyName', JSON.stringify(newBabyName));
            }
        },
        [firestore, user?.uid, state.babyNames],
    );

    const selectBabyName = useCallback(
        (name: string) => {
            const selectedBaby = state.babyNames.find(
                (baby) => baby.name === name,
            );

            if (selectedBaby) {
                dispatch({ type: 'SET_BABY_NAME', payload: selectedBaby });

                localStorage.setItem('babyName', JSON.stringify(selectedBaby));
            }
        },
        [state.babyNames],
    );

    const updateBabyName = useCallback(
        async (newName: string) => {
            if (user?.uid && state.babyName?.id) {
                const babyDocRef = doc(
                    firestore,
                    'user',
                    user.uid,
                    'baby',
                    state.babyName.id,
                );

                await updateDoc(babyDocRef, { name: newName });

                const updatedBabyName: BabyName = {
                    id: state.babyName.id,
                    name: newName,
                };

                const updatedBabyIndex = state.babyNames.findIndex(
                    (baby) => baby.id === state.babyName?.id,
                );

                if (updatedBabyIndex !== -1) {
                    const updatedBabyNames = [
                        ...state.babyNames.slice(0, updatedBabyIndex),
                        updatedBabyName,
                        ...state.babyNames.slice(updatedBabyIndex + 1),
                    ];

                    dispatch({
                        type: 'SET_BABY_NAMES',
                        payload: updatedBabyNames,
                    });
                }

                dispatch({ type: 'SET_BABY_NAME', payload: updatedBabyName });

                localStorage.setItem(
                    'babyName',
                    JSON.stringify(updatedBabyName),
                );
            }
        },
        [firestore, user?.uid, state.babyName?.id, state.babyNames],
    );

    const deleteBabyName = useCallback(async () => {
        if (user?.uid && state.babyName?.id) {
            const babyDocRef = doc(
                firestore,
                'user',
                user.uid,
                'baby',
                state.babyName.id,
            );

            await deleteDoc(babyDocRef);

            const deletedBabyIndex = state.babyNames.findIndex(
                (baby) => baby.id === state.babyName?.id,
            );

            if (deletedBabyIndex !== -1) {
                const updatedBabyNames = [
                    ...state.babyNames.slice(0, deletedBabyIndex),
                    ...state.babyNames.slice(deletedBabyIndex + 1),
                ];
                dispatch({ type: 'SET_BABY_NAMES', payload: updatedBabyNames });

                if (updatedBabyNames.length > 0) {
                    dispatch({
                        type: 'SET_BABY_NAME',
                        payload: updatedBabyNames[0],
                    });

                    localStorage.setItem(
                        'babyName',
                        JSON.stringify(updatedBabyNames[0]),
                    );
                } else {
                    dispatch({
                        type: 'SET_BABY_NAME',
                        payload: { id: '', name: '' },
                    });

                    localStorage.removeItem('babyName');
                }
            }
        }
    }, [firestore, user?.uid, state.babyName?.id, state.babyNames]);

    const contextValue = useMemo(() => {
        const fetchBabyData = async () => {
            if (user?.uid) {
                const data = await getSubDocument('user', user?.uid, 'baby');

                if (data?.result) {
                    dispatch({
                        type: 'SET_BABY_NAP_TIME',
                        payload: data.result?.docs[0]?.data()?.napTime,
                    });
                }
            }
        };

        return {
            babyId: state.babyName?.id || null,
            babyName: state.babyName?.name || null,
            babyNames: state.babyNames,
            babyNapTime: state.babyNapTime,
            fetchBabyData,
            addBabyName,
            selectBabyName,
            updateBabyName,
            deleteBabyName,
        };
    }, [
        state,
        user?.uid,
        addBabyName,
        selectBabyName,
        updateBabyName,
        deleteBabyName,
    ]);

    return (
        <BabyContext.Provider value={contextValue}>
            {children}
        </BabyContext.Provider>
    );
};
