'use client';

import { useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import addData from '@/firebase/firestore/addDocument';

export default function Admin() {
    const authContext = useAuthContext();
    const router = useRouter();

    const user = authContext?.user;

    useEffect(() => {
        if (user === null) router.push('/');
    }, [user, router]);

    const handleForm = async () => {
        const data = {
            name: 'Pete123',
            house: 'Clark',
        };
        const { error } = await addData('users', 'user-id123', data);

        if (error) {
            return console.error(error);
        }
    };

    return (
        <>
            <h1>Only logged in users can view this page</h1>
            <h2>{user?.email}</h2>
            <button type="button" onClick={handleForm}>
                Add Data
            </button>
        </>
    );
}
