"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message = function (sequelize, DataTypes) {
    return sequelize.define('Message', {
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
};
module.exports = function (sequelize, DataTypes) {
    return Message(sequelize, DataTypes);
};
