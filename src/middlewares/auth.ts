import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Token no proporcionado' });
    return;
  }
  try {
    (req as any).user = jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido o expirado' });
  } 
};
