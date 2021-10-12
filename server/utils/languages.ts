import db from '../models/db';
const { v4: uuidv4 } = require('uuid');

const languageArray = ['English', 'French', 'Italian', 'Spanish', 'Chinese'];
let i = 1;
//called using npm run populate to automatically populate the languages offered in the app
const addLang = async () => {
  try {
    for (const lang of languageArray) {
      const newLang = new db.Language({
        languageName: lang,
        _id: uuidv4(),
      });

      const language = await newLang.save();
    }
  } catch (error) {
    console.log(error);
  }
};

addLang();

module.exports = { addLang };
