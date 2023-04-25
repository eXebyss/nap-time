import { getFirestore, getDocs, collection } from 'firebase/firestore';
import firebase_app from '../config';

const db = getFirestore(firebase_app);

export default async function getDocument(colPath: string) {
    const colRef = collection(db, colPath);

    let result = null;
    let error = null;

    try {
        result = await getDocs(colRef);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
