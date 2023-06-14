import { useAuthContext } from '@/context/AuthContext';
import { useFirestoreContext } from '@/context/FirestoreContext';

const useNavbar = () => {
    const authContext = useAuthContext();
    const { babyName } = useFirestoreContext();

    const user = authContext?.user;
    const loading = authContext?.loading;

    const userName = user?.displayName ? user.displayName : user?.email;
    const userPhoto = user?.photoURL ? user?.photoURL : '';

    return { user, loading, userName, babyName, userPhoto };
};

export default useNavbar;
