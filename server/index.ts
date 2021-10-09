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

app
  .use(cors(corsConfig))
  .use(express.json())
  .use(router)
  .listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
