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
  var div = document.createElement('div');
  div
    .classList
    .add("messages_left");
  div.innerText = message.text + ' ' + message.date ;
  $('body').append(div);
  $('body').append('<br/>');
});

// jquery
$(() => {
  $('form').submit(() => {
    var date = new Date();
    var dateString = date.getHours() + ':' + date
      .getMinutes()
      .toString();
    var div = document.createElement('div');
    div.innerText = dateString + " " + $('#m').val();
    div
      .classList
      .add("messages_right");
    $('body').append(div);

    socket.emit('createMessage', {
      from: socket.id,
      to: 'xyz',
      message: $('#m').val(),
      date: dateString
    }, function () {
      console.log('Got it');
    });
    $('#m').val('');
    $('body').append('<br/>');
  });
});