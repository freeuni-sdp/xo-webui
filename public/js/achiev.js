var handle;
var token = sessionStorage.getItem('token');
var myRoomId = sessionStorage.getItem('room_id');
var myName = sessionStorage.getItem('name');

$(function(){

  $( "input[type=text]" ).on('input', function() {
    var dInput = this.value;
    if (!dInput.trim()) {
      return;
    };
    clearTimeout(handle);
    handle = setTimeout(function(){downloadData(dInput)}, 1000);
  });

});

function downloadData(username) {
  $.ajax({
    url: 'https://xo-achiev.herokuapp.com/webapi/'+username,
    type: 'GET',
    beforeSend: function(e) {
      clearRow($(".achiev"));
    },
    success: function(data, status, xhttp) {
      var rec = AchievRecord.toRecord(data);
      drawData($(".achiev"), rec);
    },
    error: function(data, status, xhttp) {
      drawError($(".achiev"));
      console.log("error "+status);
    }
  });

  $.ajax({
    url: 'http://xo-history.herokuapp.com/webapi/'+username,
    type: 'GET',
    beforeSend: function(e) {
      clearRow($(".history"));
    },
    success: function(data, status, xhttp) {
      var rec = HistoryRecord.toRecord(data);
      drawData($(".history"), rec);
    },
    error: function(data, status, xhttp) {
      drawError($(".history"));
      console.log("error "+status);
    }
  });
}

function clearRow($elem) {
  $elem.empty();
}

function drawData($elem, rec) {
  $elem.last().append(rec.html());
}

function drawError($elem) {
  $elem.last().append($('<h5/>', {'class':'msg'}).append('no results'));
}

function AchievRecord(score, rank) {
  this.score = score;
  this.rank = rank;

  this.html = function() {
    return $(".achiev")
      .append( $('<h5/>').append(score) )
      .append( $('<h5/>').append(rank) );
  };
}

AchievRecord.toRecord = function(plain) {
  return new AchievRecord(plain.score, plain.rank);
}

function HistoryRecord(data) {
  this.playerX = data.player_x;
  this.playerO = data.player_o;
  this.winner = data.winner;
  this.moves = data.moveList;

  this.html = function() {
    return $('.history')
      .append($('<h5/>').append(playerX))
      .append($('<h5/>').append(playerO))
      .append($('<h5/>').append(winner))
      .append($('<h5/>').append(moves));
  };
}

HistoryRecord.toRecord = function(plain) {
  return new HistoryRecord(plain);
}
