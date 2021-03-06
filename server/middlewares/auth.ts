import { Request, Response, NextFunction } from 'express';
import db from '../models/db';
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
import { IUser } from '../interfaces/interfaces';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];
  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user: IUser =
      (await db.Customer.findOne({ where: { _id: _id } })) ||
      (await db.Translator.findOne({ where: { _id: _id } }));
    if (!user) {
      return res.sendStatus(402);
    }
    req.user = user;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

export = authMiddleware;
