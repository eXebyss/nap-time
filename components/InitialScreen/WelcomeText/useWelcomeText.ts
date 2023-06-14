import { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useFirestoreContext } from '@/context/FirestoreContext';
import updateUserName from '@/firebase/auth/updateUserName';

const useWelcomeText = () => {
    const authContext = useAuthContext();
    const { babyData, babyName, addBabyName } = useFirestoreContext();
    const [displayName, setDisplayName] = useState(
        authContext?.user?.displayName,
    );

    const user = authContext?.user;
    const loading = authContext?.loading;

    const babyNapTime = babyData?.result
        ? babyData.result?.docs[0]?.data()?.napTime
        : null;

    const handleUpdateUserName = async (name: string) => {
        await updateUserName(name);
        setDisplayName(name);
    };

    return {
        user,
        loading,
        addBabyName,
        babyName,
        babyNapTime,
        displayName,
        handleUpdateUserName,
    };
};

export default useWelcomeText;
