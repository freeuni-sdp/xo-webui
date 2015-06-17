
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
        url: "http://private-6e6f0-xosignin.apiary-mock.com/signup",
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