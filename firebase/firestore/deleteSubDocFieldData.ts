import { getFirestore, doc, updateDoc, arrayRemove } from 'firebase/firestore';
import firebase_app from '../config';

const db = getFirestore(firebase_app);

async function deleteSubDocumentField(
    path: string,
    pathSegments: string,
    subPath: string,
    subDocId: string,
    fieldName: string,
    value: {},
) {
    let error = null;

    const docRef = doc(db, path, pathSegments);

    const subDocRef = doc(docRef, subPath, subDocId);

    try {
        await updateDoc(subDocRef, {
            [fieldName]: arrayRemove(value),
        });
    } catch (e) {
        error = e;
    }

    return error;
}

export default deleteSubDocumentField;
