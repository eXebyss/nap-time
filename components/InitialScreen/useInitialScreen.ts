'use client';

import signIn from '@/firebase/auth/signin';
import signUp from '@/firebase/auth/signup';
import { useReducer } from 'react';
import useValidation from '@/hooks/useValidation';
import { InitialScreenState, InitialScreenAction } from './types';

const useInitialScreen = () => {
    const initialState: InitialScreenState = {
        email: '',
        password: '',
        isSignInForm: false,
        isSignUpForm: false,
        passwordError: '',
        authMessage: '',
    };

    const reducer = (
        state: InitialScreenState,
        action: InitialScreenAction,
    ): InitialScreenState => {
        switch (action.type) {
            case 'setEmail':
                return {
                    ...state,
                    email: action.payload,
                };
            case 'setPassword':
                return {
                    ...state,
                    password: action.payload,
                };
            case 'setIsSignInForm':
                return {
                    ...state,
                    isSignInForm: action.payload,
                };
            case 'setIsSignUpForm':
                return {
                    ...state,
                    isSignUpForm: action.payload,
                };
            case 'setPasswordError':
                return {
                    ...state,
                    passwordError: action.payload,
                };
            case 'setAuthMessage':
                return {
                    ...state,
                    authMessage: action.payload,
                };
            default: {
                throw new Error('Unhandled action type');
            }
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const { emailValidation, passwordValidation } = useValidation();

    const { isEmailValid } = emailValidation(state.email);
    const { isPasswordValid, passwordErrorMessage } = passwordValidation(
        state.password,
    );

    const setEmail = (email: string) => {
        dispatch({
            type: 'setEmail',
            payload: email,
        });
    };

    const setPassword = (password: string) => {
        dispatch({
            type: 'setPassword',
            payload: password,
        });
    };

    const setIsSignInForm = (prop: boolean) => {
        dispatch({
            type: 'setIsSignInForm',
            payload: prop,
        });
    };

    const setIsSignUpForm = (prop: boolean) => {
        dispatch({
            type: 'setIsSignUpForm',
            payload: prop,
        });
    };

    const setPasswordError = (message: string | undefined) => {
        dispatch({
            type: 'setPasswordError',
            payload: message,
        });
    };

    const setAuthMessage = (message: string | undefined) => {
        dispatch({
            type: 'setAuthMessage',
            payload: message,
        });
    };

    const handleForm = async (event: React.FormEvent) => {
        event.preventDefault();

        if (isEmailValid && isPasswordValid) {
            if (state.isSignInForm) {
                const { result, error } = await signIn(
                    state.email,
                    state.password,
                );

                if (error) {
                    setAuthMessage(error);
                }

                result && setAuthMessage('Success! ✅');
            } else if (state.isSignUpForm) {
                const { result, error } = await signUp(
                    state.email,
                    state.password,
                );

                if (error) {
                    setAuthMessage(error);
                }

                result && setAuthMessage('Success! ✅');
            }
        }

        if (!isPasswordValid) {
            setPasswordError(passwordErrorMessage);
        }
    };

    const handleSwitchToSignIn = async (
        event: React.MouseEvent<HTMLButtonElement>,
    ): Promise<void> => {
        event.preventDefault();

        state.isSignUpForm && setIsSignUpForm(false);

        !state.isSignInForm && setIsSignInForm(true);
    };

    const handleSwitchToSignUp = async (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();

        state.isSignInForm && setIsSignInForm(false);

        !state.isSignUpForm && setIsSignUpForm(true);
    };

    return {
        state,
        setEmail,
        setPassword,
        isEmailValid,
        handleForm,
        handleSwitchToSignIn,
        handleSwitchToSignUp,
    };
};

export default useInitialScreen;
