
var colLen = 3;
var myRoomId = -1; // -1 when room not selected

$( document ).on( 'click', '.col', function(event) {
  var roomId = $(this).attr('id');
  if (roomId === myRoomId) {
    console.log('leave? '+myRoomId);
    leaveRoom(roomId);
    myRoomId = -1;
    return;
  }
  if (myRoomId === -1) {
    myRoomId = roomId;
    console.log('join? '+myRoomId);
    joinRoom(roomId);
  }

});

function leaveRoom(roomId) {
  $.ajax({
    url: 'http://xo-rooms.herokuapp.com/webapi/'+roomId+'/1/?token=token',
    type: 'DELETE',
    success: function(data, status, xhttp) {
      console.log("left");
    },
    error: function(data, status, xhttp) {
      console.log("error leaving");
    }
  });
}

function joinRoom(roomId) {
  $.ajax({
    url: 'http://xo-rooms.herokuapp.com/webapi/'+roomId+'?token=token',
    type: 'POST',
    dataType: 'json',
    success: function(data, status, xhttp) {
      console.log("joined");
    },
    error: function(data, status, xhttp) {
      console.log("error joining");
    }
  });
}

$( document ).ready(function() {
  $.ajax({
    url: 'http://xo-rooms.herokuapp.com/webapi/?token=token',
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
  $.each(data, function( i, obj ) {

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
    return new EmptyRoom(obj.id);
  }
  if (obj.o_user == null) {
    return new WaitingRoom(obj.id, obj.x_user);
  }
  return new FullRoom(obj.id, obj.x_user, obj.o_user);
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
