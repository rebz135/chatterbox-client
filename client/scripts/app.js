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
    $(div).addClass('chatContainer');
    $(text).addClass('chats');
    $(author).addClass('user');
    $(roomstamp).addClass('room');
    if (data.text) {
      $(text).text(data.text); //prevent XSS attacks
    } else {
      $(text).text('TEXT NOT FOUND');
    }
    if (data.username) {
      $(author).text(data.username); //prevent XSS attacks
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

$(document).ready(() => {
  let app = new App();

  let renderChatFeed = function(data) {
    for (let i = 0; i < data.results.length; i++) {
      app.renderChat(data.results[i]);
    }
  };

  //initialize renderings
  app.fetch(renderChatFeed);

  let refreshChatFeed = function() {
    $('.chatContainer').remove();
    app.fetch(renderChatFeed);
  };

  setInterval(refreshChatFeed, 50000);

  $('.btn').click(function() {
    let message = {
      username: $('input[name=inputUser]').val(),
      text: $('input[name=inputRoom]').val(),
      roomname: $('input[name=inputMessage]').val()
    };
    app.send(message);
    refreshChatFeed();
  });
});

//OBJECT FROM PARSE
// createdAt: "2018-08-11T01:55:27.038Z"
// objectId:"aRFqlHTUkF"
// roomname:"Main"
// text:"GROUND CONTROL TO MAJOR TOM Fri Aug 10 2018 18:55:27 GMT-0700 (Pacific Daylight Time)"
// updatedAt:"2018-08-11T01:55:27.038Z"
// username:"AVH"

//TODO
//Enter existing rooms
//Allow users to befriend other users by clicking on their username
//Display messages sent by friends in bold
