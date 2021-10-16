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
  socket.emit("me", socket.id);
  socket.on('join_room', (data: IRoomJoin) => {
    room = data.room;
    name = data.name;
    socket.join(data.room);
    socket.broadcast.emit('Welcome to the chat!');
    // console.log(`User with name: ${data.name} joined room: ${data.room}`);
  });

  socket.on('send_message', (data: IChatMessage) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('leave_chat', (data: IChatMessage) => {
    socket.to(data.room).emit('leave_message', data);
  });

  socket.on('disconnect', () => { });


  //----------------------------------------------------------

  //Video Socket Info
  // socket.emit('me', () => {
  //   console.log("SOCKET.ID", socket.id);
  //   socket.id
  // });

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded')
  })

  // Takes an action from the frontend = in this case 'callUser'
  // Callback takes a data argument, which we will destructure
  // userToCall - id of user we'll be calling
  // signalData - massive chunk of data
  // From - ID of the person starting the call
  // Name - name of the person starting the call, entered into text field
  socket.on("callUser", ({ userToCall, name, signalData, from }: any) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });
  // socket.on('callUser', ({ userToCall, signalData, from, name }: any) => {
  //   io.to(userToCall).emit('callUser', { signal: signalData, from, name })
  // })
  //Data contains the ID of the person making the call as well as a huge data chunk
  socket.on('answerCall', (data: any) => {
    io.to(data.to).emit('callAccepted', data.signal)
  })
  //---------------------------------------------------------
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
