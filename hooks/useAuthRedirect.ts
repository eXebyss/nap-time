import { useAuthContext } from '@/context';
import { useRouter } from 'next/navigation';

function useAuthRedirect() {
    const router = useRouter();
    const authContext = useAuthContext();

    const user = authContext?.user;

    if (!user) {
        router.push('/');
    }
}

export default useAuthRedirect;
