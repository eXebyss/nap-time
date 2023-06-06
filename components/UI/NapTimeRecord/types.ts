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
    | { type: 'setOpen'; payload: boolean }
    | { type: 'setTimeFormOpen'; payload: boolean }
    | { type: 'setDateFormOpen'; payload: boolean }
    | { type: 'setNapTimeStart'; payload: string | null }
    | { type: 'setNapTimeFinish'; payload: string | null }
    | { type: 'setNapDateStart'; payload: string | null }
    | { type: 'setNapDateFinish'; payload: string | null }
    | { type: 'setSuccessMessage'; payload: string | null };

export type NapTimeRecordDispatchAction = {
    setOpen: 'setOpen';
    setTimeFormOpen: 'setTimeFormOpen';
    setDateFormOpen: 'setDateFormOpen';
    setNapTimeStart: 'setNapTimeStart';
    setNapTimeFinish: 'setNapTimeFinish';
    setNapDateStart: 'setNapDateStart';
    setNapDateFinish: 'setNapDateFinish';
    setSuccessMessage: 'setSuccessMessage';
};

export interface NapTimeRecordProps {
    napTime: NapTimeRecordData;
    index: number;
}
