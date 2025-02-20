import Express from 'express';

import { getData } from '../controllers/database';

const organizationRoutes = Express.Router();

const getOrganization: Express.RequestHandler = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
): Promise<void> => {
  try {
    const data = await getData('organization', req.params.id);

    res.json(data);
  } catch (error) {
    next(error);
  }
};
organizationRoutes.get('/:id', getOrganization);

export default organizationRoutes;
