
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
        data: JSON.stringify($('form').serializeObject()),
        success: function(data) {
          window.location.href = "/signin";
        },
        error: function(data) {
          console.log("fail");
        }
      });
      
    }
  });

});