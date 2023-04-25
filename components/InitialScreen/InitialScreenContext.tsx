'use client';

import { createContext, useContext, useMemo } from 'react';
import useInitialScreen from './useInitialScreen';
import { State } from './types';

type InitialScreenContextType = {
    state: State;
    handleForm: (event: React.FormEvent<Element>) => Promise<void>;
    handleSwitchToSignIn: (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => Promise<void>;
    handleSwitchToSignUp: (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => Promise<void>;
    isEmailValid: boolean;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
};

const InitialScreenContext = createContext<InitialScreenContextType | null>(
    null,
);

export const useInitialScreenContext = () => useContext(InitialScreenContext);

export const InitialScreenContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const {
        state,
        setEmail,
        setPassword,
        isEmailValid,
        handleForm,
        handleSwitchToSignIn,
        handleSwitchToSignUp,
    } = useInitialScreen();

    const contextValue = useMemo(
        () => ({
            state,
            handleForm,
            handleSwitchToSignIn,
            handleSwitchToSignUp,
            isEmailValid,
            setEmail,
            setPassword,
        }),
        [
            state,
            handleForm,
            handleSwitchToSignIn,
            handleSwitchToSignUp,
            isEmailValid,
            setEmail,
            setPassword,
        ],
    );

    return (
        <InitialScreenContext.Provider value={contextValue}>
            {children}
        </InitialScreenContext.Provider>
    );
};
