'use client';

import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';
import Button from '../../UI/Button';
import { useInitialScreenContext } from '../InitialScreenContext';

const InitialForm = () => {
    const authContext = useAuthContext();
    const user = authContext?.user;

    const context = useInitialScreenContext();

    if (!context) {
        return null;
    }

    const {
        state,
        handleForm,
        setEmail,
        setPassword,
        handleSwitchToSignIn,
        handleSwitchToSignUp,
    } = context;

    return !user && (state?.isSignInForm || state?.isSignUpForm) ? (
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mt-4">
            <div className="card-body">
                {state?.authMessage && <p>{state?.authMessage}</p>}
                <form onSubmit={handleForm}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@mail.com"
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                            className={`input input-bordered ${
                                state?.passwordError && 'border-error'
                            }`}
                        />
                        <span className="text-error pt-2">
                            {state?.passwordError && state?.passwordError}
                        </span>
                        {!user && state?.isSignInForm && (
                            <label className="label">
                                <Link
                                    href="/signup"
                                    className="label-text-alt link link-hover"
                                >
                                    Don't have an account?
                                </Link>
                            </label>
                        )}
                    </div>
                    <div className="form-control mt-6">
                        {!user && state?.isSignInForm && (
                            <div className="flex flex-col w-full border-opacity-50">
                                <div className="grid h-20 rounded-box place-items-center">
                                    <Button
                                        type="submit"
                                        classes="btn-primary w-full"
                                    >
                                        Login
                                    </Button>
                                </div>
                                <div className="divider">OR</div>
                                <div className="grid h-20 rounded-box place-items-center">
                                    <Button
                                        type="submit"
                                        classes="btn-outline w-full"
                                        onClick={handleSwitchToSignUp}
                                    >
                                        Register
                                    </Button>
                                </div>
                            </div>
                        )}
                        {!user && state?.isSignUpForm && (
                            <div className="flex flex-col w-full border-opacity-50">
                                <div className="grid h-20 rounded-box place-items-center">
                                    <Button
                                        type="submit"
                                        classes="btn-primary w-full"
                                    >
                                        Register
                                    </Button>
                                </div>
                                <div className="divider">OR</div>
                                <div className="grid h-20 rounded-box place-items-center">
                                    <Button
                                        type="submit"
                                        classes="btn-outline w-full"
                                        onClick={handleSwitchToSignIn}
                                    >
                                        Login
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    ) : null;
};

export default InitialForm;
