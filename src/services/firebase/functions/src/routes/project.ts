import Express from 'express';

import { getData, postData } from '../controllers/database';

import checkAdmin from '../middleware/admin';

const projectRoutes = Express.Router();

const saveProject: Express.RequestHandler = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
): Promise<void> => {
  try {
    const id = req.params.projectID;
    const data = await postData('portfolio', id, req.body);

    if (!data) {
      res.json({
        error_message: `Project with the #ID: ${id} could not be updated.`,
      });
    }

    res.json({
      success_message: `Project with the #ID: ${id} was updated.`,
    });
  } catch (error) {
    next(error);
  }
};

const getProject: Express.RequestHandler = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
): Promise<void> => {
  try {
    const projectID = req.params.projectID;
    const data = await getData('portfolio', projectID);

    if (!data) {
      res.json({
        error_message: `${projectID} could not be found.`,
        status_code: 404,
      });
    }

    res.json({ data: data });
  } catch (error) {
    next(error);
  }
};

projectRoutes.post('/:projectID', saveProject);

projectRoutes.get('/:projectID', getProject);

export default projectRoutes;
