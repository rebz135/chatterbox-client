// YOUR CODE HERE:

class App {
  constructor() {
    //DO SOMETHING;
  }

  init() {}

  send() {
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

  fetch() {}

  clearMessages() {}

  renderMessages() {}

  renderRoom() {}
}

let app = new App();
