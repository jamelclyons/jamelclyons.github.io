import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

initializeApp({
  credential: cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY,
  }),
});

export const db = getFirestore();

let origin: string = process.env.CORS_ORIGIN ?? 'http://localhost:3000';

if (process.env.NODE_ENV === 'development') {
  origin = 'http://localhost:3000';
}

export { origin };
