let nav = document.querySelector('nav');

document.addEventListener('scroll', toggle_bg);

function toggle_bg() {

    nav.classList.toggle('scrolling-active', window.scrollY > 0);
}
function show() {

    let pass = document.getElementById('password')

    if (pass.type == 'password') pass.type = 'text'

    else pass.type = 'password'
}