var $carousel = $('.main-carousel').flickity({
  // options
  wrapAround: "true", 
  cellAlign: "center",
  imagesLoaded: "true"
});

var caption_to_change = document.getElementById("flickity-caption");
// Flickity instance
var flkty = $carousel.data('flickity');

$carousel.on( 'select.flickity', function() {
  // set image caption using img's alt
  var caption = $(flkty.selectedElement).find('img').attr('alt')
  caption_to_change.innerHTML = caption;
});
