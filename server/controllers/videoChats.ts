import { Request, Response } from 'express';
import db from '../models/db';

const insertSocketId = async (req: Request, res: Response) => {
  const { jobId, socketId, role } = req.body;
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

module.exports = { insertSocketId }