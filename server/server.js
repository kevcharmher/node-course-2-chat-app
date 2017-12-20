const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
// Configure server to use socketIO
//io is our web socket server
var io = socketIO(server);

app.use(express.static(publicPath));
// Register event listner
io.on('connection', socket => {
  console.log('New User connected');

  socket.on('createMessage', message => {
    console.log('createMessage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('Disconnected to server');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
