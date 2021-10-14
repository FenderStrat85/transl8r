import { Model, BuildOptions } from 'sequelize';

interface ImageModel extends Model {
  _id: string;
  imageUrl: string;
  imageUrlTranslated: string;
  translatedText: string;
}

type ImageInstance = typeof Model & {
  new (values?: object, options?: BuildOptions): ImageModel;
};

const Image = (sequelize: any, DataTypes: any) =>
  <ImageInstance>sequelize.define('Image', {
    _id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrlTranslated: {
      type: DataTypes.STRING,
    },
    translatedText: {
      type: DataTypes.STRING,
    },
  });

module.exports = (sequelize: any, DataTypes: any) =>
  Image(sequelize, DataTypes);
