import Express from 'express';

import checkToken from '../middleware/token';

const authRoutes = Express.Router();

const authCheck: Express.RequestHandler = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const idToken = await checkToken(req);
console.log(req)
    if (!idToken) {
      res.status(200).json({
        error_message: 'Unauthorized: No authentication token provided.',
        status_code: 403,
      });
    }

    if (typeof idToken === 'object') {
      if (idToken && idToken?.isAdmin && idToken.isAdmin === true) {
        res.set('Authorization', 'new Token');
      }
    }
    res.json({ success_message: 'Token is valid.' });
  } catch (error) {
    const err = error as Error;
    res.json({ error_message: err.message, status_code: 403 });
  }
};

authRoutes.get('/check', authCheck);

export default authRoutes;
