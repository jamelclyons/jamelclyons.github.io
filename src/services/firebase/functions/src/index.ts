import { onRequest } from "firebase-functions/v2/https";

import app from './server';

export const api = onRequest(app);
