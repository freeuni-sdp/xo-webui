$(function(){

  if (sessionStorage.getItem('token')) {

    $('.sign-group').empty();
    $('.sign-group')
      .append( $('<button/>', {'class':'sign'}).append( 'Log out' ) )
      .append( $('<h4/>', {'class':'sign'}).text(sessionStorage.getItem('username')));
  } else {
    $('.sign-group')
      .append( $('<a/>', {'href':'/signin'})
      .append( $('<button/>', {'class':'sign'}).append( 'Sign in' ) ) )
      .append( $('<a/>', {'href':'/signup'})
      .append( $('<button/>', {'class':'sign'}).append( 'Sign up' ) ) );
  }

  $('.sign-group').on('click', 'button', function(){
    sessionStorage.clear();
    window.location.href = "/";
  });
});
