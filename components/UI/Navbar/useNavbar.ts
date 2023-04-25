import { useAuthContext } from '@/context/AuthContext';
import { useFirestoreContext } from '@/context/FirestoreContext';

const useNavbar = () => {
    const authContext = useAuthContext();
    const { babyData } = useFirestoreContext();

    const user = authContext?.user;

    const userName = user?.displayName ? user.displayName : user?.email;

    const babyName = babyData?.result
        ? babyData.result?.docs[0]?.data()?.name
        : null;

    return { user, userName, babyName };
};

export default useNavbar;
