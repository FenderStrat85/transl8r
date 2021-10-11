import { Model, BuildOptions } from 'sequelize';

interface ConversationModel extends Model {
  _id: string;
}

type ConversationInstance = typeof Model & {
  new (values?: object, options?: BuildOptions): ConversationModel;
};

const Conversation = (sequelize: any, DataTypes: any) =>
  <ConversationInstance>sequelize.define('Conversation', {
    _id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
  });

module.exports = (sequelize: any, DataTypes: any) =>
  Conversation(sequelize, DataTypes);
