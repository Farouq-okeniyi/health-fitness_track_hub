window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    
    if (window.scrollY > 1) { // Change this value to adjust when the background changes
        navbar.classList.add('scrolled');
        navbar.classList.remove('unscrolled');
    } else {
        navbar.classList.add('unscrolled');
        navbar.classList.remove('scrolled');
    }
});