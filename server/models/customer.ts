import { Model, BuildOptions } from 'sequelize';

interface CustomerModel extends Model {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

type CustomerInstance = typeof Model & {
  new (values?: object, options?: BuildOptions): CustomerModel;
};

const Customer = (sequelize: any, DataTypes: any) =>
  <CustomerInstance>sequelize.define('Customer', {
    _id: {
      type: DataTypes.UUID,
      // do we need the default value here? Sequelize won't
      // allows us to create a customer or translator without passing an _id
      // so maybe we can remove it
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
    },
  });

module.exports = (sequelize: any, DataTypes: any) =>
  Customer(sequelize, DataTypes);
