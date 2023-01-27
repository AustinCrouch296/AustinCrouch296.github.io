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
  fs_caption_div = document.getElementById("flickity-fullscreen-div");

  $carousel.flickity('toggleFullscreen');
  btn.classList.toggle('active');
  fs_caption_div.classList.toggle('inactive');
  $carousel.flickity('resize');
}

function fsFlickitySetImg(img_id) {
  $carousel.flickity( 'select', img_id, false, true )
}

//====================================

$(document).ready(function(){

  $(window).on('resize', function(){

    if($(window).width() <= 768){
      $carousel.flickity('resize');
    }
  });
});

//====================================

// Flickity fullscreen on button click
$carousel.on( 'staticClick.flickity', function( event, pointer, cellElement, cellIndex ) {
  fsFlickity();
});