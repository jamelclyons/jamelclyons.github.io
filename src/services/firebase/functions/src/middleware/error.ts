import Express from 'express';

const handler: Express.RequestHandler = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    const message = 'Internal Server Error';

    res.status(statusCode).json({
      error_message: message,
    });
  } catch (error) {
    console.error('Error verifying admin:', error);
    res.status(403).json({ error_message: 'Invalid token' });
  }
};

export default handler;
