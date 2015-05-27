
function pingOnce(url, index) {
  $.ajax( url, {
    dataType: 'jsonp',
    statusCode: {
      408: function() {
        setClass("timeout", index);
      },
      404: function() {
        setClass("not-found", index);
      },
      200: function() {
        setClass("ok", index);
      }
    }
  });
}

function setClass( statusClass, index ) {
  $( "#services-list li" ).eq( index ).attr( "class" , statusClass);
}

function pingForever( index, url ) {
  pingOnce( url, index );
  setTimeout( function(){
    pingOnce( url, index );     }, 10000);
}

///+++ on load +++

$(function () {

  $( "#services-list" ).selectable();
  $( "#services-list li" ).each( function( index, item ) {
    pingForever( index , $( this ).text() );
  });
});
