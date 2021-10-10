import db from '../models/db';
import { Request, Response } from 'express';
const { v4: uuidv4 } = require('uuid');

const languageArray = ['English', 'French', 'Italian', 'Spanish', 'Chinese'];

// add try catch

const addLang = async (req: Request, res: Response) => {
  for (const lang of languageArray) {
    const newLang = new db.Language({
      languageName: lang,
      _id: uuidv4(),
    });
    const language = await newLang.save();
  }
  res.sendStatus(200);
};

module.exports = { addLang };
