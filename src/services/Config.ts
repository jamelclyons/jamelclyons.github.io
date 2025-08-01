import { setEnvVariables as setComEnvVariables } from '@the7ofdiamonds/communications';
import { setEnvVariables as setGatewayVariables } from '@the7ofdiamonds/gateway';
import { setEnvVariables as setGitPortVariables } from '@the7ofdiamonds/github-portfolio';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const initializeConfig = () => {
  setGatewayVariables(import.meta.env);
  setGitPortVariables(import.meta.env)
  setComEnvVariables(import.meta.env)
};