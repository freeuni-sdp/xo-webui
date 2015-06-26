
$(function(){
  $( "form" ).submit(function(e) {

    var jsonForm = $('form').serializeObject();

    $.ajax({
      type: "PUT",
      url: "http://xo-login.herokuapp.com/webapi/login",
      dataType: 'json',
      contentType:"application/json; charset=utf-8",
      data: JSON.stringify(jsonForm),
      success: function(data) {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('username', jsonForm.username);
        window.location.href = "/";
      },
      error: function(data) {
        alert("username or password incorrect");
      }
    });

    e.preventDefault();
  });
});
