import {
    getFirestore,
    doc,
    addDoc,
    collection,
    DocumentData,
} from 'firebase/firestore';
import firebase_app from '../config';

const db = getFirestore(firebase_app);

export default async function addSubDocument(
    path: string,
    pathSegments: string,
    subPath: string,
    data: DocumentData,
) {
    let result = null;
    let error = null;

    const docRef = doc(db, path, pathSegments);

    const subCollection = collection(docRef, subPath);

    try {
        result = await addDoc(subCollection, data);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
