import express, { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../3-models/enums';
import { cyber } from '../2-utils/cyber';
import { UnauthorizedError } from '../3-models/client-error';

class SecurityMiddleware {
  public preventXssAttack(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    for (const prop in request.body) {
      const value = request.body[prop];
      if (typeof value === 'string' && value.includes('<script>')) {
        response.status(StatusCode.BadRequest).send('Nice try!');
        return;
      }
    }
    next(); // Continue the request to the next middleware
  }

  // validate token
  public validateLogin(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    // take header:
    const authorizationHeader = request.headers.authorization;

    // "bearer the-token...""
    // 01234567
    const token = authorizationHeader?.substring(7);

    // check if valid:
    const isValid = cyber.isTokenValid(token);

    // if not valid:
    if (!isValid) {
      next(new UnauthorizedError('you are not logged in'));
    } else {
      next();
    }
  }

  // validate token
  public validateAdmin(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    // take header:
    const authorizationHeader = request.headers.authorization;

    // bearer the token
    // 01234567
    const token = authorizationHeader?.substring(7);

    // check if valid:
    const isValid = cyber.isTokenValid(token);

    // if not valid:
    if (!isValid) {
      next(new UnauthorizedError('you are not logged in'));
      return;
    }

    // Check if admin:
    const isAdmin = cyber.isAdmin(token);

    // If not admin:
    if (!isAdmin) {
      next(new UnauthorizedError('You are not authorized.'));
      return;
    }

    next();
  }
}

export const securityMiddleware = new SecurityMiddleware();
