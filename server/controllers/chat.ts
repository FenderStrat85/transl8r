import db from '../models/db';
import { Request, Response } from 'express';
const { v4: uuidv4 } = require('uuid');

const createMessage = async (req: Request, res: Response) => {
  const messageData = req.body;
  const JobId = messageData.room;
  const messageAuthor = messageData.user_id;
  const messageContent = messageData.message;
  try {
    const ConversationId = await db.Conversation.findOne({
      where: { JobId: JobId },
    });
    const newMessage = await new db.Message({
      _id: uuidv4(),
      messageAuthor: messageAuthor,
      messageContent: messageContent,
      ConversationId: ConversationId._id,
    });
    const message = await newMessage.save();
    res.status(201).send(message);
  } catch (error) {
    res.status(404).send({ error: '404', message: 'not able to add message' });
  }
};

module.exports = { createMessage };
