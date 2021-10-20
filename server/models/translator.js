"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Translator = function (sequelize, DataTypes) {
    return sequelize.define('Translator', {
        _id: {
            type: DataTypes.UUID,
            defaultValue: sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
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
        averageRating: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    });
};
module.exports = function (sequelize, DataTypes) {
    return Translator(sequelize, DataTypes);
};
