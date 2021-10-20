"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Language = function (sequelize, DataTypes) {
    return sequelize.define('Language', {
        _id: {
            type: DataTypes.UUID,
            defaultValue: sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        languageName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};
module.exports = function (sequelize, DataTypes) {
    return Language(sequelize, DataTypes);
};
