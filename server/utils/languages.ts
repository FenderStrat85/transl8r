import db from '../models/db';
import { v4 as uuidv4 } from 'uuid';

const languageArray: string[] = [
  'English',
  'French',
  'German',
  'Italian',
  'Russian',
  'Spanish',
  'Chinese',
  'Japanese',
  'Korean',
];
//called using npm run populate to automatically populate the languages offered in the app
const addLang = async (): Promise<void> => {
  try {
    for (const lang of languageArray) {
      const newLang = new db.Language({
        languageName: lang,
        _id: uuidv4(),
      });

      await newLang.save();
    }
  } catch (error) {
    console.log(error);
  }
};

addLang();

module.exports = { addLang };
