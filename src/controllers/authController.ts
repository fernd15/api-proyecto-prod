import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secreto', { expiresIn: '1h' });
    res.status(200).json({ token });
    return;
  }

  res.status(401).json({ message: 'Credenciales inválidas' });
};