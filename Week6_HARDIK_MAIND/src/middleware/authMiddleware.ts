import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'Authentication token required' });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw new Error('User not found');
    }

    req.body.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Invalid authentication token' });
    console.log(error);
  }
};

export default authMiddleware;
