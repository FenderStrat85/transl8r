import { Request, Response } from 'express';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import db from '../models/db';
const SECRET_KEY = process.env.SECRET_KEY;
const { v4: uuidv4 } = require('uuid');

const register = async (req: Request, res: Response) => {
  const { email, password, name, role, languages } = req.body;
  const user =
    role === 'customer'
      ? await db.Customer.findOne({ where: { email: email } })
      : await db.Translator.findOne({ where: { email: email } });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'Could not create user' });
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    if (role === 'customer') {
      const newCustomer = new db.Customer({
        _id: uuidv4(),
        name,
        email,
        password: hash,
        role,
      });
      const { _id } = await newCustomer.save();
      const accessToken = jwt.sign({ _id }, SECRET_KEY);
      res.status(201).send({ accessToken });
    } else {
      const newTranslator = new db.Translator({
        _id: uuidv4(),
        name,
        email,
        password: hash,
        role,
      });
      const translator = await newTranslator.save();
      // we need to transform the string into an array, but this is probably because we are
      // sending the array in a json format, check this logic when the client will send a real array
      const langArray = languages.slice(1, -1).split(', ');
      for (let lang of langArray) {
        //accesses the language model and then adds the link between translator and language
        const languageSpoken = await db.Language.findOne({
          where: { languageName: lang },
        });
        translator.addLanguage(languageSpoken._id);
        translator.save();
      }
      const translatorId = translator._id;
      const accessToken = jwt.sign({ translatorId }, SECRET_KEY);
      res.status(201).send({ accessToken });
    }
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user =
      (await db.Customer.findOne({ where: { email: email } })) ||
      (await db.Translator.findOne({ where: { email: email } }));
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).send({ accessToken });
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password not valid' });
  }
};

module.exports = { register, login };
