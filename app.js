document.addEventListener('scroll', function(){
    
    let nav = document.querySelector('nav');
    nav.classList.toggle('scrolling-active', window.scrollY > 0);
});
document.documentElement.style.setProperty('--nav-height', document.querySelector('nav').offsetHeight);

document.documentElement.style.setProperty('--container-height', document.getElementById('form-cnt').offsetHeight+20);