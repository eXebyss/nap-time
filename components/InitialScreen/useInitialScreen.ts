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
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
        passwordSecurityLevel: '',
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
            case 'SET_EMAIL':
                return {
                    ...state,
                    email: action.payload,
                };
            case 'SET_PASSWORD':
                return {
                    ...state,
                    password: action.payload,
                };
            case 'SET_CONFIRM_PASSWORD':
                return {
                    ...state,
                    confirmPassword: action.payload,
                };
            case 'SET_SHOW_PASSWORD':
                return {
                    ...state,
                    showPassword: action.payload,
                };
            case 'SET_SHOW_CONFIRM_PASSWORD':
                return {
                    ...state,
                    showConfirmPassword: action.payload,
                };
            case 'SET_PASSWORD_SECURITY_LEVEL':
                return {
                    ...state,
                    passwordSecurityLevel: action.payload,
                };
            case 'SET_IS_SIGN_IN_FORM':
                return {
                    ...state,
                    isSignInForm: action.payload,
                };
            case 'SET_IS_SIGN_UP_FORM':
                return {
                    ...state,
                    isSignUpForm: action.payload,
                };
            case 'SET_PASSWORD_ERROR':
                return {
                    ...state,
                    passwordError: action.payload,
                };
            case 'SET_AUTH_MESSAGE':
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
    const { emailValidation, getPasswordSecurityLevel } = useValidation();

    const { isEmailValid } = emailValidation(state.email);

    const setEmail = (email: string) => {
        dispatch({
            type: 'SET_EMAIL',
            payload: email,
        });
    };

    const setPassword = (password: string) => {
        dispatch({
            type: 'SET_PASSWORD',
            payload: password,
        });

        const passwordSecurityLevel = getPasswordSecurityLevel(password);

        dispatch({
            type: 'SET_PASSWORD_SECURITY_LEVEL',
            payload: passwordSecurityLevel,
        });
    };

    const setConfirmPassword = (password: string) => {
        dispatch({
            type: 'SET_CONFIRM_PASSWORD',
            payload: password,
        });
    };

    const setShowPassword = () => {
        dispatch({
            type: 'SET_SHOW_PASSWORD',
            payload: !state.showPassword,
        });
    };

    const setShowConfirmPassword = () => {
        dispatch({
            type: 'SET_SHOW_CONFIRM_PASSWORD',
            payload: !state.showConfirmPassword,
        });
    };

    const setIsSignInForm = (prop: boolean) => {
        dispatch({
            type: 'SET_IS_SIGN_IN_FORM',
            payload: prop,
        });
    };

    const setIsSignUpForm = (prop: boolean) => {
        dispatch({
            type: 'SET_IS_SIGN_UP_FORM',
            payload: prop,
        });
    };

    const setPasswordError = (message: string | undefined) => {
        dispatch({
            type: 'SET_PASSWORD_ERROR',
            payload: message,
        });
    };

    const setAuthMessage = (message: string | undefined) => {
        dispatch({
            type: 'SET_AUTH_MESSAGE',
            payload: message,
        });
    };

    const handleForm = async (event: React.FormEvent) => {
        event.preventDefault();

        if (isEmailValid) {
            if (state.isSignInForm) {
                const { result, error } = await signIn(
                    state.email,
                    state.password,
                );

                if (error) {
                    setAuthMessage(error);
                }

                result && setAuthMessage('Success! ✅');
            } else if (
                state.isSignUpForm &&
                state?.password === state?.confirmPassword
            ) {
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

        // if (!isPasswordValid) {
        //     setPasswordError(passwordErrorMessage);
        // }

        if (state?.password !== state?.confirmPassword) {
            setPasswordError('Passwords should be the same.');
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
        setConfirmPassword,
        setShowPassword,
        setShowConfirmPassword,
        isEmailValid,
        handleForm,
        handleSwitchToSignIn,
        handleSwitchToSignUp,
    };
};

export default useInitialScreen;
