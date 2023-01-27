$(document).ready(function(){       
var scroll_start = 0;
var startchange = $('#startchange');
var offset = startchange.offset();
var header = document.querySelector('#header');

if (document.documentElement.scrollTop > offset.top - 40) {
    header.classList.add('nav-active');
}

if (startchange.length){
    $(document).scroll(function() { 
        scroll_start = $(this).scrollTop();

        if(scroll_start > offset.top - 40) {
            header.classList.add('nav-active');
        } else {
            header.classList.remove('nav-active');
        }
    });
}
});