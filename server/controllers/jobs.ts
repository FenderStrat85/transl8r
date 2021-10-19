import db from '../models/db';
import { Request, Response } from 'express';
import {
  IConversation,
  IImage,
  IJob,
  ILanguage,
  IVideoChat,
} from './../interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';

const createJob = async (req: Request, res: Response): Promise<void> => {
  const { jobName, languageFromName, languageToName, jobDescription }: IJob =
    req.body;
  const { type } = req.params;
  const { _id } = req.user;
  const jobType = type;
  try {
    // languageFromName and languageToName are strings, therefore the
    // the next two queries are for retrieving the id of the languages
    const languageFrom: ILanguage = await db.Language.findOne({
      where: { languageName: languageFromName },
    });
    const languageTo: ILanguage = await db.Language.findOne({
      where: { languageName: languageToName },
    });
    const newJob = new db.Job({
      jobName: jobName,
      jobType: jobType,
      _id: uuidv4(),
      languageFrom: languageFrom._id,
      languageFromName: languageFromName,
      languageTo: languageTo._id,
      languageToName: languageToName,
      CustomerId: _id,
      jobDescription: jobDescription,
    });
    const job: IJob = await newJob.save();
    const jobId = job._id;
    if (type === 'image') {
      const { imageUrl } = req.body;
      const newImage = new db.Image({
        _id: uuidv4(),
        imageUrl: imageUrl,
        JobId: jobId,
      });
      const img: IImage = await newImage.save();
      res.status(201).send(img);
    }
    if (type === 'chat') {
      const newChat = new db.Conversation({
        _id: uuidv4(),
        JobId: jobId,
      });
      const chat: IConversation = await newChat.save();
      res.status(201).send(chat);
    }
    if (type === 'video') {
      const newVideoChat = new db.VideoChat({
        _id: uuidv4(),
        JobId: jobId,
      });
      const videoChat: IVideoChat = await newVideoChat.save();
      res.status(201).send(videoChat);
    }
  } catch (error) {
    res.status(400).send({ error: '400', message: 'Not able to create a job' });
  }
};

const acceptJob = async (req: Request, res: Response): Promise<void> => {
  const { _id }: IJob = req.body;
  try {
    const job = await db.Job.findOne({ where: { _id: _id } });
    job.status = 'accepted';
    job.notification = true;
    job.TranslatorId = req.user._id;
    await job.save();
    res.status(200).send(job);
  } catch (error) {
    res.status(400).send({ error: '400', message: 'Not able to accept a job' });
  }
};

const setNotificationToFalse = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { _id }: IJob = req.body;
  try {
    const job = await db.Job.findOne({ where: { _id: _id } });
    job.notification = false;
    await job.save();
    res.status(200).send(job);
  } catch (error) {
    res.status(400).send({
      error: '400',
      message: 'Not able to update notification status',
    });
  }
};

const getJobs = async (req: Request, res: Response): Promise<void> => {
  const { role, _id } = req.user;
  const { status } = req.params;
  try {
    if (role === 'customer') {
      const jobs: IJob[] = await db.Job.findAll({ where: { CustomerId: _id } });
      if (status === 'pendingAndAccepted') {
        const filteredJobs = jobs.filter(
          (job: IJob) => job.status === 'pending' || job.status === 'accepted',
        );
        if (filteredJobs.length === 0) {
          res.status(200).send([]);
        } else {
          res.status(200).send(filteredJobs);
        }
      } else {
        const filteredJobs = jobs.filter((job: IJob) => job.status === status);
        res.status(200).send(filteredJobs);
      }
    } else if (role === 'translator') {
      let jobs: IJob[] = await db.Job.findAll({ where: { TranslatorId: _id } });
      const filteredJobs = jobs.filter((job: IJob) => job.status === status);
      if (!filteredJobs) {
        res.status(200).send([]);
      }
      res.status(200).send(filteredJobs);
    }
  } catch (error) {
    res
      .status(404)
      .send({ error: '404', message: 'Not able to retrieve the jobs' });
  }
};

const getAvailableJobs = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.user;
  try {
    // retrieving all the languages that the translator speaks
    const { language } = await db.Translator.findOne({
      where: { _id: _id },
      include: [{ model: db.Language, as: 'language' }],
    });
    //Below is an alternative to using map
    // pushing the ids of the languages into an array
    // const langArray: string[] = [];
    // for (let lang of language) {
    //   langArray.push(lang._id);
    // }
    const langArray: string[] = language.map((lang: ILanguage) => lang._id);
    // retrieving all the pending jobs
    const jobsPending: IJob[] = await db.Job.findAll({
      where: { status: 'pending' },
    });
    // iterating through the pending jobs and checking if the user speaks
    // both languageFrom and languageTo. Finally, pushing the matches in jobsSuited
    const suitedJobs: IJob[] = [];
    for (let job of jobsPending) {
      if (
        langArray.includes(job.languageFrom) &&
        langArray.includes(job.languageTo)
      ) {
        suitedJobs.push(job);
      }
    }
    if (suitedJobs.length <= 0) {
      res.status(200).send([]);
    } else {
      res.status(200).send(suitedJobs);
    }
  } catch (error) {
    res.status(400).send({
      error: '400',
      message: 'Not able to retrieve the available jobs',
    });
  }
};

const changeStatus = async (req: Request, res: Response): Promise<void> => {
  const { jobId, status } = req.params;
  try {
    const job = await db.Job.findOne({ where: { _id: jobId } });
    job.status = status;
    await job.save();
    res.status(200).send(job);
  } catch (error) {
    res.status(400).send({
      error: '400',
      message: 'Not able to change the status of the job',
    });
  }
};

const deleteJob = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  console.log(id);
  try {
    const jobToDelete = await db.Job.findOne({ where: { _id: id } });
    jobToDelete.destroy();
    res.status(200);
  } catch (error) {
    res.status(400).send({
      error: '400',
      message: 'Not able to delete job',
    });
  }
};

module.exports = {
  createJob,
  acceptJob,
  getJobs,
  getAvailableJobs,
  changeStatus,
  setNotificationToFalse,
  deleteJob,
};
