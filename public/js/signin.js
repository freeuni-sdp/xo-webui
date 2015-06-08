
$(function(){
  $( "form" ).submit(function(e) {

    var url = "xo-login.herokuapp.com/webui/sign"; // json api
    var data = JSON.stringify($('form').serializeObject()); // serializes the form's elements
    console.log(data);
    
    $.ajax({
      type: "POST",
      url: url,
      dataType: 'jsonp',
      data: data,
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