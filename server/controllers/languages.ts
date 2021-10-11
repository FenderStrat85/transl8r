import db from '../models/db';
import { Request, Response } from 'express';
const { v4: uuidv4 } = require('uuid');

const languageArray = ['English', 'French', 'Italian', 'Spanish', 'Chinese'];

const addLang = async (req: Request, res: Response) => {
  try {
    for (const lang of languageArray) {
      const newLang = new db.Language({
        languageName: lang,
        _id: uuidv4(),
      });
      const language = await newLang.save();
      res.sendStatus(200);
    }
  } catch (error) {
    res
      .status(400)
      .send({ error: '400', message: 'Not able to populate the database' });
  }
};

module.exports = { addLang };
