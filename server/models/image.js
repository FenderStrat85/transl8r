"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Image = function (sequelize, DataTypes) {
    return sequelize.define('Image', {
        _id: {
            type: DataTypes.UUID,
            defaultValue: sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageUrlTranslated: {
            type: DataTypes.STRING,
        },
        translatedText: {
            type: DataTypes.STRING,
        },
    });
};
module.exports = function (sequelize, DataTypes) {
    return Image(sequelize, DataTypes);
};
