import Express from 'express';

import admin from 'firebase-admin';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const uid = process.env;
// console.log(process.env.PWD)

const getToken = (req: Express.Request) => {
  return req.headers.authorization?.split('Bearer ')[1];
};

const checkToken = async (req: Express.Request) => {
  try {
    const idToken = getToken(req);

    if (!idToken) {
      return idToken;
    }

    const token = jwt.decode(idToken);

    if (typeof token === 'object') {
      if (token && token?.user_id && uid == token.user_id) {
        console.log(token.user_id);
        console.log(token.isAdmin);
      }
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    return decodedToken;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export default checkToken;
