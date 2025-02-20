import Express from 'express';

import { getDataCollection } from '../controllers/database';

import ResponseError from '../model/ResponseError';

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
    const err = error as ResponseError;

    res.json({
      error_message: err.message,
      status_code: err.statusCode,
    });  }
};

skillsRoutes.get('/:collection', getSkills);

export default skillsRoutes;
