import fs from 'fs';
import path from 'path';
require('dotenv').config();
const Sequelize = require('sequelize');

// import * as Sequelize from 'sequelize';

// is { Op } needed?
const { Op } = require('sequelize');
const db: { [key: string]: any } = {};

// used for heroku deployment
// export const sequelize = new Sequelize(process.env.DATABASE_URL);

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: '127.0.0.1',
  port: process.env.DB_PORT,
  dialect: 'postgres',
  //logging must be set to boolean
  logging: false,
});

const files = fs.readdirSync(__dirname);

for (const file of files) {
  if (file !== 'db.ts') {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    const modelName: string = model.name;
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

export default db;
