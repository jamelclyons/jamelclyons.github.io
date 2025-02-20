import { WriteResult } from 'firebase-admin/firestore';

import { db } from '../config';

export const postData = async (
  collection: string,
  docID: string,
  data: Record<string, unknown>
) => {
  try {
    const docSnap = await db.collection(collection).doc(docID);

    const res: WriteResult = await docSnap.set(data);
    console.log(res);
    return res;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export const getData = async (collection: string, docID: string) => {
  try {
    const docSnap = await db
      .collection(collection)
      .doc(docID)
      .get();

    const data = await docSnap.data();

    if (data) {
      return data;
    }

    return null;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export const getDataCollection = async (collection: string) => {
  try {
    const snapshot = await db.collection(collection).get();
    const docs = await snapshot.docs;

    if (Array.isArray(docs) && docs.length > 0) {
      const collectionData = docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      return collectionData;
    }

    return null;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};
