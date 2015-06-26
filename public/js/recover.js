
$(function(){

  $( "form" ).validate({
    submitHandler: function(e) {

      $.ajax({
        url: 'http://xo-signin.herokuapp.com/recover_password',
        type: 'POST',
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify($( "input:not(:submit)" ).serializeObject()),
        success: function(data) {
          window.location.href = "/signin";
        },
        error: function(data) {
          alert("error");
        }
      });
    }
  });
});
