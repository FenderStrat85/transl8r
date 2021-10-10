import db from '../models/db';
import { Request, Response } from 'express';
const { v4: uuidv4 } = require('uuid');

const createJob = async (req: Request, res: Response) => {
  const { createdBy, jobName, jobType, languageFrom, languageTo } = req.body;
  // console.log(req.body);
  const customer = await db.Customer.findOne({
    where: { _id: createdBy },
  });
  const languageFromId = await db.Language.findOne({
    where: { languageName: languageFrom },
  });
  const languageToId = await db.Language.findOne({
    where: { languageName: languageTo },
  });
  const newJob = new db.Job({
    jobName: jobName,
    jobType: jobType,
    _id: uuidv4(),
    languageFrom: languageFromId._id,
    languageTo: languageToId._id,
    CustomerId: customer._id,
  });
  const job = await newJob.save();
  res.send(job);
};

module.exports = { createJob };
