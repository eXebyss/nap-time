import { useAuthContext } from '@/context/AuthContext';
import addSubData from '@/firebase/firestore/addSubDocument';
import { useFirestoreContext } from '@/context/FirestoreContext';

const useWelcomeText = () => {
    const authContext = useAuthContext();
    const { babyData } = useFirestoreContext();

    const user = authContext?.user;
    const loading = authContext?.loading;

    const addBabyName = (value: string) => {
        user?.uid && addSubData('user', user.uid, 'baby', { name: value });
    };

    const babyName = babyData?.result
        ? babyData.result?.docs[0]?.data()?.name
        : null;

    const babyNapTime = babyData?.result
        ? babyData.result?.docs[0]?.data()?.napTime
        : null;

    return {
        user,
        loading,
        addBabyName,
        babyName,
        babyNapTime,
    };
};

export default useWelcomeText;
