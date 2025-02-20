import Express from 'express';

import { getData } from '../controllers/database';

import ResponseError from '../model/ResponseError';

const organizationRoutes = Express.Router();

const getOrganization: Express.RequestHandler = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const data = await getData('organization', id);

    if (data === null) {
      throw new ResponseError(`${id} could not be found.`, 404);
    }

    res.json(data);
  } catch (error) {
    const err = error as ResponseError;

    res.json({
      error_message: err.message,
      status_code: err.statusCode,
    });  }
};
organizationRoutes.get('/:id', getOrganization);

export default organizationRoutes;
