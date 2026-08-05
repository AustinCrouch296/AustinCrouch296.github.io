/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        //Not every section on a page has a matching nav link:
        if (!navLink) {
            return;
        }

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            navLink.classList.add('active-link');
        }else{
            navLink.classList.remove('active-link');
        }
    })
}
window.addEventListener('scroll', scrollActive);
