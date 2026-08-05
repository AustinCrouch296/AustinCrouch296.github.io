$(document).ready(function(){
    var scroll_start = 0;
    var startchange = $('#startchange');
    var header = document.querySelector('#header');

    //Pages without a hero caption have nothing to measure against:
    if (!startchange.length || !header) {
        return;
    }

    var offset = startchange.offset();

    if (document.documentElement.scrollTop > offset.top - 40) {
        header.classList.add('nav-active');
    }

    $(document).scroll(function() {
        scroll_start = $(this).scrollTop();

        if (scroll_start > offset.top - 40) {
            header.classList.add('nav-active');
        } else {
            header.classList.remove('nav-active');
        }
    });
});
