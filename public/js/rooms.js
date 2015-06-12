
var colLen = 3;

$( document ).ready(function() {
  $.ajax({
    url: 'http://private-3e4b8-xorooms.apiary-mock.com/?token=token',
    type: 'GET',
    dataType: 'json',
    success: function(data, status, xhttp) {
      drawGrid(data);
    },
    error: function(data, status, xhttp) {
      console.log("error");
    }
  });
});

function drawGrid(data) {
  $.each(data.rooms, function( i, obj ) {

    if ((i%colLen) == 0){
      $('#container').append( $('<div/>', {'class':'row'}) );
    }
    $('.row').last().append(
      $('<div/>', {'class':'col'})
      .append( $('<h3/>').append('#'+obj.room) )
      .append( $('<h5/>') ).append('active users: [' + obj["x-user"]+', '+obj["o-user"] + ']')
      );

    console.log("#"+i+" "+obj.room);
  });
}