var $carousel = $('.main-carousel').flickity({
  // options
  wrapAround: "true", 
  cellAlign: "center",
  imagesLoaded: "true",
});

function fsFlickity() {
  var carousel = {};
  carousel = document.getElementById("main-carousel");
  btn = document.getElementById("flickity-fullscreen-btn");
  fs_caption = document.getElementById("flickity-fullscreen-caption");

  carousel.classList.toggle('is-fullscreen');
  btn.classList.toggle('active');
  fs_caption.classList.toggle('inactive');
  $carousel.flickity('resize');

  setTimeout(function() {
    $carousel.flickity('resize');}, 500);
}

//====================================

$(document).ready(function(){

  $(window).on('resize', function(){

    if($(window).width() <= 768){
      $carousel.flickity('resize');
    }
  });
});