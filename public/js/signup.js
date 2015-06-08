
$(function(){
  $( "form" ).submit(function(e) {

    $.ajax({
      type: "POST",
      url: "xo-signin.herokuapp.com/webui/sign",
      beforeSend: function( xhr ) {
        var pass1 = $( "input[name='password1']" ).val();
        var pass2 = $( "input[name='password2']" ).val();
        if (pass1 !== pass2) {
          xhr.abort();
        };
      },
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