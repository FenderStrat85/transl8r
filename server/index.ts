import { sequelize } from './models/db';

const express = require('express');
const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT;
const router = require('./router');

const app = express();

const corsConfig = {
  origin: `http://localhost:${PORT}`,
  credentials: true,
};

app.use(cors(corsConfig)).use(express.json()).use(router);

try {
  (async () => {
    app.listen(PORT, async () => {
      console.log(`Server 🌹 listening on port ${PORT}`);
      //sequelize.sync because db on has access to the models, whereas
      //sequelize is what is connected to the sync.
      await sequelize.sync();
      console.log('Database connection established');
    });
  })();
} catch (error) {
  console.log(`Server failed: ${error}`);
}
