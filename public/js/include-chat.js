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
    
}

function removeChatWindow() {
    $('chatwindow').remove();
}
