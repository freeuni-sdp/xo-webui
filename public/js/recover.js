
$(function(){

  $( "form" ).validate({
    submitHandler: function(e) {

      $.ajax({
        url: 'http://private-6e6f0-xosignin.apiary-mock.com/recover_password',
        type: 'POST',
        data: JSON.stringify($( "input" ).serializeObject()),
        success: function(data) {
          window.location.href = "/signin";
        },
        error: function(data) {
          console.log("error");
        }
      });
    }
  });
});
