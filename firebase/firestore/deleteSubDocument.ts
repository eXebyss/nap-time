import { getFirestore, doc, deleteDoc, collection } from 'firebase/firestore';
import firebase_app from '../config';

const db = getFirestore(firebase_app);

export default async function deleteSubDocument(
    path: string,
    pathSegments: string,
    subPath: string,
    subDocId: string,
) {
    let error = null;

    const docRef = doc(db, path, pathSegments);

    const subCollection = collection(docRef, subPath);

    const subDocRef = doc(subCollection, subDocId);

    try {
        await deleteDoc(subDocRef);
    } catch (e) {
        error = e;
    }

    return error;
}
