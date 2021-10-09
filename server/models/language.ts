import { Model, DataTypes, BuildOptions } from 'sequelize';

interface LanguageModel extends Model {
  _id: string;
  languageName: string;
}

type LanguageInstance = typeof Model & {
  new (values?: object, options?: BuildOptions): LanguageModel;
};

const Language = <LanguageInstance>sequelize.define('Language', {
  _id: {
    type: DataTypes.UUID,
    defaultValue: sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  languageName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Language;
