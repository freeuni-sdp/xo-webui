
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
      200: function() {
        setClass("ok", index);
      }
    },
    complete: function() {
      setPing( new Date() - startTime, index );
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
  setTimeout( function(){
    pingOnce( url, index );     }, 10000);
}

///+++ on load +++

$(function () {

  $("table tr td:nth-child(2)").each(function ( index ) {
    console.log(index+' '+$( this ).text());
    pingForever( index , $( this ).text() );
  });
});
