const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, '../public');
console.log(publicDir);

app.use(express.static(publicDir));

// server connection event
io.on('connection', (socket) => {
  console.log('a user is connected.');
  socket.on('disconnect', () => {
    console.log('a user is disconnected.');    
  });
});

http.listen(port, () => {
  console.log(`listening on *: ${port}`);
});