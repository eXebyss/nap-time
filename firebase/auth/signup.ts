import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import firebaseApp from '../config';

const auth = getAuth(firebaseApp);

export default async function signUp(email: string, password: string) {
    let result;
    let error;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        if (e instanceof Error) {
            error = e.message;
        }
        error = String(e);
    }

    return { result, error };
}
