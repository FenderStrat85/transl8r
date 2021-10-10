import db from '../models/db';
import { Request, Response } from 'express';
const { v4: uuidv4 } = require('uuid');

const createJob = async (req: Request, res: Response) => {
  const { CustomerId, jobName, jobType, languageFromName, languageToName } =
    req.body;
  try {
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
  } catch (error) {
    res.status(401).send({ error: '400', message: 'Not able to create a job' });
  }
};

const acceptJob = async (req: Request, res: Response) => {
  const { jobId, translatorId } = req.body;
  try {
    const job = await db.Job.findOne({ where: { _id: jobId } });
    job.status = 'accepted';
    job.TranslatorId = translatorId;
    res.send(job);
    await job.save();
  } catch (error) {
    res.status(401).send({ error: '400', message: 'Not able to accept a job' });
  }
};

const getJobs = async (req: Request, res: Response) => {
  const { id, role } = req.params;
  try {
    if (role === 'customer') {
      let jobs = await db.Job.findAll({ where: { CustomerId: id } });
      res.send(jobs);
    } else if (role === 'translator') {
      let jobs = await db.Job.findAll({ where: { TranslatorId: id } });
      res.send(jobs);
    }
  } catch (error) {
    res
      .status(401)
      .send({ error: '400', message: 'Not able to retrieve the jobs' });
  }
};

module.exports = { createJob, acceptJob, getJobs };
