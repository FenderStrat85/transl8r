import { Request, Response, NextFunction } from 'express';
import db from '../models/db';
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
import { IntUser } from '../interfaces/interfaces';

// import User model

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
    const user: IntUser = await db.User.findOne({ _id });
    if (!user) return res.sendStatus(401);
    req.user = user;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

export = authMiddleware;
