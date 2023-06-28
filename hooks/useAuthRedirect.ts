import { useAuthContext } from '@/context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function useAuthRedirect() {
    const router = useRouter();
    const authContext = useAuthContext();

    const user = authContext?.user;

    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [user, router]);
}

export default useAuthRedirect;
