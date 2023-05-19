import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import firebaseApp from '../config';

const auth = getAuth(firebaseApp);

export default async function signInWithGoogle() {
    let result;
    let error;
    try {
        const provider = new GoogleAuthProvider();

        result = await signInWithPopup(auth, provider);
    } catch (e) {
        if (e instanceof Error) {
            error = e.message;
        }
        error = String(e);
    }
    return { result, error };
}
