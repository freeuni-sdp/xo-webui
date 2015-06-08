
$(function(){
  
  $( "form" ).validate({
    rules: {
      password2: {
          equalTo: "#p1"
      }
    }
  });

  $( "form" ).submit(function(e) {

    $.ajax({
      type: "POST",
      url: "xo-signin.herokuapp.com/webui/sign",
      dataType: 'jsonp',
      data: JSON.stringify($('form').serializeObject()),
      success: function(data) {
        alert(data); // show response
      },
      error: function(data) {
        console.log("fail");
      }
    });
    
    e.preventDefault();
  });
});