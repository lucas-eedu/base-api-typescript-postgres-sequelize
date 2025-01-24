import { Request, Response, NextFunction } from 'express';
import ServiceException from '../exceptions/ServiceException';

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): Response {
  if (err instanceof ServiceException) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}

export default errorHandler;
