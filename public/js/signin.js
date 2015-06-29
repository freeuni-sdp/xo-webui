
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
      statusCode: {
        422: function (response) {
            alert("username or password incorrect");
        },
        400: function (response) {
            alert("error 400");
        }
      }
    });

    e.preventDefault();
  });
});
