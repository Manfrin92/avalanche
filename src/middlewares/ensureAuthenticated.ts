import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

// eslint-disable-next-line consistent-return
export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void | Response {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response
      .status(401)
      .json({ message: 'Authentication header is missing' });
  }

  if (authHeader) {
    const [, token] = authHeader.split(' ');
    try {
      const decoded = verify(token, authConfig.jwt.secret);

      const { sub } = decoded as ITokenPayload;

      request.user = {
        id: sub,
      };
      return next();
    } catch (e) {
      return response.status(401).json({ message: 'Invalid JWT token' });
    }
  }
}
