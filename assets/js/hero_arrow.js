/*==================== HERO SCROLL-DOWN ARROW ====================*/
/* The arrow is position:absolute with bottom:3%, but #hero is not a positioned
   ancestor, so it resolves against the page rather than the hero box. The hero
   itself is `height: 1000px; max-height: 100vh`, so on a viewport taller than
   1000px the arrow would sit below the hero. This nudges it back up by the
   difference.

   The 1000px is the same constant as the #hero media queries in styles.css -
   change one and you must change the other. */
(function () {
    var HERO_HEIGHT = 1000;

    function positionHeroArrow() {
        var arrow = document.getElementById('hero_arrow');

        // Not every page has a hero arrow; do nothing rather than throw.
        if (!arrow) {
            return;
        }

        var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        var viewport = Math.round(window.innerHeight);

        // Below 768px the header takes 3rem off the hero (see styles.css).
        var offset = (window.innerWidth <= 767)
            ? (viewport - (3 * rootFontSize)) - HERO_HEIGHT
            : viewport - HERO_HEIGHT;

        arrow.style.marginBottom = (offset > 0) ? offset + 'px' : '';
    }

    window.addEventListener('resize', positionHeroArrow);
    positionHeroArrow();
}());
