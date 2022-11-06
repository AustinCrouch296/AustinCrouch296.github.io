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

  carousel.classList.toggle('is-fullscreen');
  btn.classList.toggle('active');
  $carousel.flickity('resize');

  setTimeout(function() {
    $carousel.flickity('resize');}, 500);
}