'use client';

import { useState, createContext, useContext, useEffect, useMemo } from 'react';
import { onAuthStateChanged, getAuth, UserInfo } from 'firebase/auth';
import firebase_app from '@/firebase/config';

const auth = getAuth(firebase_app);

const AuthContext = createContext<{
    user: UserInfo | null;
    loading: boolean;
} | null>(null);

export const useAuthContext = (): {
    user: UserInfo | null;
    loading: boolean;
} | null => useContext(AuthContext);

/**
 * A React Context Provider component that manages authentication-related state and provides it to the rest of the application through the Context API.
 * @param {{children: React.ReactNode;}} {children}
 * @returns {JSX.Element} A React component that wraps the application and provides authentication state to child components.
 */
interface AuthContextProviderProps {
    children: React.ReactNode;
}

export const AuthContextProvider = ({
    children,
}: AuthContextProviderProps): JSX.Element => {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (user: UserInfo | null) => {
                if (user) {
                    setUser(user);
                } else {
                    setUser(null);
                }
                setLoading(false);
            },
        );

        return () => unsubscribe();
    }, []);

    const contextValue = useMemo(() => {
        return { user, loading };
    }, [user, loading]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
