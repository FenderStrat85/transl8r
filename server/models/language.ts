import { Model, BuildOptions } from 'sequelize';

interface LanguageModel extends Model {
  _id: string;
  languageName: string;
}

type LanguageInstance = typeof Model & {
  new (values?: object, options?: BuildOptions): LanguageModel;
};

const Language = (sequelize: any, DataTypes: any) =>
  <LanguageInstance>sequelize.define('Language', {
    _id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    languageName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

module.exports = (sequelize: any, DataTypes: any) =>
  Language(sequelize, DataTypes);
