import Express from 'express';

import { getData, postData } from '../controllers/database';

import ResponseError from '../model/ResponseError';

const projectRoutes = Express.Router();

const saveProject: Express.RequestHandler = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const id = req.params.projectID;
    const repoURL = req.body.process.development.repo_url;
    const data = await postData('portfolio', id, req.body);

    if (!data) {
      throw new ResponseError(
        `Project with the #ID: ${id} could not be updated.`,
        400
      );
    }

    res.json({
      id: id,
      repo_url: repoURL,
      success_message: `Project with the #ID: ${id} was updated at ${data}.`,
    });
  } catch (error) {
    const err = error as ResponseError;

    res.json({
      error_message: err.message,
      status_code: err.statusCode,
    });
  }
};

const getProject: Express.RequestHandler = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const projectID = req.params.projectID;
    const data = await getData('portfolio', projectID);

    if (data === null) {
      throw new ResponseError(`${projectID} could not be found.`, 404);
    }

    res.json({ data: data });
  } catch (error) {
    const err = error as ResponseError;

    res.json({
      error_message: err.message,
      status_code: err.statusCode,
    });
  }
};

projectRoutes.post('/:projectID', saveProject);

projectRoutes.get('/:projectID', getProject);

export default projectRoutes;
