import db from '../models/db';
import { Request, Response } from 'express';
const { v4: uuidv4 } = require('uuid');

const createJob = async (req: Request, res: Response) => {
  const { CustomerId, jobName, jobType, languageFromName, languageToName } =
    req.body;
  try {
    // languageFromName and languageToName are strings, therefore the
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
  // function for retrieving all the jobs of an user, regardless of the job's state
  // useful for showing jobs on the dashboard
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

const getAvailableJobs = async (req: Request, res: Response) => {
  // functions that accept the id of the translator as parameter,
  // search for pending jobs and shows only the one that matches
  // the translator profile.
  const { id } = req.params;
  try {
    // retrieving all the languages that the translator speaks
    const { language } = await db.Translator.findOne({
      where: { _id: id },
      include: [{ model: db.Language, as: 'language' }],
    });
    // pushing the ids of the languages into an array
    const langArray = [];
    for (let lang of language) {
      langArray.push(lang._id);
    }
    // retrieving all the pending jobs
    const jobsPending = await db.Job.findAll({ where: { status: 'pending' } });
    // iterating through the pending jobs and checking if the user speaks
    // both languageFrom and languageTo. Finally, pushing the matches in jobsSuited
    const suitedJobs = [];
    for (let job of jobsPending) {
      if (
        langArray.includes(job.languageFrom) &&
        langArray.includes(job.languageTo)
      ) {
        suitedJobs.push(job);
      }
    }
    res.send(suitedJobs);
  } catch (error) {
    res.status(401).send({
      error: '400',
      message: 'Not able to retrieve the available jobs',
    });
  }
};

module.exports = { createJob, acceptJob, getJobs, getAvailableJobs };
