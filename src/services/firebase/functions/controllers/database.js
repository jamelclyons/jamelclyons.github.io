import { db } from '../../config.js';

export const postData = async (collection, docID, data) => {
  try {
    const docSnap = await db.collection(collection).doc(docID);

    let res = docSnap.set(data);

    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getData = async (collection, docID) => {
  try {
    const docSnap = await db.collection(collection).doc(docID).get();

    let data = docSnap.data();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDataCollection = async (collection) => {
  try {
    const snapshot = await db.collection(collection).get();
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return docs;
  } catch (error) {
    throw new Error(error.message);
  }
};