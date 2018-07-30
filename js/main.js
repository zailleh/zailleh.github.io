const profileHover = function(e) {
  $(this).css('background-image', "url('https://i.imgur.com/pkt74cI.jpg')")
}

const profileLeave = function(e) {
  $(this).attr("style","")
}

$(document).ready( () => {
  $('.profile')
    .on('mouseenter', profileHover)
    .on('click', profileHover)
    .on('mouseleave', profileLeave);
});