export interface NapTimeRecordData {
    start: string;
    finish: string;
    type?: string;
}

export type NapTimeRecordState = {
    isOpen: boolean;
    isTimeFormOpen: boolean;
    isDateFormOpen: boolean;
    napTimeStart: string | null;
    napTimeFinish: string | null;
    napDateStart: string | null;
    napDateFinish: string | null;
    successMessage: string | null;
};

export type NapTimeRecordAction =
    | { type: 'SET_OPEN'; payload: boolean }
    | { type: 'SET_TIME_FORM_OPEN'; payload: boolean }
    | { type: 'SET_DATE_FORM_OPEN'; payload: boolean }
    | { type: 'SET_NAP_TIME_START'; payload: string | null }
    | { type: 'SET_NAP_TIME_FINISH'; payload: string | null }
    | { type: 'SET_NAP_DATE_START'; payload: string | null }
    | { type: 'SET_NAP_DATE_FINISH'; payload: string | null }
    | { type: 'SET_SUCCESS_MESSAGE'; payload: string | null };

export type NapTimeRecordDispatchAction = {
    setOpen: 'SET_OPEN';
    setTimeFormOpen: 'SET_TIME_FORM_OPEN';
    setDateFormOpen: 'SET_DATE_FORM_OPEN';
    setNapTimeStart: 'SET_NAP_TIME_START';
    setNapTimeFinish: 'SET_NAP_TIME_FINISH';
    setNapDateStart: 'SET_NAP_DATE_START';
    setNapDateFinish: 'SET_NAP_DATE_FINISH';
    setSuccessMessage: 'SET_SUCCESS_MESSAGE';
};

export interface NapTimeRecordProps {
    napTime: NapTimeRecordData;
    index: number;
}
