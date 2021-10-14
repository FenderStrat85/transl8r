import { disconnect } from 'process';
import { IChatMessage, IRoomJoin } from './interfaces/interfaces';
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
  let room: string;
  let name: string;
  socket.on('join_room', (data: IRoomJoin) => {
    room = data.room;
    name = data.name;
    socket.join(data.room);
    console.log(`User with name: ${data.name} joined room: ${data.room}`);
  });

  socket.on('send_message', (data: IChatMessage) => {
    console.log(data);
    console.log(data.message);
    console.log(data.room);
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('leave_chat', (data: IRoomJoin) => {
    socket.to(data.room).emit('leave_message', data);
  });

  socket.on('disconnect', (data: IRoomJoin) => {
    console.log('user disconnect inside disconnect', socket.id);
    io.to(room).emit();
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
