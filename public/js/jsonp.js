
$( document ).ready(function() {
  $.ajax({
    url: 'http://freeuni-sdp-todo.herokuapp.com/webapi/ping/3',
    type: 'GET',
    dataType: 'jsonp',
    success: function(data, status, xhttp) {
      console.log(data.id);
    },
    error: function(data, status, xhttp) {
      console.log("error");
    }
  });
});