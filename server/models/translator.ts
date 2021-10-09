module.exports = (sequelize: any, DataTypes: any) =>
  sequelize.define('Translator', {
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
      type: DataTypes.NUMBER,
      default: 0,
    },
  });
