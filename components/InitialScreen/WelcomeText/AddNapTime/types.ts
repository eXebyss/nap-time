export type State = {
    isOpen: boolean;
    isFormOpen: boolean;
    napStart: string | undefined;
    napFinish: string | undefined;
    successMessage: string | undefined;
};

export type Action =
    | { type: 'setOpen'; payload: boolean }
    | { type: 'setFormOpen'; payload: boolean }
    | { type: 'setNapStart'; payload: string | undefined }
    | { type: 'setNapFinish'; payload: string | undefined }
    | { type: 'setSuccessMessage'; payload: string | undefined };

export type DispatchAction = {
    setOpen: 'setOpen';
    setFormOpen: 'setFormOpen';
    setNapStart: 'setNapStart';
    setNapFinish: 'setNapFinish';
    setSuccessMessage: 'setSuccessMessage';
};
