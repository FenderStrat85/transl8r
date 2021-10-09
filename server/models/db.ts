const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const db: { [key: string]: any } = {};

//These need to be changed to process.env links
const DB_USERNAME = 'postgres';
const DB_PASSWORD = '1234';
const DB_PORT = 5432;

const sequelize = new Sequelize({
  database: 'translate-test',
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: '127.0.0.1',
  port: DB_PORT,
  dialect: 'postgres',
  //logging must be set to boolean
  logging: false,
});

const files = fs.readdirSync(__dirname);

for (const file of files) {
  if (file !== 'db.js') {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    const modelName: string = model.name;
    db[modelName] = model;
  }
}

db.User.hasMany(db.Job);
db.Job.BelongsTo(db.User);
db.Translator.hasMany(db.Job);
db.Job.BelongsTo(db.Translator);

db.Translator.belongsToMany(db.Language, {
  through: 'Translator_Languages',
  as: 'language',
});
db.Language.belongsToMany(db.Translator, {
  through: 'Translator_Languages',
  as: 'translator',
});

module.exports = db;
