var token = sessionStorage.getItem('token');
var myRoomId = sessionStorage.getItem('room_id');
var myName = sessionStorage.getItem('username');

var myTurn = false;
var iAmX = false;
var opponentName;

$(function(){

  registerOnGame();
  callForeverCheckState();

  $('#end-game').on('click', function() {
      leaveRoom();
  });

});

function registerOnGame() {
  $.ajax({
    url: 'http://xo-game-sdp.herokuapp.com/webapi/'+myRoomId+'?token=' + token,
    type: 'POST',
    dataType: 'json',
    contentType: "application/json",
    data: JSON.stringify({"user_id": myName}),
    success: function(data, status, xhttp) {
      console.log("join request success");

    },
    error: function(data, status, xhttp) {
      console.log("error");
    }
  });
}

var gameStarted = false;
var turnsSoFar = 0;
var turnsNow = 0;
function callForeverCheckState() {
  $.ajax({
    url: 'http://xo-game-sdp.herokuapp.com/webapi/'+myRoomId+'?token=' + token,
    type: 'GET',
    dataType: 'json',
    success: function(data, status, xhttp) {
      console.log(data);
      switch (data.status) {
          case 0:
            $('#status').text('waiting for another player');
            break;
          case 1:
            if (!gameStarted) {
                gameStarted = true;

                myTurn = data.playerOne === myName;
                iAmX = myTurn;
                opponentName = myTurn ? data.playerTwo : data.playerOne;
                $('#status').text('playing vs '+opponentName);

                tictactoe();
                break;
            }

            turnsNow = data.table.length;
            if (turnsNow != turnsSoFar) {
                myTurn = true;
                turnsSoFar = turnsNow;
                updateCells(data.table);
            }
            break;
          case 2:
            $('#status').text('finished');

            break;
          default:

      }
    },
    error: function(data, status, xhttp) {
      console.log("error");
    },
    complete: function() {
      setTimeout( function(){callForeverCheckState();}, 5000);
    }
  });
}

function updateCells(cells) {
    var arrayLength = cells.length;
    for (var i = 0; i < arrayLength; i++) {
        var indicator = cells[i];
        var cellNum = Math.log2(indicator);
        var turn = i%2 === 0 ? "X" : "O";
        $('td:eq('+cellNum+')').html(turn);
    }
}

function leaveRoom() {
  $.ajax({
    url: 'http://xo-rooms.herokuapp.com/'+myRoomId+'/'+myName+'?token=' + token,
    type: 'DELETE',
    success: function(data, status, xhttp) {
      console.log("left room");
      sessionStorage.removeItem("room_id");

      window.location.href = "/rooms";
    },
    error: function(data, status, xhttp) {
      console.log("error");
    }
  });
}


/*
 * A complete tic-tac-toe widget, using JQuery.  Just include this
 * script in a browser page and play.  A tic-tac-toe game will be
 * included as a child element of the element with id "tictactoe".
 * If the page has no such element, it will just be added at the end
 * of the body.
 */
function tictactoe() {
    var squares = [],
        SIZE = 3,
        EMPTY = "&nbsp;",
        score,
        moves,
        turn = "X",
        lastClickedCell,

    /*
     * To determine a win condition, each square is "tagged" from left
     * to right, top to bottom, with successive powers of 2.  Each cell
     * thus represents an individual bit in a 9-bit string, and a
     * player's squares at any given time can be represented as a
     * unique 9-bit value. A winner can thus be easily determined by
     * checking whether the player's current 9 bits have covered any
     * of the eight "three-in-a-row" combinations.
     *
     *     273                 84
     *        \               /
     *          1 |   2 |   4  = 7
     *       -----+-----+-----
     *          8 |  16 |  32  = 56
     *       -----+-----+-----
     *         64 | 128 | 256  = 448
     *       =================
     *         73   146   292
     *
     */
    wins = [7, 56, 448, 73, 146, 292, 273, 84],

    /*
     * Clears the score and move count, erases the board, and makes it
     * X's turn.
     */
    startNewGame = function () {
        turn = myTurn ? "X" : "O";
        score = {"X": 0, "O": 0};
        moves = 0;
        squares.forEach(function (square) {square.html(EMPTY);});
    },

    /*
     * Returns whether the given score is a winning score.
     */
    win = function (score) {
        for (var i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true;
            }
        }
        return false;
    },

    /*
     * Sets the clicked-on square to the current player's mark,
     * then checks for a win or cats game.  Also changes the
     * current player.
     */
    set = function () {

        if ($(this).html() !== EMPTY || !myTurn) {
            return;
        }
        lastClickedCell = $(this);
        // $(this).html(turn);
        console.log($(this));
        moves += 1;
        score[turn] += $(this)[0].indicator;
        console.log(score[turn]);
        if (win(score[turn])) {
            alert(turn + " wins!");
            startNewGame();
        } else if (moves === SIZE * SIZE) {
            alert("Cat\u2019s game!");
            startNewGame();
        } else {
            // turn = turn === "X" ? "O" : "X";
            myTurn = !myTurn;
            sendUpdate($(this)[0].indicator);
        }
    },

    sendUpdate = function (indicator) {
        $.ajax({
            url: 'http://xo-game-sdp.herokuapp.com/webapi/'+myRoomId+'?token=' + token,
            type: 'PUT',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify({"user_id": myName, "cell": indicator}),
            success: function(data, status, xhttp) {
                console.log("update response");
                lastClickedCell.html(turn);
                turnsSoFar = moves;
                // myTurn = !myTurn;
            },
            error: function(data, status, xhttp) {
                console.log("error");
            }
        });
    }

    /*
     * Creates and attaches the DOM elements for the board as an
     * HTML table, assigns the indicators for each cell, and starts
     * a new game.
     */
    play = function () {
        var board = $("<table border=1 cellspacing=0>"), indicator = 1;
        for (var i = 0; i < SIZE; i += 1) {
            var row = $("<tr>");
            board.append(row);
            for (var j = 0; j < SIZE; j += 1) {
                var cell = $("<td height=50 width=50 align=center valign=center></td>");
                cell[0].indicator = indicator;
                cell.click(set);
                row.append(cell);
                squares.push(cell);
                indicator += indicator;
            }
        }

        // Attach under tictactoe if present, otherwise to body.
        $(document.getElementById("tictactoe") || document.body).append(board);
        startNewGame();
    };

    play();
}
