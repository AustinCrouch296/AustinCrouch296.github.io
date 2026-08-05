/*==================== PORTFOLIO SWIPER  ====================*/
/* Only cprewritten.html has a .portfolio__container, so this is the only page that loads Swiper. */
let swiper = new Swiper(".portfolio__container", {
    cssMode: true,
    loop: false,
    slidesPerView:'auto',
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});
