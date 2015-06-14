
var colLen = 3;

$( document ).on( 'click', '.col', function(event) {
  var roomId = $(this).attr('id');
  $.ajax({
    url: 'http://private-3e4b8-xorooms.apiary-mock.com/'+roomId+'?token=token',
    type: 'POST',
    dataType: 'jsonp',
    success: function(data, status, xhttp) {
      console.log("joined");
    },
    error: function(data, status, xhttp) {
      console.log("error");
    }
  });
})

$( document ).ready(function() {
  $.ajax({
    url: 'http://private-3e4b8-xorooms.apiary-mock.com/?token=token',
    type: 'GET',
    dataType: 'json',
    success: function(data, status, xhttp) {
      drawGrid(data);
    },
    error: function(data, status, xhttp) {
      console.log("error");
    }
  });

});

function drawGrid(data) {
  $.each(data.rooms, function( i, obj ) {

    var room = RoomFactory.get(obj);

    if ((i%colLen) == 0){
      $('#container').append( $('<div/>', {'class':'row'}) );
    }
    $('.row').last().append(room.html());

  });
}

function Room(id, x_user, o_user) {
  this.id = id;
  this.x_user = x_user;
  this.o_user = o_user;
  this.msg;

  this.html = function() {
    return $('<div/>', {'class':'col', 'id':id})
      .append( $('<h3/>').append('#'+id) )
      .append( $('<h5/>').append(this.msg) )
  };
}

function RoomFactory() {};
RoomFactory.get = function(obj) {
  if (obj.x_user == null) {
    return new EmptyRoom(obj.room);
  }
  if (obj.o_user == null) {
    return new WaitingRoom(obj.room, obj.x_user);
  }
  return new FullRoom(obj.room, obj.x_user, obj.o_user);
}

function EmptyRoom(id) {
  Room.call(this, id);
  this.msg = 'empty';
}

function WaitingRoom(id, x_user) {
  Room.call(this, id, x_user);
  this.msg = x_user+'is waiting';
}

function FullRoom(id, x_user, o_user) {
  Room.call(this, id, x_user);
  this.msg = x_user+' vs '+o_user;
}


EmptyRoom.prototype = Object.create(Room.prototype);
EmptyRoom.prototype.constructor = EmptyRoom;
