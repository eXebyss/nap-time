export type AddNapTimeState = {
    isOpen: boolean;
    isFormOpen: boolean;
    napStart: string | null;
    napFinish: string | null;
    napDateStart: string | null;
    napDateFinish: string | null;
    napType: string | null;
    successMessage: string | null;
};

export type AddNapTimeAction =
    | { type: 'setOpen'; payload: boolean }
    | { type: 'setFormOpen'; payload: boolean }
    | { type: 'setNapStart'; payload: string | null }
    | { type: 'setNapFinish'; payload: string | null }
    | { type: 'setNapDateStart'; payload: string | null }
    | { type: 'setNapDateFinish'; payload: string | null }
    | { type: 'setNapType'; payload: string | null }
    | { type: 'setSuccessMessage'; payload: string | null };

export type AddNapTimeDispatchAction = {
    setOpen: 'setOpen';
    setFormOpen: 'setFormOpen';
    setNapStart: 'setNapStart';
    setNapFinish: 'setNapFinish';
    setNapDateStart: 'setNapDateStart';
    setNapDateFinish: 'setNapDateFinish';
    setNapType: 'setNapType';
    setSuccessMessage: 'setSuccessMessage';
};
