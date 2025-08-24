import { Request, Response } from 'express';
import User from '@/api/models/user.model.js';

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: 'Name and email are required.',
      });
    }

    const newUser = await User.create({ name, email });

    await newUser.reload();
    return res.status(201).json(newUser);
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        error: 'This email is already in use.',
      });
    }

    console.error('Error creating user:', error);
    return res.status(500).json({
      error: 'An unexpected error occurred.',
    });
  }
};