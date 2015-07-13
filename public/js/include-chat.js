var token = sessionStorage.getItem('token');
var myName = sessionStorage.getItem('username');

$( document ).ready(function() {
    if (token) {
        displayChatWindow();
        loadMessages();
    } else {
        removeChatWindow();
    }
});

function displayChatWindow() {
    $.get('chat', function(data){
        $("body").append(data);
    });

    $('#chatwindow .toggle').click(function() {
        // not working
        $(this).animate({
            left: '-50%'
        }, 500, function() {
            $(this).css('left', '150%');
            $(this).appendTo('#container');
        });
    });
}

function loadMessages() {
    $.ajax({
        url: 'http://xo-chat.herokuapp.com/webapi?token='+token,
        type: 'GET',
        success: function(data, status, xhttp) {
            displayChatMessages($('#chat-list ul'), data);
            $('#chat-list ul').trigger("chosen:updated");
        },
        error: function(data, status, xhttp) {
            console.log("error "+status);
        }
    });
}

function removeChatWindow() {
    $('chatwindow').remove();
}

function displayChatMessages($parent, data) {
    $.each(data, function( i, obj ) {
        var rec = ChatRecord.toRecord(obj);
        $parent.append(rec.html());

    });
}

function ChatRecord(data) {
    this.user = data.senderUserName;
    this.message = data.text;

    this.html = function() {
        return $('<li/>', {'class':'msg-record'})
            .append( $('<h5/>', {'class':'sender'}).append(this.user) )
            .append( $('<h5/>', {'class':'msg'}).append(this.message) );
    };

}

ChatRecord.toRecord = function(plain) {
    return new ChatRecord(plain);
}
