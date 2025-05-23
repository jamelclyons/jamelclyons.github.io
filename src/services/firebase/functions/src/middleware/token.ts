// import Express from 'express';
// import jwt from 'jsonwebtoken';
// import { auth } from '../config';
import dotenv from 'dotenv';
// import { FirebaseAuthError } from 'firebase-admin/auth';

import ResponseError from '../model/ResponseError';

// import { ADMIN_UID } from '../config';

dotenv.config();

const getToken = (req: Request) => {
  const authHeader = req.headers.get('authorization');
console.log(authHeader)
  // return req.headers.authorization?.split('Bearer ')[1];
};

// const verifyToken = async (idToken: string, uid: string) => {
//   try {        
//     const decodedIdToken = await auth.verifyIdToken(idToken, true);
//     console.log(decodedIdToken)
//     if (typeof decodedIdToken === 'object') {
//       return idToken;
//     }

//     return null;
//   } catch (error) {
//     const err = error as FirebaseAuthError;

//     if ('code' in err && typeof err.code === 'string') {
//       switch (err.code) {
//         case 'auth/id-token-expired':
//           return await auth.createCustomToken(uid, { isAdmin: true });
//           case 'auth/argument-error':
//             throw new ResponseError('Invalid token.', 400);
//             case 'auth/id-token-revoked':
//           throw new ResponseError('Token revoked. Please log in again.', 403);
//         case 'auth/invalid-id-token':
//           throw new ResponseError('Invalid token.', 400);
//         default:
//           throw new ResponseError(err.message, 500);
//       }
//     }
//   }
// };

const checkToken = async (req: Request) => {
  try {
    getToken(req);
    // const idToken = getToken(req);

    // if (!idToken) {
    //   throw new ResponseError(
    //     'Unauthorized: No authentication token provided.',
    //     403
    //   );
    // }

    // const token = jwt.decode(idToken);

    // if (typeof token === 'object') {
    //   if (token && token?.user_id && ADMIN_UID === token.user_id) {
    //     const uid = token?.user_id;

    //     if (token?.isAdmin !== true) {
    //       await auth.setCustomUserClaims(uid, { isAdmin: true });
    //     }

    //     return await verifyToken(idToken, uid);
    //   }
    // }

    return null;
  } catch (error) {
    const err = error as ResponseError;
    throw new ResponseError(err.message, err.statusCode);
  }
};

export default checkToken;
