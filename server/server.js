const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var { generateMessage } = require('./utils/messages');

const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, '../public');
console.log(publicDir);

app.use(express.static(publicDir));

// server connection event
io.on('connection', (socket) => {
  console.log('a user is connected.');

  // fire event when a user joins the app
  socket.emit('newUser', generateMessage('Admin', 'Welcome to the chat app.', ''));

  // fire event to notify about the newly joined user
  socket.broadcast.emit ('newUserJoined', generateMessage('Admin', 'New User Joined.', ''));

  // on client disconnect eventhandler
  socket.on('disconnect', () => {
    console.log('a user is disconnected.');
  });

  // Broadcasting 'newMessage' event
  socket.on('createMessage', (msg, callback) => {
    console.log('CreateMessage: ', msg);
    
    // send message to everyone including the sender
    socket.broadcast.emit('newMessage', generateMessage(msg.from, msg.message, msg.date));
    callback('This is from server.');
  });
});

http.listen(port, () => {
  console.log(`listening on *: ${port}`);
});