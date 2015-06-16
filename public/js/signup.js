
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
        url: "http://private-6e6f0-xosignin.apiary-mock.com/webapi/signup",
        dataType: 'json',
        data: JSON.stringify($('form').serializeObject()),
        success: function(data) {
          alert(data); // show response
        },
        error: function(data) {
          console.log("fail");
        }
      });
      
    }
  });

});