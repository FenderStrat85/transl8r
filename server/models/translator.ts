import { Model, BuildOptions } from 'sequelize';

interface TranslatorModel extends Model {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  averageRating: string;
}

type TranslatorInstance = typeof Model & {
  new (values?: object, options?: BuildOptions): TranslatorModel;
};

const Translator = (sequelize: any, DataTypes: any) =>
  <TranslatorInstance>sequelize.define('Translator', {
    _id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      default: 'translator',
    },
    averageRating: {
      type: DataTypes.INTEGER,
      default: 0,
    },
  });

module.exports = (sequelize: any, DataTypes: any) =>
  Translator(sequelize, DataTypes);