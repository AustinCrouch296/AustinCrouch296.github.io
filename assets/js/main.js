/*==================== MENU SHOW Y HIDDEN ====================*/
/* The nav lives in partials/header.html and is swapped in by include.js AFTER
   this script runs, so nothing here may capture a nav element once and hold it -
   the reference would point at a node that is no longer in the document, and the
   mobile menu would silently stop responding. Everything below therefore either
   looks the element up at the moment it is needed, or is delegated to document. */
function navMenuEl()   { return document.getElementById('nav-menu'); }
function navToggleEl() { return document.getElementById('nav-toggle'); }
function navCloseEl()  { return document.getElementById('nav-close'); }

/* Keep the toggle's aria-expanded in step with the menu, so screen reader users
   are told whether the menu is open. */
function setMenuOpen(isOpen) {
    const navMenu = navMenuEl();
    if (!navMenu) {
        return;
    }

    navMenu.classList.toggle('show-menu', isOpen);

    const navToggle = navToggleEl();
    if (navToggle) {
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
}

/*===== MENU SHOW / HIDDEN / CLOSE-ON-LINK =====*/
/* One delegated listener covers the toggle, the close button and every nav link,
   and keeps working across an include.js swap. */
document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) {
        return;
    }

    if (target.closest('#nav-toggle')) {
        setMenuOpen(true);
        // Move focus into the menu so keyboard users land where the menu opened
        const navClose = navCloseEl();
        if (navClose) {
            navClose.focus();
        }
        return;
    }

    if (target.closest('#nav-close')) {
        setMenuOpen(false);
        const navToggle = navToggleEl();
        if (navToggle) {
            navToggle.focus();
        }
        return;
    }

    if (target.closest('.nav__link')) {
        // Following a link should not leave the mobile menu open behind it
        setMenuOpen(false);
    }
});

/*===== CLOSE THE MENU WITH ESCAPE =====*/
document.addEventListener('keydown', (event) => {
    const navMenu = navMenuEl();
    if (event.key !== 'Escape' || !navMenu || !navMenu.classList.contains('show-menu')) {
        return;
    }

    setMenuOpen(false);
    const navToggle = navToggleEl();
    if (navToggle) {
        navToggle.focus();
    }
});

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
