import { Model, BuildOptions } from 'sequelize';

interface MessageModel extends Model {
  _id: string;
  messageAuthor: string;
  messageContent: string;
}

type MessageInstance = typeof Model & {
  new (values?: object, options?: BuildOptions): MessageModel;
};

const Message = (sequelize: any, DataTypes: any) =>
  <MessageInstance>sequelize.define('Message', {
    _id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    messageAuthor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    messageContent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

module.exports = (sequelize: any, DataTypes: any) =>
  Message(sequelize, DataTypes);
