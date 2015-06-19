
$(function(){

  $( "input[type=text]" ).on('input', function() {
    var dInput = this.value;
    if (!dInput.trim()) {
      return;
    };
    downloadData(dInput);
  });

});

function downloadData(username) {
  $.ajax({
    url: 'https://xo-achiev.herokuapp.com/webapi/+username',
    type: 'GET',
    success: function(data, status, xhttp) {
      drawRow(data);
    },
    error: function(data, status, xhttp) {
      console.log("error");
    }
  });
}

function drawRow(data) {
  Record rec = Record.toRecord(data);
  $('ul').last().append(rec.html());
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

Record.toRecord(plain) {
  return new Record(plain.score, plain.rank);
}
