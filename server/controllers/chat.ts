import db from '../models/db';
import { Request, Response } from 'express';
import {
  IChatMessage,
  IConversation,
  IMessage,
} from '../interfaces/interfaces';
const { v4: uuidv4 } = require('uuid');

const createMessage = async (req: Request, res: Response) => {
  const messageData: IChatMessage = req.body;
  const JobId: string = messageData.room;
  const messageAuthor: string = messageData.userId;
  const messageContent: string = messageData.message;
  try {
    const Conversation: IConversation = await db.Conversation.findOne({
      where: { JobId: JobId },
    });
    const newMessage = await new db.Message({
      _id: uuidv4(),
      messageAuthor: messageAuthor,
      messageContent: messageContent,
      ConversationId: Conversation._id,
    });
    const message = await newMessage.save();
    res.status(201).send(message);
  } catch (error) {
    res.status(404).send({ error: '404', message: 'not able to add message' });
  }
};

const getChatMessages = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  try {
    const Conversation: IConversation = await db.Conversation.findOne({
      where: { JobId: jobId },
    });
    const messageArray: [IMessage] = await db.Message.findAll({
      where: { ConversationId: Conversation._id },
    });
    res.status(201).send(messageArray);
  } catch (error) {
    res
      .status(400)
      .send({ error: '404', message: 'not able to fetch messages' });
  }
};

module.exports = { createMessage, getChatMessages };
