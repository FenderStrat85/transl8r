import { Request, Response } from 'express';
import { IntUser } from '../interfaces/interfaces';
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
      // write functions for adding languages
      const newTranslator = new db.Translator({
        _id: uuidv4(),
        name,
        email,
        password: hash,
        role,
      });
      const { _id } = await newTranslator.save();
      const accessToken = jwt.sign({ _id }, SECRET_KEY);
      res.status(201).send({ accessToken });
    }
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Use sql syntax and import user model
    const user = await db.Customer.findOne({ email: email });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).send({ accessToken });
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};

module.exports = { register, login };
