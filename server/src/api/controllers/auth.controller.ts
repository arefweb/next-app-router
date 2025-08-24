import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '@/api/models/user.model.js';
import { config } from '@/config/index.js';

// Utility function to generate tokens and set cookies
const generateTokensAndSetCookies = (res: Response, userId: number) => {
  const accessToken = jwt.sign({ id: userId }, config.jwt.accessTokenSecret, {
    expiresIn: config.jwt.accessTokenExpiresIn,
  });

  const refreshToken = jwt.sign({ id: userId }, config.jwt.refreshTokenSecret, {
    expiresIn: config.jwt.refreshTokenExpiresIn,
  });

  // Set cookies
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return { accessToken, refreshToken };
};

// --- Controllers ---

export const signupController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newUser = await User.create({ name, email, password });
    await newUser.reload();

    generateTokensAndSetCookies(res, newUser.id);

    // Don't send the password back
    const userJson = newUser.toJSON();
    delete userJson.password;

    return res.status(201).json(userJson);
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'This email is already in use.' });
    }
    console.error('Signup Error:', error);
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    generateTokensAndSetCookies(res, user.id);

    const userJson = user.toJSON();
    delete userJson.password;

    return res.status(200).json(userJson);
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token not found.' });
  }

  try {
    const decoded = jwt.verify(refreshToken, config.jwt.refreshTokenSecret) as { id: number };
    generateTokensAndSetCookies(res, decoded.id);
    return res.status(200).json({ message: 'Tokens refreshed successfully.' });
  } catch (error) {
    return res.status(403).json({ error: 'Invalid refresh token.', details: error });
  }
};

export const logoutController = (req: Request, res: Response) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  return res.status(200).json({ message: 'Logged out successfully.' });
};