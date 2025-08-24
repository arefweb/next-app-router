import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '@/config/index.js';

// Extend the Express Request type to include the user property
interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

export const isAuthenticated = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(401).json({ error: 'Not authorized, no token.' });
  }

  try {
    const decoded = jwt.verify(accessToken, config.jwt.accessTokenSecret) as { id: number };
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Not authorized, token failed.' });
  }
};