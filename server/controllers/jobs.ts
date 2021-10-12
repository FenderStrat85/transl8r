import db from '../models/db';
import { Request, Response } from 'express';
import { IntJob } from './../interfaces/interfaces';

const { v4: uuidv4 } = require('uuid');

const createJob = async (req: Request, res: Response) => {
  const { jobName, languageFromName, languageToName, jobDescription } =
    req.body;
  const { type } = req.params;
  const { _id } = req.user;
  const jobType = type;
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
      CustomerId: _id,
      jobDescription: jobDescription,
    });
    const job = await newJob.save();
    const jobId = job._id;
    if (type === 'image') {
      const { imageUrl } = req.body;
      const newImage = new db.Image({
        _id: uuidv4(),
        imageUrl: imageUrl,
        JobId: jobId,
      });
      const img = await newImage.save();
      res.status(201).send(img);
    }
  } catch (error) {
    res.status(400).send({ error: '400', message: 'Not able to create a job' });
  }
};

const acceptJob = async (req: Request, res: Response) => {
  const { jobId, translatorId } = req.body;
  try {
    const job = await db.Job.findOne({ where: { _id: jobId } });
    job.status = 'accepted';
    job.TranslatorId = translatorId;
    await job.save();
    res.status(200).send(job);
  } catch (error) {
    res.status(400).send({ error: '400', message: 'Not able to accept a job' });
  }
};

const getJobs = async (req: Request, res: Response) => {
  const { role, _id } = req.user;
  const { status } = req.params;
  try {
    if (role === 'customer') {
      const jobs = await db.Job.findAll({ where: { CustomerId: _id } });
      const filteredJobs = jobs.filter((job: IntJob) => job.status === status);
      res.status(200).send(filteredJobs);
    } else if (role === 'translator') {
      let jobs = await db.Job.findAll({ where: { TranslatorId: _id } });
      const filteredJobs = jobs.filter((job: IntJob) => job.status === status);
      res.status(200).send(filteredJobs);
    }
  } catch (error) {
    res
      .status(404)
      .send({ error: '404', message: 'Not able to retrieve the jobs' });
  }
};

const getAvailableJobs = async (req: Request, res: Response) => {
  const { role, _id } = req.user;
  try {
    // retrieving all the languages that the translator speaks
    const { language } = await db.Translator.findOne({
      where: { _id: _id },
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
    res.status(200).send(suitedJobs);
  } catch (error) {
    res.status(400).send({
      error: '400',
      message: 'Not able to retrieve the available jobs',
    });
  }
};

module.exports = { createJob, acceptJob, getJobs, getAvailableJobs };
