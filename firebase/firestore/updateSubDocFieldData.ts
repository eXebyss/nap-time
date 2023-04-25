import {
    getFirestore,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
} from 'firebase/firestore';
import firebase_app from '../config';

const db = getFirestore(firebase_app);

async function updateSubDocumentField(
    path: string,
    pathSegments: string,
    subPath: string,
    subDocId: string,
    fieldName: string,
    oldValue: {},
    newValue: {},
) {
    let error = null;

    const docRef = doc(db, path, pathSegments);

    const subDocRef = doc(docRef, subPath, subDocId);

    try {
        await updateDoc(subDocRef, {
            [fieldName]: arrayUnion(newValue),
        });
        await updateDoc(subDocRef, {
            [fieldName]: arrayRemove(oldValue),
        });
    } catch (e) {
        error = e;
    }

    return error;
}

export default updateSubDocumentField;
