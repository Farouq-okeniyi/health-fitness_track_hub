window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');

    if (window.scrollY > 1) { // Change this value to adjust when the background changes
        navbar.classList.add('scrolled');
        navbar.classList.remove('unscrolled');
    } else {
        navbar.classList.add('unscrolled');
        navbar.classList.remove('scrolled');
    }
});


const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 700) { // adjust the scroll position value as needed
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

if (window.scrollY < document.body.scrollHeight / 2) { // adjust the scroll position value as needed
    backToTop.classList.add('up');
} else {
    backToTop.classList.remove('up');
}

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
