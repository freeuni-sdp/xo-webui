
function pingOnce(url, index) {
  var startTime = new Date();
  $.ajax( url, {
    dataType: 'jsonp',
    statusCode: {
      408: function() {
        setClass("timeout", index);
      },
      404: function() {
        setClass("not-found", index);
      },
      503: function() {
          console.log("asdasdasdasdasds");
        setClass("timeout", index);
      },
      200: function() {
        setClass("ok", index);
      }
    },
    complete: function() {
      setPing( new Date() - startTime, index );
      setTimeout( function(){
        pingOnce( url, index );    }, 10000);
    }
  });
}

function setClass( statusClass, index ) {
  $( "table tr" ).not(":first").eq( index ).attr( "class" , statusClass);
}

function setPing( time, index ) {
  $( ".ping" ).eq( index ).text( time);
}

function pingForever( index, url ) {
  pingOnce( url, index );
}

///+++ on load +++

$(function () {

  $("table tr td:nth-child(2)").each(function ( index ) {
    pingForever( index , $( this ).text() );
  });
});
