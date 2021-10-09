import { Model, BuildOptions } from 'sequelize';

interface UserModel extends Model {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

type UserInstance = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

const User = (sequelize: any, DataTypes: any) => <UserInstance>sequelize.define(
    'User',
    {
      _id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
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
        default: 'user',
      },
    },
  );

module.exports = (sequelize: any, DataTypes: any) => User(sequelize, DataTypes);
