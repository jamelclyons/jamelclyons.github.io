import corsLib, { CorsOptions } from 'cors';

import * as functions from 'firebase-functions/v1';

import { getData, postData } from './controllers/database';

import ResponseError from './model/ResponseError';

let origin: string | Array<string> =
  process.env.CORS_ORIGIN ?? 'http://localhost:3000';

if (process.env.NODE_ENV === 'development') {
  if (process.env.DEV_CORS_ORIGIN && process.env.DEV_CORS_ORIGIN_1) {
    origin = [process.env.DEV_CORS_ORIGIN, process.env.DEV_CORS_ORIGIN_1];

    origin.forEach((url) => {
      console.log(`Server is now accepting request from ${url}`);
    });
  }
} else {
  if (process.env.CORS_ORIGIN && process.env.CORS_ORIGIN_1) {
    origin = [process.env.CORS_ORIGIN, process.env.CORS_ORIGIN_1];

    origin.forEach((url) => {
      console.log(`Server is now accepting request from ${url}`);
    });
  }
}

const corsOptions: CorsOptions = {
  origin: origin,
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Refresh-Token'],
};

const cors = corsLib(corsOptions);

export const check = functions.https.onRequest(async (req, res) => {
  try {
    console.log(req);
    // await checkToken(req);

    res.json({ success_message: 'Token is valid.' });
  } catch (error) {
    const err = error as ResponseError;

    res.json({
      error_message: err.message,
      status_code: err.statusCode,
    });
  }
});

export const project = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const projectID = req.params[0];
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
  });
});

export const saveProject = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const id = req.params[0];

      let repoURL = null;

      if (req.body.process) {
        repoURL = req.body.process.development.repo_url;
      }

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
  });
});

export const user = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const id = req.params[0];

      const data = await getData('user', id);

      if (data === null) {
        throw new ResponseError(`${id} could not be found.`, 404);
      }

      res.json({ data: data });
    } catch (error) {
      const err = error as ResponseError;

      res.json({
        error_message: err.message,
        status_code: err.statusCode,
      });
    }
  });
});

export const organization = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const id = req.params[0];

      const data = await getData('organization', id);

      if (data === null) {
        throw new ResponseError(`${id} could not be found.`, 404);
      }

      res.json({ data: data });
    } catch (error) {
      const err = error as ResponseError;

      res.json({
        error_message: err.message,
        status_code: err.statusCode,
      });
    }
  });
});
