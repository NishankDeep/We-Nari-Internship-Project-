document.addEventListener('scroll', function(){
    
    let nav = document.querySelector('nav');
    nav.classList.toggle('scrolling-active', window.scrollY > 0);
});