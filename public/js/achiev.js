var handle;

$(function(){

  $( "input[type=text]" ).on('input', function() {
    var dInput = this.value;
    if (!dInput.trim()) {
      return;
    };
    clearRow();
    clearTimeout(handle);
    handle = setTimeout(function(){downloadData(dInput)}, 1000);
  });

});

function downloadData(username) {
  $.ajax({
    url: 'https://xo-achiev.herokuapp.com/webapi/'+username,
    type: 'GET',
    success: function(data, status, xhttp) {
      drawRow(data);
    },
    error: function(data, status, xhttp) {
      drawError();
      console.log("error "+status);
    }
  });
}

function clearRow() {
  $("ul").empty();
  $(".msg").empty();
}

function drawRow(data) {
  var rec = Record.toRecord(data);
  $('ul').last().append(rec.html());
}

function drawError() {
  $('.results').last().append($('<h5/>', {'class':'msg'}).append('no results'));
}

function Record(score, rank) {
  this.score = score;
  this.rank = rank;

  this.html = function() {
    return $('<li/>', {'class':'row'})
      .append( $('<h5/>').append(score) )
      .append( $('<h5/>').append(rank) )
  };
}

Record.toRecord = function(plain) {
  return new Record(plain.score, plain.rank);
}
