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
    // var div = $('<div>', { val: message });
    $('#chats').append(div);
    //`<div>${message}</div>`
  }

  renderRoom(room) {
    $('#roomSelect').append(`<div>${room}</div>`);
    //TBD needs onclick action to move to room page
  }
}

let app = new App();

let renderAllRooms = function(data) {
  let rooms = {};
  for (let i = 0; i < data.results.length; i++) {
    if (data.results[i].roomname) {
      rooms[data.results[i].roomname] = i;
    }
    console.log(rooms);
  }
  for (key in rooms) {
    if (key !== '') {
      app.renderRoom(JSON.stringify(JSON.parse(key)));
    }
  }
};

let renderAllMessages = function(data) {
  let message = {};
  for (let i = 0; i < data.results.length; i++) {
    if (data.results[i].text) {
      message[data.results[i].text] = i;
    }
    // console.log(message);
  }
  for (key in message) {
    if (key !== '') {
      //clean key here
      app.renderMessage(key);
    }
  }
};

app.fetch(renderAllMessages);

// renderAllRooms();

// var message = {
//   username: 'AVH',
//   text: '<script>console.log("You got XSS by AVH")</script>',
//   roomname: ''
// };

//app.send(message);

// console.log(app.fetch());
