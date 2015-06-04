
$(function(){
  $( "#send-button" ).click(function() {
    $.ajax({
      url: 'http://xo-asdasd.herokuapp.com/webapi/recover',
      type: 'POST',
      dataType: 'jsonp',
      data: JSON.stringify($( "input" ).serializeObject()),
      success: function(data, status, xhttp) {
        console.log("not inplemented")
      },
      error: function(data, status, xhttp) {
        console.log("error");
      }
    });
  });
});
