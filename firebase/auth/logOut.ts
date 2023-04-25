import { signOut, getAuth } from 'firebase/auth';
import firebaseApp from '../config';

const auth = getAuth(firebaseApp);

export default async function logOut() {
    let result;
    let error;

    try {
        result = await signOut(auth);
    } catch (e) {
        if (e instanceof Error) {
            error = e.message;
        }
        error = String(e);
    }

    return { result, error };
}
