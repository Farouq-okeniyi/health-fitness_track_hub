let toggleBtn = document.querySelector(".toggle-btn");
let sidebar = document.querySelector(".sidebar");
let searchBtn = document.querySelector(".search");
const closeButton = document.querySelector("#close-btn");
const arrow = document.querySelector(".TOGGLE")
const rowFour = document.querySelector("#row-four")
sectionTwo = document.querySelector(".sub-sec")

toggleBtn.onclick = function () {
    sidebar.classList.toggle("active");
}

closeButton.onclick = function () {
    sidebar.classList.remove("active");
}

searchBtn.onclick = function () {
    sidebar.classList.toggle("active");
}

arrow.addEventListener('click', () => {
    arrow.classList.toggle("close");
    toggleRowFour()
})

function toggleRowFour() {

    rowFour.classList.toggle('collapsed');
    sectionTwo.classList.toggle('fill-gap');
}

document.addEventListener('DOMContentLoaded', function () {
    // Get the current page filename
    var path = window.location.pathname;
    var page = path.split("/").pop();

    // Remove .html from the filename if it exists
    page = page.replace('.html', '');

    // Find the link that corresponds to the current page and add the 'active' class
    var link = document.getElementById(page + '-link');
    if (link) {
        link.classList.add('active');
    }
});