import { Model, DataTypes, BuildOptions } from 'sequelize';

interface JobModel extends Model {
  _id: string;
  status: string;
  languageFrom: string;
  languageTo: string;
  jobType: string;
  dateCompleted: Date;
  jobName: string;
}

type JobInstance = typeof Model & {
  new (values?: object, options?: BuildOptions): JobModel;
};

const Job = <JobInstance>sequelize.define('Job', {
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
  languageTo: {
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
});

export default Job;
