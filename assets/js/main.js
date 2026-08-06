/*==================== MENU SHOW Y HIDDEN ====================*/
const  navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');

/* Keep the toggle's aria-expanded in step with the menu, so screen reader users
   are told whether the menu is open. */
function setMenuOpen(isOpen) {
    if (!navMenu) {
        return;
    }

    navMenu.classList.toggle('show-menu', isOpen);

    if (navToggle) {
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
}

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', ()=>{
        setMenuOpen(true);
        // Move focus into the menu so keyboard users land where the menu opened
        if (navClose) {
            navClose.focus();
        }
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', ()=>{
        setMenuOpen(false);
        if (navToggle) {
            navToggle.focus();
        }
    })
}

/*===== CLOSE THE MENU WITH ESCAPE =====*/
document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !navMenu || !navMenu.classList.contains('show-menu')) {
        return;
    }

    setMenuOpen(false);
    if (navToggle) {
        navToggle.focus();
    }
});

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    // When we click on each nav__link, we remove the show-menu class
    setMenuOpen(false);
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const nav = document.getElementById('header');
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*==================== REDUCED MOTION ====================*/
/* The hero videos are decorative and autoplay. CSS can suppress animation but not
   video playback, so stop them here for visitors who ask for reduced motion. */
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('#hero video').forEach((video) => {
        video.removeAttribute('autoplay');
        video.autoplay = false;
        video.pause();
    });
}
