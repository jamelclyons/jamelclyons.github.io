import Express from 'express';

import checkToken from '../middleware/token';

import ResponseError from '../model/ResponseError';

const authRoutes = Express.Router();


// export const signInWithCustomToken = async (customToken: string): Promise<string> => {
  
// };

const authCheck: Express.RequestHandler = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    await checkToken(req);  

    res.json({ success_message: 'Token is valid.' });
  } catch (error) {
    const err = error as ResponseError;

    res.json({
      error_message: err.message,
      status_code: err.statusCode,
    });
  }
};

authRoutes.post('/check', authCheck);

export default authRoutes;
