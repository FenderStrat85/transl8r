"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Conversation = function (sequelize, DataTypes) {
    return sequelize.define('Conversation', {
        _id: {
            type: DataTypes.UUID,
            defaultValue: sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
    });
};
module.exports = function (sequelize, DataTypes) {
    return Conversation(sequelize, DataTypes);
};
