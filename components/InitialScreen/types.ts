export type InitialScreenState = {
    email: string;
    password: string;
    confirmPassword: string;
    showPassword: boolean;
    showConfirmPassword: boolean;
    passwordSecurityLevel: string;
    isSignInForm: boolean;
    isSignUpForm: boolean;
    passwordError: string | undefined;
    authMessage: string | undefined;
};

export type InitialScreenAction =
    | { type: 'SET_EMAIL'; payload: string }
    | { type: 'SET_PASSWORD'; payload: string }
    | { type: 'SET_CONFIRM_PASSWORD'; payload: string }
    | { type: 'SET_SHOW_PASSWORD'; payload: boolean }
    | { type: 'SET_SHOW_CONFIRM_PASSWORD'; payload: boolean }
    | { type: 'SET_PASSWORD_SECURITY_LEVEL'; payload: string }
    | { type: 'SET_IS_SIGN_IN_FORM'; payload: boolean }
    | { type: 'SET_IS_SIGN_UP_FORM'; payload: boolean }
    | { type: 'SET_PASSWORD_ERROR'; payload: string | undefined }
    | { type: 'SET_AUTH_MESSAGE'; payload: string | undefined };
