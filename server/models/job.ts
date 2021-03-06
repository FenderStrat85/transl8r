import { Model, BuildOptions } from 'sequelize';

interface JobModel extends Model {
  _id: string;
  status: string;
  languageFrom: string;
  languageTo: string;
  jobType: string;
  dateCompleted: Date;
  jobName: string;
  jobDescription: string;
  notification: boolean;
}

type JobInstance = typeof Model & {
  new (values?: object, options?: BuildOptions): JobModel;
};

const Job = (sequelize: any, DataTypes: any) => <JobInstance>sequelize.define(
    'Job',
    {
      _id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
      },
      languageFrom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      languageFromName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      languageTo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      languageToName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jobType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateCompleted: {
        type: DataTypes.DATE,
      },
      jobName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jobDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      notification: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
    },
  );

module.exports = (sequelize: any, DataTypes: any) => Job(sequelize, DataTypes);
