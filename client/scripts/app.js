// YOUR CODE HERE:

class App {
  constructor() {
    //DO SOMETHING;
  }

  init() {}

  send(message) {
    $.ajax({
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('chatterbox: Message sent: ' + message.text);
      },
      error: function(data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  }

  fetch(cb) {
    $.ajax({
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: 'order=-updatedAt',
      success: function(data) {
        return cb(data);
      },
      error: function(data) {
        console.error('chatterbox: Failed to fetch messages', data);
      }
    });
  }

  clearMessages() {
    $('#chats').empty();
  }

  renderMessage(message) {
    let div = document.createElement('div');
    $(div).text(message); //prevent XSS attacks
    $('#chats').append(div);
  }

  renderRoom(room) {
    let div = document.createElement('div');
    $(div).text(room); //prevent XSS attacks
    $('#roomSelect').append(div);
    //TBD needs onclick action to move to room page
  }

  renderChat(data) {
    let div = document.createElement('div');
    let text = document.createElement('a');
    let author = document.createElement('a');
    let roomstamp = document.createElement('a');
    let space = document.createElement('a');

    $(div).append(text);
    $(div).append(space);
    $(div).append(author);
    $(div).append(roomstamp);
    $(div).addClass('chatcontainer');
    $(text).addClass('chats');
    $(author).addClass('user');
    $(roomstamp).addClass('room');
    if (data.text) {
      $(text).text(data.text); //prevent XSS attacks
    } else {
      $(text).text('TEXT NOT FOUND');
    }
    if (data.user) {
      $(author).text(data.user); //prevent XSS attacks
    } else {
      $(author).text('AUTHOR NOT FOUND');
    }
    if (data.roomname) {
      $(roomstamp).text(data.roomname); //prevent XSS attacks
    } else {
      $(roomstamp).text('ROOM NOT FOUND');
    }
    $(space).text(' - ');
    $('#chats').append(div);
  }
}

let app = new App();

let renderAllRooms = function(data) {
  let rooms = {};
  for (let i = 0; i < data.results.length; i++) {
    if (data.results[i].roomname) {
      rooms[data.results[i].roomname] = i;
    }
  }
  for (key in rooms) {
    if (key !== '') {
      app.renderRoom(key);
    }
  }
};

let renderAllMessages = function(data) {
  let message = {};
  for (let i = 0; i < data.results.length; i++) {
    if (data.results[i].text) {
      message[data.results[i].text] = i;
    }
  }
  for (key in message) {
    if (key !== '') {
      app.renderMessage(key);
    }
  }
};

let renderChatFeed = function(data) {
  console.log(data);
  for (let i = 0; i < data.results.length; i++) {
    app.renderChat(data.results[i]);
  }
};

//initialize renderings
app.fetch(renderChatFeed);
app.fetch(renderAllRooms);

//jQuery

//TODO
//Refresh displayed messages
//Allows users to select username and send messages
//Create rooms
//Enter existing rooms
//Allow users to befriend other users by clicking on their username
//Display messages sent by friends in bold

var message = {
  username: 'AVH',
  text: 'testing for seeing this message',
  roomname: 'Main'
};

app.send(message);
