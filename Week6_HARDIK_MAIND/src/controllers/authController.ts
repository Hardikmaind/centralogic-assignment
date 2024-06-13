import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from '../models';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const user = await db.User.create({ email, password, role });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email } });
    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'default_secret', {
      expiresIn: '1h',
    });
    res.status(200).json({ message: 'Login successful', token, user});
  } catch (error) {
    res.status(500).json({ error: error , message: 'Login failed'});
  }
};

