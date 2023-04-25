import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import firebaseApp from '../config';

const auth = getAuth(firebaseApp);

export default async function signIn(email: string, password: string) {
    let result;
    let error;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        if (e instanceof Error) {
            error = e.message;
        }
        error = String(e);
    }
    return { result, error };
}
