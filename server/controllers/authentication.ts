import { Request, Response } from 'express';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import db from '../models/db';
const SECRET_KEY = process.env.SECRET_KEY;

// need to require the user model and change accordingly

const create = async (req: Request, res: Response) => {
  const { email, password, name, role } = req.body;
  // change to sql syntax
  const user = await db.User.findOne({ where: { email: email } });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'Could not create user' });
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    // insert all the infos
    // add also languages?
    const newUser = new db.User({
      ...req.body,
      password: hash,
    });
    const { _id } = await newUser.save();
    const accessToken = jwt.sign({ _id }, SECRET_KEY);
    res.status(201).send({ accessToken });
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Use sql syntax and import user model
    const user = await db.User.findOne({ email: email });
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
