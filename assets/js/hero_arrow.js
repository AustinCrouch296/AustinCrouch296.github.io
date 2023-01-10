$(window).on("resize", function () {
    let width = screen.width;

    if (width <= 767) {
        //( 100vh - 3 rem) - 1000px
        offset = (Math.round(window.innerHeight) - (3 * parseFloat(getComputedStyle(document.documentElement).fontSize))) - 1000;
    } else {
        // 100vh - 1000px
        offset = Math.round(window.innerHeight) - 1000; 
    }

    if (offset > 0) {
        offset = offset + 'px';
        document.getElementById('hero_arrow').style.marginBottom = offset;
    }
}).resize();