export type State = {
    email: string;
    password: string;
    isSignInForm: boolean;
    isSignUpForm: boolean;
    passwordError: string | undefined;
    authMessage: string | undefined;
};

export type Action =
    | { type: 'setEmail'; payload: string }
    | { type: 'setPassword'; payload: string }
    | { type: 'setIsSignInForm'; payload: boolean }
    | { type: 'setIsSignUpForm'; payload: boolean }
    | { type: 'setPasswordError'; payload: string | undefined }
    | { type: 'setAuthMessage'; payload: string | undefined };
