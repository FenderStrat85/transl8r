import { Request, Response } from 'express';
import db from '../models/db';

const getImageUrl = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  // console.log({ jobId });
  try {
    const { imageUrl } = await db.Image.findOne({
      where: { JobId: jobId },
    });
    res.status(201).send({imageUrl});
  } catch (error) {
    res
      .status(404)
      .send({ error: '404', message: 'Not able to retrieve the image' });
  }
};

module.exports = { getImageUrl };
