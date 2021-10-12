import { Model, BuildOptions } from 'sequelize';

interface VideoChatModel extends Model {
  _id: string;
}

type VideoChatInstance = typeof Model & {
  new (values?: object, options?: BuildOptions): VideoChatModel;
};

const VideoChat = (sequelize: any, DataTypes: any) =>
  <VideoChatInstance>sequelize.define('VideoChat', {
    _id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
  });

module.exports = (sequelize: any, DataTypes: any) =>
  VideoChat(sequelize, DataTypes);
