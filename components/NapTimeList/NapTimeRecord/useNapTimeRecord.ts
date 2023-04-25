import { useAuthContext } from '@/context/AuthContext';
import deleteSubDocumentArrayItem from '@/firebase/firestore/deleteSubDocFieldData';
import { useFirestoreContext } from '@/context';
import moment from 'moment';
import { useEffect, useReducer } from 'react';
import updateSubDocumentField from '@/firebase/firestore/updateSubDocFieldData';
import { State, Action, DispatchAction, NapTimeData } from './types';

const useNapTimeRecord = () => {
    const authContext = useAuthContext();
    const { babyData, babyNapTime, fetchBabyData } = useFirestoreContext();

    const user = authContext?.user;

    const initialState: State = {
        isOpen: false,
        isTimeFormOpen: false,
        isDateFormOpen: false,
        napTimeStart: '',
        napTimeFinish: '',
        napDateStart: '',
        napDateFinish: '',
        successMessage: '',
    };

    const dispatchAction: DispatchAction = {
        setOpen: 'setOpen',
        setTimeFormOpen: 'setTimeFormOpen',
        setDateFormOpen: 'setDateFormOpen',
        setNapTimeStart: 'setNapTimeStart',
        setNapTimeFinish: 'setNapTimeFinish',
        setNapDateStart: 'setNapDateStart',
        setNapDateFinish: 'setNapDateFinish',
        setSuccessMessage: 'setSuccessMessage',
    };

    const {
        setOpen,
        setTimeFormOpen,
        setDateFormOpen,
        setNapTimeStart,
        setNapTimeFinish,
        setNapDateStart,
        setNapDateFinish,
        setSuccessMessage,
    } = dispatchAction;

    const reducer = (state: State, action: Action): State => {
        switch (action.type) {
            case setOpen:
                return {
                    ...state,
                    isOpen: action.payload,
                };
            case setTimeFormOpen:
                return {
                    ...state,
                    isTimeFormOpen: action.payload,
                };
            case setDateFormOpen:
                return {
                    ...state,
                    isDateFormOpen: action.payload,
                };
            case setNapTimeStart:
                return {
                    ...state,
                    napTimeStart: action.payload,
                };
            case setNapTimeFinish:
                return {
                    ...state,
                    napTimeFinish: action.payload,
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
    const {
        isOpen,
        isTimeFormOpen,
        isDateFormOpen,
        napTimeStart,
        napTimeFinish,
        napDateStart,
        napDateFinish,
        successMessage,
    } = state;

    const timeEdit = () => {
        dispatch({
            type: setOpen,
            payload: !isOpen,
        });
        setTimeout(() => {
            dispatch({
                type: setTimeFormOpen,
                payload: !isTimeFormOpen,
            });
        }, 500);
    };

    const dateEdit = () => {
        dispatch({
            type: setDateFormOpen,
            payload: !isDateFormOpen,
        });
    };

    const updateNapTime = async (
        napTime: NapTimeData,
        napTimeStart: string,
        napTimeFinish: string,
    ) => {
        const napStartDate = moment(
            `${moment().format('YYYY-MM-DD')} ${napTimeStart}`,
        );
        const napFinishDate = moment(
            `${moment().format('YYYY-MM-DD')} ${napTimeFinish}`,
        );

        let result = null;

        babyData?.result?.docs[0]?.id &&
            user?.uid &&
            (result = await updateSubDocumentField(
                'user',
                user.uid,
                'baby',
                babyData?.result?.docs[0]?.id,
                'napTime',
                napTime,
                {
                    start: napStartDate.format('YYYY-MM-DD HH:mm'),
                    finish: napFinishDate.format('YYYY-MM-DD HH:mm'),
                },
            ));

        if (!result) {
            dispatch({
                type: setOpen,
                payload: !isOpen,
            });
            dispatch({
                type: setNapTimeStart,
                payload: '',
            });
            dispatch({
                type: setNapTimeFinish,
                payload: '',
            });
            dispatch({
                type: setSuccessMessage,
                payload: 'Saved.',
            });
            setTimeout(() => {
                dispatch({
                    type: setTimeFormOpen,
                    payload: !isTimeFormOpen,
                });
            }, 500);
        }

        fetchBabyData();
    };

    const updateNapDate = async (
        napTime: NapTimeData,
        napDateStart: string,
        napTimeStart: string,
        napDateFinish: string,
        napTimeFinish: string,
    ) => {
        const napStartDate = moment(`${napDateStart} ${napTimeStart}`);
        const napFinishDate = moment(`${napDateFinish} ${napTimeFinish}`);

        let result = null;

        babyData?.result?.docs[0]?.id &&
            user?.uid &&
            (result = await updateSubDocumentField(
                'user',
                user.uid,
                'baby',
                babyData?.result?.docs[0]?.id,
                'napTime',
                napTime,
                {
                    start: napStartDate.format('YYYY-MM-DD HH:mm'),
                    finish: napFinishDate.format('YYYY-MM-DD HH:mm'),
                },
            ));

        if (!result) {
            dispatch({
                type: setOpen,
                payload: !isOpen,
            });
            dispatch({
                type: setNapTimeStart,
                payload: '',
            });
            dispatch({
                type: setNapTimeFinish,
                payload: '',
            });
            dispatch({
                type: setSuccessMessage,
                payload: 'Saved.',
            });
            setTimeout(() => {
                dispatch({
                    type: setTimeFormOpen,
                    payload: !isTimeFormOpen,
                });
            }, 500);
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

    const deleteData = async (index: number) => {
        babyData?.result?.docs[0]?.id &&
            user?.uid &&
            (await deleteSubDocumentArrayItem(
                'user',
                user.uid,
                'baby',
                babyData?.result?.docs[0]?.id,
                'napTime',
                babyData?.result?.docs[0]?.data()?.napTime[index],
            ));

        fetchBabyData();
    };

    return {
        isOpen,
        isTimeFormOpen,
        isDateFormOpen,
        timeEdit,
        dateEdit,
        dispatch,
        setNapTimeStart,
        setNapTimeFinish,
        setNapDateStart,
        setNapDateFinish,
        napTimeStart,
        napTimeFinish,
        napDateStart,
        napDateFinish,
        updateNapTime,
        updateNapDate,
        successMessage,
        babyNapTime,
        deleteData,
    };
};

export default useNapTimeRecord;
