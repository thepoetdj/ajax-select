// code highlighter
hljs.initHighlightingOnLoad();

// service response is passed as callback function's argument
function countrySelector(response) {
  // this references the select element to which callback function is attached
  response.forEach(element => this.addOption(element['name'], element['numericCode']));
}

function scrollTo(clickedLink) {
  var elementClass = clickedLink.attr('href').replace('#', '.');
  var scrollTo = 0;
  if(elementClass != '.top-content') {
    elementClass += '-container';
    scrollTo = $(elementClass).offset().top;
  }
  if($(window).scrollTop() != scrollTo) {
    $('html, body').stop().animate({scrollTop: scrollTo}, 1000);
  }
}

$(document).ready(function() {
  $('a.scroll-link').on('click', function(e) {
    e.preventDefault();
    scrollTo($(this));
  });
  new WOW().init();
});
