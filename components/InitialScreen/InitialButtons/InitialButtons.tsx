'use client';

import { useAuthContext } from '@/context/AuthContext';
import Button from '../../UI/Button';
import { useInitialScreenContext } from '../InitialScreenContext';

const InitialButtons = () => {
    const authContext = useAuthContext();
    const context = useInitialScreenContext();

    const user = authContext?.user;

    if (!context) {
        return null;
    }

    const { state, handleSwitchToSignIn, handleSwitchToSignUp } = context;

    return !(user || state?.isSignInForm || state?.isSignUpForm) ? (
        <div className="flex w-full mt-4">
            <div className="grid h-20 flex-grow rounded-box place-items-center">
                <Button
                    type="button"
                    ariaLabel="Sign In"
                    onClick={handleSwitchToSignIn}
                    classes="btn-outline mx-4"
                >
                    Sign In
                </Button>
            </div>
            <div className="divider divider-horizontal">OR</div>
            <div className="grid h-20 flex-grow rounded-box place-items-center">
                <Button
                    type="button"
                    ariaLabel="Sign Up"
                    onClick={handleSwitchToSignUp}
                    classes="btn-outline mx-4 "
                >
                    Sign Up
                </Button>
            </div>
        </div>
    ) : null;
};

export default InitialButtons;
