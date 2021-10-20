"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VideoChat = function (sequelize, DataTypes) {
    return sequelize.define('VideoChat', {
        _id: {
            type: DataTypes.UUID,
            defaultValue: sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        translatorSocketId: {
            type: DataTypes.STRING,
            allowNull: true,
            primaryKey: false,
            unique: true,
        },
        customerSocketId: {
            type: DataTypes.STRING,
            allowNull: true,
            primaryKey: false,
            unique: true,
        },
    });
};
module.exports = function (sequelize, DataTypes) {
    return VideoChat(sequelize, DataTypes);
};
