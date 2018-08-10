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
        console.log('chatterbox: Message sent');
      },
      error: function(data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  }

  fetch() {
    $.ajax({
      url: undefined, //TBD CHECK HERE, SHOULD POINT TO THIS.SERVER?
      type: 'GET',
      success: function(data) {
        console.log('chatterbox: Messages fetched');
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
  }
}

let app = new App();
app.send('hello world');
