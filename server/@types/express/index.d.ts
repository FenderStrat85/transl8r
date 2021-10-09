import { Express } from 'express';
import { IntUser } from '../../interfaces/interfaces';

declare global {
  namespace Express {
    interface Request {
      user: IntUser;
    }
  }
}
