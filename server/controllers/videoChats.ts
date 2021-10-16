import { Request, Response } from 'express';
import db from '../models/db';

const insertSocketId = async (req: Request, res: Response) => {
  const { jobId, socketId } = req.body;
  const { role } = req.user;
  console.log('req.user', req.user)
  console.log('req.params', req.body)

  try {
    const videoChat = await db.VideoChat.findOne({
      where: { JobId: jobId },
    });
    if (role === 'translator') {
      videoChat.translatorSocketId = socketId
    } else if (role === 'customer') {
      videoChat.customerSocketId = socketId
    }
    await videoChat.save()
    res.status(201).send(videoChat);
  } catch (error) {
    res
      .status(404)
      .send({ error: '404', message: 'Not able to insert the socket id' });
  }
};

const retrieveSocketId = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  const { role } = req.user;

  try {
    const { customerSocketId, translatorSocketId } = await db.VideoChat.findOne({
      where: { JobId: jobId },
    });
    if (role === 'translator') {
      res.status(201).send({ 'socketId': customerSocketId });
    } else if (role === 'customer') {
      res.status(201).send({ 'socketId': translatorSocketId });
    }
  } catch (error) {
    res
      .status(404)
      .send({ error: '404', message: 'Not able to retrieve the socket id' });
  }
};

module.exports = { insertSocketId, retrieveSocketId }