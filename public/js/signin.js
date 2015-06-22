
$(function(){
  $( "form" ).submit(function(e) {

    var url = "http://xo-login.herokuapp.com/webapi/login"; // json api
    var data = JSON.stringify($('form').serializeObject()); // serializes the form's elements
    console.log(data);
    
    $.ajax({
      type: "PUT",
      url: url,
      dataType: 'json',
      contentType:"application/json; charset=utf-8",
      data: data,
      success: function(data) {
        sessionStorage.setItem('token', data.token);
        window.location.href = "/";
      },
      error: function(data) {
        console.log("username or password incorrect");
      }
    });
    
    e.preventDefault();
  });
});