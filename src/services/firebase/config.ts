import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';

import { getFirestore, Firestore } from 'firebase/firestore';

import { firebaseConfig } from '@/services/Config';

const app: FirebaseApp = initializeApp(firebaseConfig);

export const db: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);