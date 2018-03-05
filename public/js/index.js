var socket = io();
// on client connect eventlistener
socket.on('connect', function () {
  console.log('Connected to server');
});

// on client disconnect eventlistener
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// on newEmail event listener
socket.on('newEmail', function(email) {
  console.log(`New Email: `, email);
});

// createEmail event
socket.emit('createEmail', {
  to: 'ankit@example.com',
  from: 'aakash@example.com',
  msg: 'received your email.',
  createdAt: Date.now()
});