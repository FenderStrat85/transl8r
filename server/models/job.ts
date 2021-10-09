import { Model, DataTypes, BuildOptions } from 'sequelize';

interface JobsModel extends Model {
  _id: string;
  status: string;
  languageFrom: string;
  languageTo: string;
  jobType: string;
  dateCompleted: Date;
  jobName: string;
}
