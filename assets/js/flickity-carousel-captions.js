var caption_to_change = document.getElementById("flickity-caption");
var caption_to_change2 = document.getElementById("flickity-fullscreen-caption");
// Flickity instance
var flkty = $carousel.data('flickity');

// Set the caption text based on carousel-img's alt text:
$carousel.on( 'select.flickity', function() {
  var caption = $(flkty.selectedElement).find('img').attr('alt')

  caption_to_change.innerHTML = caption;
  caption_to_change2.innerHTML = caption;
});

//On page load, move flickity caption above the flickity-page-dots:
$(document).ready(function(){
    activated_carousel = document.querySelector('.main-carousel.flickity-enabled');
    carousel_page_dots = document.querySelector('.main-carousel.flickity-enabled .flickity-page-dots');

    var caption_div = document.getElementById('flickity-caption');
    activated_carousel.insertBefore(caption_div, carousel_page_dots);
});