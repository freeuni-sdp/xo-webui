
$(function(){
  $( "form" ).submit(function(e) {

    var url = "xo-signin.herokuapp.com/webui/sign"; // json api
    var data = JSON.stringify($('form').serializeObject()); // serializes the form's elements
    console.log(data);
    
    $.ajax({
      type: "POST",
      url: url,
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

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};