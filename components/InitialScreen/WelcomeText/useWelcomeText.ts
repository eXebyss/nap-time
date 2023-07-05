import { useEffect, useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useFirestoreContext } from '@/context/FirestoreContext';
import updateUserName from '@/firebase/auth/updateUserName';
import { useBabyContext } from '@/context';

const useWelcomeText = () => {
    const authContext = useAuthContext();
    const { babyData } = useFirestoreContext();
    const { babyName, addBabyName } = useBabyContext();
    const [displayName, setDisplayName] = useState(
        authContext?.user?.displayName,
    );

    useEffect(() => {
        authContext?.user?.displayName &&
            setDisplayName(authContext?.user?.displayName);
    }, [authContext]);

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
