let nav = document.querySelector('nav');

document.addEventListener('scroll', toggle_bg);

function toggle_bg() {

    nav.classList.toggle('scrolling-active', window.scrollY > 0);
}