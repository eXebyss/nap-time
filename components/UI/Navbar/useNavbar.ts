import { useBabyContext } from '@/context';
import { useAuthContext } from '@/context/AuthContext';

const useNavbar = () => {
    const authContext = useAuthContext();
    const { babyName } = useBabyContext();

    const user = authContext?.user;
    const loading = authContext?.loading;

    const userName = user?.displayName ? user.displayName : user?.email;
    const userPhoto = user?.photoURL ? user?.photoURL : '';

    return { user, loading, userName, babyName, userPhoto };
};

export default useNavbar;
