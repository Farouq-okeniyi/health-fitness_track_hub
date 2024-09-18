let toggleBtn = document.querySelector(".toggle-btn");
let sidebar = document.querySelector(".sidebar");
let searchBtn = document.querySelector(".search");
const closeButton = document.querySelector("#close-btn");

toggleBtn.onclick = function () {
    sidebar.classList.toggle("active");
}

closeButton.onclick = function () {
    sidebar.classList.remove("active");
}

searchBtn.onclick = function () {
    sidebar.classList.toggle("active");
}


const filterSidebar = document.querySelector(".filter")
const openButton = document.querySelector(".bi-caret-down-fill")
//const closeButton = document.querySelector(".bi-x")

openButton.addEventListener("click", () => {
    filterSidebar.classList.toggle('closed')
    openButton.classList.toggle('rotated')
})

document.addEventListener('DOMContentLoaded', function () {
    // Get the current page filename
    var path = window.location.pathname;
    var page = path.split("/").pop();

    // Remove .html from the filename if it exists
    page = page.replace('.html', '');

    // Find the link that corresponds to the current page and add the 'active' class
    var link = document.getElementById(page + '-link');
    if (link) {
        link.classList.add('Active');
        console.log("It is active");

    }
});


document.getElementById('settings-link').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('settings-dropdown').classList.toggle('show');
});
