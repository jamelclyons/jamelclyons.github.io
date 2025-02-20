import Express from 'express';

const checkAdmin = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    if (!req.rawHeaders || !req.rawHeaders) {
      return res.status(200).json({
        error_message: 'Access denied. Admins only.',
        status_code: 403,
      });
    }

    next();
    
    return;
  } catch (error) {
    const err = error as Error;
    return res.status(200).json({ error_message: err, status_code: 403 });
  }
};

export default checkAdmin;
