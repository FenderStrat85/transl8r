import { Request, Response } from 'express';
import { IImage } from '../interfaces/interfaces';
import db from '../models/db';

const getImageUrl = async (req: Request, res: Response): Promise<void> => {
  const { jobId } = req.params;
  try {
    const { imageUrl }: IImage = await db.Image.findOne({
      where: { JobId: jobId },
    });
    res.status(201).send({ imageUrl });
  } catch (error) {
    res
      .status(404)
      .send({ error: '404', message: 'Not able to retrieve the image' });
  }
};

const uploadTranslatedImageUrl = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { url } = req.body;
  const { jobId } = req.params;
  try {
    const image = await db.Image.findOne({ where: { JobId: jobId } });
    image.imageUrlTranslated = url;
    await image.save();
    res.status(200).send(image);
  } catch (error) {
    res
      .status(404)
      .send({ error: '404', message: 'Not able to upload the image' });
  }
};

const uploadTranslatedTextOfImage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { text } = req.body;
  const { jobId } = req.params;
  try {
    const image = await db.Image.findOne({ where: { JobId: jobId } });
    image.translatedText = text;
    await image.save();
    res.status(200).send(image);
  } catch (error) {
    res.status(404).send({ error: '404', message: 'Not able to add the text' });
  }
};

const fetchImageData = async (req: Request, res: Response): Promise<void> => {
  const { jobId } = req.params;
  try {
    const image = await db.Image.findOne({ where: { JobId: jobId } });
    res.status(200).send(image);
  } catch (error) {
    res.status(404).send({ error: '404', message: 'Not able to fetch image' });
  }
};

module.exports = {
  getImageUrl,
  uploadTranslatedImageUrl,
  uploadTranslatedTextOfImage,
  fetchImageData,
};
