import {
    getFirestore,
    doc,
    updateDoc,
    collection,
    DocumentData,
} from 'firebase/firestore';
import firebase_app from '../config';

const db = getFirestore(firebase_app);

export default async function updateSubDocument(
    path: string,
    pathSegments: string,
    subPath: string,
    subDocId: string,
    data: DocumentData,
) {
    let error = null;

    const docRef = doc(db, path, pathSegments);

    const subCollection = collection(docRef, subPath);

    const subDocRef = doc(subCollection, subDocId);

    try {
        await updateDoc(subDocRef, data);
    } catch (e) {
        error = e;
    }

    return error;
}
