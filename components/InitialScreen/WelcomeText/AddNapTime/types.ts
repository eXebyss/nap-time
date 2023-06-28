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
    | { type: 'SET_OPEN'; payload: boolean }
    | { type: 'SET_FORM_OPEN'; payload: boolean }
    | { type: 'SET_NAP_START'; payload: string | null }
    | { type: 'SET_NAP_FINISH'; payload: string | null }
    | { type: 'SET_NAP_DATE_START'; payload: string | null }
    | { type: 'SET_NAP_DATE_FINISH'; payload: string | null }
    | { type: 'SET_NAP_TYPE'; payload: string | null }
    | { type: 'SET_SUCCESS_MESSAGE'; payload: string | null };

export type AddNapTimeDispatchAction = {
    setOpen: 'SET_OPEN';
    setFormOpen: 'SET_FORM_OPEN';
    setNapStart: 'SET_NAP_START';
    setNapFinish: 'SET_NAP_FINISH';
    setNapDateStart: 'SET_NAP_DATE_START';
    setNapDateFinish: 'SET_NAP_DATE_FINISH';
    setNapType: 'SET_NAP_TYPE';
    setSuccessMessage: 'SET_SUCCESS_MESSAGE';
};
