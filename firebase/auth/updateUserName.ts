import { updateProfile, getAuth } from 'firebase/auth';
import firebaseApp from '../config';

const auth = getAuth(firebaseApp);

export default async function updateUserName(name: string) {
    let result;
    let error;
    try {
        if (auth?.currentUser) {
            result = await updateProfile(auth.currentUser, {
                displayName: name,
            });
        }
    } catch (e) {
        error = e instanceof Error ? e.message : String(e);
    }

    return { result, error };
}
