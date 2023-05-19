'use client';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useAuthContext } from '@/context/AuthContext';
import signInWithGoogle from '@/firebase/auth/signInWithGoogle';
import Button from '../../UI/Button';
import { useInitialScreenContext } from '../InitialScreenContext';

const InitialForm = () => {
    const authContext = useAuthContext();
    const context = useInitialScreenContext();

    const user = authContext?.user;

    if (!context) {
        return null;
    }

    const {
        state: {
            password,
            passwordSecurityLevel,
            isSignInForm,
            isSignUpForm,
            authMessage,
            passwordError,
            showPassword,
            showConfirmPassword,
        },
        handleForm,
        setEmail,
        setPassword,
        setConfirmPassword,
        setShowPassword,
        setShowConfirmPassword,
        handleSwitchToSignIn,
        handleSwitchToSignUp,
    } = context;

    return !user && (isSignInForm || isSignUpForm) ? (
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mt-4">
            <div className="card-body">
                {authMessage && <p>{authMessage}</p>}
                <form onSubmit={handleForm}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                            autoComplete="email"
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
                        <div className="grid grid-cols-12">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                type={showPassword ? 'text' : 'password'}
                                autoComplete={
                                    isSignInForm
                                        ? 'current-password'
                                        : 'new-password'
                                }
                                name="password"
                                id="password"
                                placeholder="password"
                                className={`input input-bordered ${
                                    passwordError && 'border-error'
                                } col-span-11`}
                            />
                            <button
                                type="button"
                                onClick={setShowPassword}
                                className="col-span-1 mx-auto"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {isSignUpForm && password && (
                            <>
                                <label className="label">
                                    <span className="label-text">
                                        Confirm Password
                                    </span>
                                </label>
                                <div className="grid grid-cols-12">
                                    <input
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        required
                                        type={
                                            showConfirmPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        autoComplete="current-password"
                                        name="password"
                                        id="confirmPassword"
                                        placeholder="password"
                                        className={`input input-bordered ${
                                            passwordError && 'border-error'
                                        } col-span-11`}
                                    />
                                    <button
                                        type="button"
                                        onClick={setShowConfirmPassword}
                                        className="col-span-1 mx-auto"
                                    >
                                        {showConfirmPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                        {isSignUpForm && password && passwordSecurityLevel && (
                            <p className="text-sm fhd:text-base pt-2">
                                Password is{' '}
                                <span
                                    className={`font-bold ${
                                        passwordSecurityLevel === 'Very Weak'
                                            ? 'text-red-500'
                                            : ''
                                    }${
                                        passwordSecurityLevel === 'Weak'
                                            ? 'text-orange-500'
                                            : ''
                                    }${
                                        passwordSecurityLevel === 'Moderate'
                                            ? 'text-yellow-500'
                                            : ''
                                    }${
                                        passwordSecurityLevel === 'Strong'
                                            ? 'text-green-500'
                                            : ''
                                    }${
                                        passwordSecurityLevel === 'Very Strong'
                                            ? 'text-blue-500'
                                            : ''
                                    }${
                                        passwordSecurityLevel === 'Extra Strong'
                                            ? 'text-purple-500'
                                            : ''
                                    }`}
                                >
                                    {passwordSecurityLevel}
                                </span>
                                .
                            </p>
                        )}
                        {passwordError && (
                            <span className="text-error pt-2">
                                {passwordError}
                            </span>
                        )}
                    </div>
                    <div className="form-control mt-6">
                        {!user && isSignInForm && (
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
                        {!user && isSignUpForm && (
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
                        <div className="divider">OR</div>
                        <div className="grid h-20 flex-grow rounded-box place-items-center">
                            <Button
                                type="button"
                                onClick={signInWithGoogle}
                                classes="btn-outline w-full"
                            >
                                <FcGoogle className="mr-2" />
                                Google
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    ) : null;
};

export default InitialForm;
