"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Job = function (sequelize, DataTypes) { return sequelize.define('Job', {
    _id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
    languageFrom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    languageFromName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    languageTo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    languageToName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jobType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateCompleted: {
        type: DataTypes.DATE,
    },
    jobName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jobDescription: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    notification: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
}); };
module.exports = function (sequelize, DataTypes) { return Job(sequelize, DataTypes); };
