import Express from 'express';

import { getDataCollection } from '../controllers/database';

const skillsRoutes = Express.Router();

const getSkills: Express.RequestHandler = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
): Promise<void> => {
  try {
    const data = await getDataCollection(req.params.collection);

    res.json(data);
  } catch (error) {
    next(error);
  }
};

skillsRoutes.get('/:collection', getSkills);

export default skillsRoutes;
