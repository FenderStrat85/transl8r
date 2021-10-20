"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
require('dotenv').config();
var Sequelize = require('sequelize');
// import * as Sequelize from 'sequelize';
// is { Op } needed?
var Op = require('sequelize').Op;
var db = {};
exports.sequelize = new Sequelize(process.env.DATABASE_URL);
var files = fs_1.default.readdirSync(__dirname);
for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
    var file = files_1[_i];
    if (file !== 'db.ts') {
        var model = require(path_1.default.join(__dirname, file))(exports.sequelize, Sequelize.DataTypes);
        var modelName = model.name;
        db[modelName] = model;
    }
}
db.Customer.hasMany(db.Job);
db.Job.belongsTo(db.Customer);
db.Translator.hasMany(db.Job);
db.Job.belongsTo(db.Translator);
db.Translator.belongsToMany(db.Language, {
    through: 'Translator_Languages',
    as: 'language',
});
db.Language.belongsToMany(db.Translator, {
    through: 'Translator_Languages',
    as: 'translator',
});
db.Job.hasOne(db.Conversation);
db.Conversation.belongsTo(db.Job);
db.Conversation.hasMany(db.Message);
db.Message.belongsTo(db.Conversation);
db.Job.hasOne(db.Image);
db.Image.belongsTo(db.Job);
db.Job.hasOne(db.VideoChat);
db.VideoChat.belongsTo(db.Job);
exports.default = db;
