import db from '../models/db';
import { Request, Response } from 'express';
const { v4: uuidv4 } = require('uuid');

const createMessage = async (req: Request, res: Response) => {
  console.log(req.body);
};
