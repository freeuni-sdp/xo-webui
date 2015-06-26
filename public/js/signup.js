
$(function(){

  $( "form" ).validate({
    rules: {
      password2: {
          equalTo: "#p1"
      }
    },
    submitHandler: function(e) {

      $.ajax({
        type: "POST",
        url: "http://xo-signin.herokuapp.com/signup",
        dataType: 'json',
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify($('input:not(.skip):not(:submit)').serializeObject()),
        success: function(data) {
          console.log(data);
          window.location.href = "/signin";
        },
        statusCode: {
          409: function (resonse) {
            alert("already exists");
          }
        }
      });

    }
  });

});
