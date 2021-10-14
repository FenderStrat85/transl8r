import { Model, BuildOptions } from 'sequelize';

interface ImageModel extends Model {
  _id: string;
  imageUrl: string;
  imageUrlTranslate: string;
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
    imageUrlTranslate: {
      type: DataTypes.STRING,
    },
    translatedText: {
      type: DataTypes.STRING,
    },
  });

module.exports = (sequelize: any, DataTypes: any) =>
  Image(sequelize, DataTypes);
