import Express from 'express';

import { getData } from '../controllers/database';

const userRoutes = Express.Router();

const getUser: Express.RequestHandler = async (req: Express.Request, res: Express.Response): Promise<void> => {
  try {
    const data = await getData('user', req.params.id);

    res.json({ data: data });
  } catch (error) {
    const err = error as Error;
    res.json({ error_message: err.message });
  }
};

userRoutes.get('/:id', getUser);

export default userRoutes;
