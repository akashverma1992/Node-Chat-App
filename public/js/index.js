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
  // var ul = $('#messages_left');
  // var li = $('<li>').text(message.date + ' ' + message.text);
  var div = $('<div>');
  div.text(message.date + ' ' + message.text);
  div.classname = 'messages_left';
  $('body').append(div);
  // document.getElementById('messages').appendChild(document.createElement('li')).innerText = message.message;
});

// jquery
$(() => {
  $('form').submit(() => {
    // var ul = $('#messages_right');
    var date = new Date().toDateString();
    // var li = $('<li>').text(date + ' ' + $('#m').val());
    // ul.append(li);
    var div = $('<div>');
    div.text(date + ' ' + $('#m').val());
    div.classname = 'messages_right';
    $('body').append(div);

    socket.emit('createMessage', {
      from: socket.id,
      to: 'xyz',
      message: $('#m').val(),
      date: date
    }, function () {
      console.log('Got it');
    });
    $('#m').val('');
  });
});