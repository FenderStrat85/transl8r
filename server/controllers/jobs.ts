import db from '../models/db';
import { Request, Response } from 'express';
const { v4: uuidv4 } = require('uuid');

const createJob = async (req: Request, res: Response) => {
  const { CustomerId, jobName, jobType, languageFromName, languageToName } =
    req.body;

  // the next two queries are for retrieving the id of the languages
  const languageFrom = await db.Language.findOne({
    where: { languageName: languageFromName },
  });
  const languageTo = await db.Language.findOne({
    where: { languageName: languageToName },
  });
  const newJob = new db.Job({
    jobName: jobName,
    jobType: jobType,
    _id: uuidv4(),
    languageFrom: languageFrom._id,
    languageTo: languageTo._id,
    CustomerId: CustomerId,
  });
  const job = await newJob.save();
  res.send(job);
};

const acceptJob = async (req: Request, res: Response) => {
  const { jobId, translatorId } = req.body;
  let job = await db.Job.findOne({ where: { _id: jobId } });
  job.TranslatorId = translatorId;
  job.status = 'accepted';
  await job.save();
  res.send(job);
};

module.exports = { createJob, acceptJob };
