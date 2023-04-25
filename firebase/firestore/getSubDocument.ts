import { getFirestore, collection, doc, getDocs } from 'firebase/firestore';
import firebase_app from '../config';

const db = getFirestore(firebase_app);

export default async function getSubDocument(
    colPath: string,
    docPath: string,
    subCollectionPath: string,
) {
    const parentDocRef = doc(db, colPath, docPath);
    const subCollectionRef = collection(parentDocRef, subCollectionPath);

    let result = null;
    let error = null;

    try {
        result = await getDocs(subCollectionRef);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
