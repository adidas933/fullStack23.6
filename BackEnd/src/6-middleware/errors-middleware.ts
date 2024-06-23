import express, { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../3-models/enums';
import { RouteNotFoundError } from '../3-models/client-error';

class ErrorsMiddleware {
  public catchAll(
    err: any,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log('---------------------');
    console.log(err);
    console.log('---------------------');
    const statusCode = err.status || StatusCode.InternalServerError;
    const message = err.message;

    response.status(statusCode).send(message);
  }

  public routeNotFound(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const error = new RouteNotFoundError(request.originalUrl, request.method);
    next(error);
  }
}

export const errorsMiddleware = new ErrorsMiddleware();
