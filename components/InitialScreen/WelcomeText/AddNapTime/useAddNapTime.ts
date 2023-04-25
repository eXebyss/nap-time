import { useEffect, useReducer } from 'react';
import moment from 'moment';
import { useFirestoreContext } from '@/context/FirestoreContext';
import { useAuthContext } from '@/context/AuthContext';
import updateSubData from '@/firebase/firestore/updateSubDocument';
import { arrayUnion } from 'firebase/firestore';
import { State, Action, DispatchAction } from './types';

const useAddNapTime = () => {
    const user = useAuthContext();
    const { babyData, fetchBabyData } = useFirestoreContext();

    const initialState: State = {
        isOpen: false,
        isFormOpen: false,
        napStart: '',
        napFinish: '',
        successMessage: '',
    };

    const dispatchAction: DispatchAction = {
        setOpen: 'setOpen',
        setFormOpen: 'setFormOpen',
        setNapStart: 'setNapStart',
        setNapFinish: 'setNapFinish',
        setSuccessMessage: 'setSuccessMessage',
    };

    const {
        setOpen,
        setFormOpen,
        setNapStart,
        setNapFinish,
        setSuccessMessage,
    } = dispatchAction;

    const reducer = (state: State, action: Action): State => {
        switch (action.type) {
            case setOpen:
                return {
                    ...state,
                    isOpen: action.payload,
                };
            case setFormOpen:
                return {
                    ...state,
                    isFormOpen: action.payload,
                };
            case setNapStart:
                return {
                    ...state,
                    napStart: action.payload,
                };
            case setNapFinish:
                return {
                    ...state,
                    napFinish: action.payload,
                };
            case setSuccessMessage:
                return {
                    ...state,
                    successMessage: action.payload,
                };
            default: {
                throw new Error('Unhandled action type');
            }
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const { isOpen, isFormOpen, napStart, napFinish, successMessage } = state;

    const onAdd = () => {
        dispatch({
            type: setOpen,
            payload: !isOpen,
        });
        setTimeout(() => {
            dispatch({
                type: setFormOpen,
                payload: !isFormOpen,
            });
        }, 500);
    };

    const addNapTime = async (napStart: string, napFinish: string) => {
        const napStartDate = moment(
            `${moment().format('YYYY-MM-DD')} ${napStart}`,
        );
        const napFinishDate = moment(
            `${moment().format('YYYY-MM-DD')} ${napFinish}`,
        );

        let result = null;

        babyData?.result?.docs[0]?.id &&
            user?.uid &&
            (result = await updateSubData(
                'user',
                user.uid,
                'baby',
                babyData?.result?.docs[0]?.id,
                {
                    napTime: arrayUnion({
                        start: napStartDate.format('YYYY-MM-DD HH:mm'),
                        finish: napFinishDate.format('YYYY-MM-DD HH:mm'),
                    }),
                },
            ));

        if (!result) {
            dispatch({
                type: setOpen,
                payload: !isOpen,
            });
            dispatch({
                type: setNapStart,
                payload: '',
            });
            dispatch({
                type: setNapFinish,
                payload: '',
            });
            dispatch({
                type: setSuccessMessage,
                payload: 'Saved.',
            });
            setTimeout(() => {
                dispatch({
                    type: setFormOpen,
                    payload: !isFormOpen,
                });
            }, 2500);
        }

        fetchBabyData();
    };

    useEffect(() => {
        successMessage &&
            setTimeout(() => {
                dispatch({
                    type: setSuccessMessage,
                    payload: '',
                });
            }, 2500);
    }, [successMessage, setSuccessMessage]);

    return {
        isOpen,
        isFormOpen,
        onAdd,
        dispatch,
        setNapStart,
        setNapFinish,
        napStart,
        napFinish,
        addNapTime,
        successMessage,
    };
};

export default useAddNapTime;
