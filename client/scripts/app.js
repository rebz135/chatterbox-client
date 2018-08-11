// YOUR CODE HERE:

class App {
  constructor() {
    this.filter = 'order=-updatedAt';
    this.filterMetric = 'Recent Chats';
    this.filterVal = 'All';
    this.user = null;
    this.friendsList = {};
  }

  init() {
    //not needed
  }

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
      data: this.filter,
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
    let text = document.createElement('div');
    let author = document.createElement('div');
    let roomstamp = document.createElement('div');

    $(div).append(text);
    $(div).append(author);
    $(div).append(roomstamp);

    if (this.friendsList.hasOwnProperty(data.username)) {
      $(div).addClass('chatContainer friendly');
    } else {
      $(div).addClass('chatContainer');
    }

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
    $('#chats').append(div);
  }
}

$(document).ready(() => {
  let app = new App();
  let refreshing = true;
  app.user = window.prompt('Welcome to the Chatterbox. What is your name?');
  $('.userName').text(app.user);

  let renderChatFeed = function(data) {
    for (let i = 0; i < data.results.length; i++) {
      app.renderChat(data.results[i]);
      $('span.filterMetric').text(app.filterMetric);
      $('span.filterValue').text(app.filterVal);
    }
  };

  let refreshChatFeed = function() {
    $('.chatContainer').remove();
    app.fetch(renderChatFeed);
  };

  let setListeners = function() {
    $('.submitBtn').click(function() {
      let message = {
        username: $('input[name=inputUser]').val(),
        text: $('input[name=inputMessage]').val(),
        roomname: $('input[name=inputRoom]').val()
      };
      app.send(message);
      refreshChatFeed();
      $('input[name=inputUser]').val(''),
      $('input[name=inputMessage]').val(''),
      $('input[name=inputRoom]').val('');
    });

    $('.refreshBtn').click(function() {
      app.filter = 'order=-updatedAt';
      app.filterVal = 'All';
      app.filterMetric = 'Recent Chats';
      refreshChatFeed();
    });

    $('div').on('click', '.room', function() {
      let roomName = $(event.target).text();
      //TBD fix hardcoding
      if (roomName !== 'ROOM NOT FOUND') {
        app.filter = `where={"roomname":"${$(event.target).text()}"}`;
        app.filterVal = roomName;
        app.filterMetric = 'Room';
        refreshChatFeed();
      }
    });

    $('div').on('click', '.user', function() {
      let friend = $(event.target).text();
      if (app.friendsList[friend]) {
        delete app.friendsList[friend];
      } else {
        app.friendsList[friend] = true;
      }

      $('.friendsList').text(Object.keys(app.friendsList).join(', '));
      console.log(app.friendsList);
      refreshChatFeed();

      // if (roomName !== 'ROOM NOT FOUND') {
      //   app.filter = `where={"roomname":"${$(event.target).text()}"}`;
      //   app.filterVal = roomName;
      //   app.filterMetric = 'Room';
      //   refreshChatFeed();
      // }
    });

    //TBD click a user to filter for that user similar to rooms
  };

  //initialize renderings
  app.fetch(renderChatFeed);
  setListeners();
  if (refreshing) {
    setInterval(refreshChatFeed, 50000);
  }
});

//OBJECT FROM PARSE
// createdAt: "2018-08-11T01:55:27.038Z"
// objectId:"aRFqlHTUkF"
// roomname:"Main"
// text:"GROUND CONTROL TO MAJOR TOM Fri Aug 10 2018 18:55:27 GMT-0700 (Pacific Daylight Time)"
// updatedAt:"2018-08-11T01:55:27.038Z"
// username:"AVH"

//TBD
//Allow users to befriend other users by clicking on their username
//Display messages sent by friends in bold
