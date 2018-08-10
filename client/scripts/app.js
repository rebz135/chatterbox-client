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
      // dataType: 'jsonp', //TBD
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
    $('#chats').append(`<div>${message}</div>`);
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
      app.renderRoom(key);
    }
  }
};

app.fetch(renderAllRooms);

// renderAllRooms();

// var message = {
//   username: 'AVH',
//   text: '<script>console.log("You got XSS by AVH")</script>',
//   roomname: ''
// };

//app.send(message);

// console.log(app.fetch());
