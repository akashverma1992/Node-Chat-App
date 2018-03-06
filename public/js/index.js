var socket = io();
console.log('Socket: ', socket);

// on client connect eventlistener
socket.on('connect', function () {
  console.log('Connected to server');
});

// on client disconnect eventlistener
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// on newEmail event listener
socket.on('newMessage', function (message) {
  console.log(`New Message: `, message);
});

// jquery
$(() => {
  $('form').submit(() => {
    socket.emit('createMessage', {
      message: $('#m').val(),
      date: new Date().getTime()
    });
    $('#m').val('');
  });
});