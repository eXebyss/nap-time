import { useEffect, useReducer } from 'react';
import moment from 'moment';
import { useBabyContext } from '@/context';
import { useAuthContext } from '@/context/AuthContext';
import updateSubData from '@/firebase/firestore/updateSubDocument';
import { arrayUnion } from 'firebase/firestore';
import {
    AddNapTimeState,
    AddNapTimeAction,
    AddNapTimeDispatchAction,
} from './types';

const useAddNapTime = () => {
    const authContext = useAuthContext();
    const { babyId, fetchBabyData } = useBabyContext();

    const user = authContext?.user;

    const initialState: AddNapTimeState = {
        isOpen: false,
        isFormOpen: false,
        napStart: '',
        napFinish: '',
        napDateStart: '',
        napDateFinish: '',
        napType: '',
        successMessage: '',
    };

    const dispatchAction: AddNapTimeDispatchAction = {
        setOpen: 'SET_OPEN',
        setFormOpen: 'SET_FORM_OPEN',
        setNapStart: 'SET_NAP_START',
        setNapFinish: 'SET_NAP_FINISH',
        setNapDateStart: 'SET_NAP_DATE_START',
        setNapDateFinish: 'SET_NAP_DATE_FINISH',
        setNapType: 'SET_NAP_TYPE',
        setSuccessMessage: 'SET_SUCCESS_MESSAGE',
    };

    const {
        setOpen,
        setFormOpen,
        setNapStart,
        setNapFinish,
        setNapDateStart,
        setNapDateFinish,
        setNapType,
        setSuccessMessage,
    } = dispatchAction;

    const reducer = (
        state: AddNapTimeState,
        action: AddNapTimeAction,
    ): AddNapTimeState => {
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
            case setNapDateStart:
                return {
                    ...state,
                    napDateStart: action.payload,
                };
            case setNapDateFinish:
                return {
                    ...state,
                    napDateFinish: action.payload,
                };
            case setNapType:
                return {
                    ...state,
                    napType: action.payload,
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
    const { isOpen, isFormOpen, napType, successMessage } = state;

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

    const selectNapType = (type: string) => {
        dispatch({
            type: setNapType,
            payload: type,
        });
    };

    const addNapTimeShort = async () => {
        const napStartDate = moment(
            `${moment().format('YYYY-MM-DD')} ${state.napStart}`,
        );
        const napFinishDate = moment(
            `${moment().format('YYYY-MM-DD')} ${state.napFinish}`,
        );

        let result = null;

        babyId &&
            user?.uid &&
            (result = await updateSubData('user', user.uid, 'baby', babyId, {
                napTime: arrayUnion({
                    start: napStartDate.format('YYYY-MM-DD HH:mm'),
                    finish: napFinishDate.format('YYYY-MM-DD HH:mm'),
                    type: napType,
                }),
            }));

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
                type: setNapType,
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

    const addNapTimeLong = async () => {
        const napStartDate = moment(`${state.napDateStart} ${state.napStart}`);
        const napFinishDate = moment(
            `${state.napDateFinish} ${state.napFinish}`,
        );

        let result = null;

        babyId &&
            user?.uid &&
            (result = await updateSubData('user', user.uid, 'baby', babyId, {
                napTime: arrayUnion({
                    start: napStartDate.format('YYYY-MM-DD HH:mm'),
                    finish: napFinishDate.format('YYYY-MM-DD HH:mm'),
                    type: napType,
                }),
            }));

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
                type: setNapType,
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

    const addNapTime = async () => {
        napType === '🌞' && (await addNapTimeShort());
        napType === '🌚' && (await addNapTimeLong());
    };

    useEffect(() => {
        successMessage &&
            setTimeout(() => {
                dispatch({
                    type: setSuccessMessage,
                    payload: '',
                });
            }, 3500);
    }, [successMessage, setSuccessMessage]);

    return {
        state,
        onAdd,
        dispatch,
        setNapStart,
        setNapFinish,
        setNapDateStart,
        setNapDateFinish,
        selectNapType,
        addNapTime,
    };
};

export default useAddNapTime;
