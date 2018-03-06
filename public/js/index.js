var socket = io();
console.log('Socket: ', socket);

// on client connect eventlistener
socket.on('connect', function () {
  console.log('Connected to server');
});

// Greetings from user
socket.on('newUser', function (msg) {
  $('#greetings').text(msg.text);
});

// Notification: New User Joined
socket.on('newUserJoined', function (msg) {
  var newuser = $('#newuser');
  newuser.text(msg.text);
  setTimeout(() => {
    newuser.text('');
    newuser.hide();
  }, 2000);
});

// on client disconnect eventlistener
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// on newEmail event listener
socket.on('newMessage', function (message) {
  console.log(`New Message: `, message);
  var ul = $('#messages');
  var li = $('<li>').text(message.text);
  ul.append(li);
  // document.getElementById('messages').appendChild(document.createElement('li')).innerText = message.message;
});

// jquery
$(() => {
  $('form').submit(() => {
    socket.emit('createMessage', {
      from: 'abc',
      to: 'xyz',
      message: $('#m').val(),
      date: new Date().getTime()
    });
    $('#m').val('');
  });
});