import { useAuthContext } from '@/context/AuthContext';
import deleteSubDocumentArrayItem from '@/firebase/firestore/deleteSubDocFieldData';
import { useBabyContext, useFirestoreContext } from '@/context';
import moment from 'moment';
import { useEffect, useReducer } from 'react';
import updateSubDocumentField from '@/firebase/firestore/updateSubDocFieldData';
import {
    NapTimeRecordState,
    NapTimeRecordAction,
    NapTimeRecordDispatchAction,
    NapTimeRecordData,
} from './types';

const useNapTimeRecord = (napTime: NapTimeRecordData) => {
    const authContext = useAuthContext();
    const { babyData } = useFirestoreContext();
    const { babyNapTime, fetchBabyData } = useBabyContext();

    const user = authContext?.user;

    const initialState: NapTimeRecordState = {
        isOpen: false,
        isTimeFormOpen: false,
        isDateFormOpen: false,
        napTimeStart: '',
        napTimeFinish: '',
        napDateStart: '',
        napDateFinish: '',
        successMessage: '',
    };

    const dispatchAction: NapTimeRecordDispatchAction = {
        setOpen: 'SET_OPEN',
        setTimeFormOpen: 'SET_TIME_FORM_OPEN',
        setDateFormOpen: 'SET_DATE_FORM_OPEN',
        setNapTimeStart: 'SET_NAP_TIME_START',
        setNapTimeFinish: 'SET_NAP_TIME_FINISH',
        setNapDateStart: 'SET_NAP_DATE_START',
        setNapDateFinish: 'SET_NAP_DATE_FINISH',
        setSuccessMessage: 'SET_SUCCESS_MESSAGE',
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

    const reducer = (
        state: NapTimeRecordState,
        action: NapTimeRecordAction,
    ): NapTimeRecordState => {
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
    const { isOpen, isTimeFormOpen, isDateFormOpen, successMessage } = state;

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
        napTime: NapTimeRecordData,
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
                    type: '🌞',
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
        napTime: NapTimeRecordData,
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
                    type: '🌚',
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

    const findIndexByNapTime = () => {
        const napTimeArray = babyData?.result?.docs[0]?.data()?.napTime;

        if (napTimeArray) {
            return napTimeArray.findIndex(
                (item: { start: string; finish: string }) => {
                    return (
                        item.start === napTime.start &&
                        item.finish === napTime.finish
                    );
                },
            );
        }

        return -1;
    };

    const deleteData = async (index?: number) => {
        if (index) {
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
        }

        babyData?.result?.docs[0]?.id &&
            user?.uid &&
            (await deleteSubDocumentArrayItem(
                'user',
                user.uid,
                'baby',
                babyData?.result?.docs[0]?.id,
                'napTime',
                babyData?.result?.docs[0]?.data()?.napTime[
                    findIndexByNapTime()
                ],
            ));

        fetchBabyData();
    };

    return {
        state,
        timeEdit,
        dateEdit,
        dispatch,
        setNapTimeStart,
        setNapTimeFinish,
        setNapDateStart,
        setNapDateFinish,
        updateNapTime,
        updateNapDate,
        babyNapTime,
        deleteData,
    };
};

export default useNapTimeRecord;
