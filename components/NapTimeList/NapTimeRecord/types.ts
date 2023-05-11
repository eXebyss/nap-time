export interface NapTimeRecordData {
    start: string;
    finish: string;
}

export type NapTimeRecordState = {
    isOpen: boolean;
    isTimeFormOpen: boolean;
    isDateFormOpen: boolean;
    napTimeStart: string | undefined;
    napTimeFinish: string | undefined;
    napDateStart: string | undefined;
    napDateFinish: string | undefined;
    successMessage: string | undefined;
};

export type NapTimeRecordAction =
    | { type: 'setOpen'; payload: boolean }
    | { type: 'setTimeFormOpen'; payload: boolean }
    | { type: 'setDateFormOpen'; payload: boolean }
    | { type: 'setNapTimeStart'; payload: string | undefined }
    | { type: 'setNapTimeFinish'; payload: string | undefined }
    | { type: 'setNapDateStart'; payload: string | undefined }
    | { type: 'setNapDateFinish'; payload: string | undefined }
    | { type: 'setSuccessMessage'; payload: string | undefined };

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
