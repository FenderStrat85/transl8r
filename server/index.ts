import { sequelize } from './models/db';

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server, Socket } = require('socket.io');

require('dotenv').config();
const PORT = process.env.SERVER_PORT;
const CLIENT_PORT = process.env.CLIENT_PORT;
const router = require('./router');

const app = express();

const corsConfig = {
  origin: `http://localhost:${CLIENT_PORT}`,
  credentials: true,
};

app.use(cors(corsConfig)).use(express.json()).use(router);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `http://localhost:${CLIENT_PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

io.on('connection', (socket: any) => {
  // console.log('User Connected', socket.id);

  socket.on('join_room', (data: any) => {
    socket.join(data.room);
    console.log(`User with name: ${data.name} joined room: ${data.room}`);
  });

  socket.on('send_message', (data: any) => {
    console.log(data);
    console.log(data.message);
    console.log(data.room);
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnect', socket.id);
  });
});

try {
  (async () => {
    server.listen(PORT, async () => {
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
