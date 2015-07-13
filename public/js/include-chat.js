var token = sessionStorage.getItem('token');
var myName = sessionStorage.getItem('username');

$(document).ready(function() {
  if (token) {
    displayChatWindow();
    loadMessages();
  } else {
    removeChatWindow();
  }
});

function displayChatWindow() {
  $.get('chat', function(data) {
    $('body').append(data);
  });

  console.log($('.chat-input'));
  $(document).on('keyup', '.chat-input', function(e) {
    if (e.which == 13) {
      console.log($(this).val());
      var data = {
        'roomID': -1,
        'text': $(this).val(),
        'senderUserName': myName
      };
      sendMessage(data);
    }
  });

  $('#chatwindow .toggle').click(function() {
    // not working
    $(this).animate({
      left: '-50%'
    }, 500, function() {
      $(this).css('left', '150%');
      $(this).appendTo('#container');
    });
  });
}

function sendMessage(data) {
  $.ajax({
    url: 'http://xo-chat.herokuapp.com/webapi?token=' + token,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function(data, status, xhttp) {
      console.log("sent");
      $('.chat-input').val('');
    },
    error: function(data, status, xhttp) {
      console.log("error");
    }
  });
}

function loadMessages() {
  $.ajax({
    url: 'http://xo-chat.herokuapp.com/webapi?token=' + token,
    type: 'GET',
    success: function(data, status, xhttp) {
      displayChatMessages($('#chat-list ul'), data);
      $('#chat-list ul').trigger("chosen:updated");
    },
    error: function(data, status, xhttp) {
      console.log("error " + status);
    },
    complete: function() {
      setTimeout( function(){loadMessages();}, 5000);
    }
  });
}

function removeChatWindow() {
  $('chatwindow').remove();
}

var displayedMsgs = {}
function displayChatMessages($parent, data) {
  $.each(data, function(i, obj) {
    var rec = ChatRecord.toRecord(obj);
    if(!displayedMsgs[rec.id]){
      $parent.append(rec.html());
      displayedMsgs[rec.id] = true;
    }
  });
}

function ChatRecord(data) {
  this.id = data.id;
  this.user = data.senderUserName;
  this.message = data.text;

  this.html = function() {
    return $('<li/>', {'class': 'msg-record'})
      .append($('<h5/>', {'class': 'sender'}).append(this.user))
      .append($('<h5/>', {'class': 'msg'}).append(this.message));
  };

}

ChatRecord.toRecord = function(plain) {
  return new ChatRecord(plain);
}
