let toggleBtn = document.querySelector(".toggle-btn");
let sidebar = document.querySelector(".sidebar");
let searchBtn = document.querySelector(".search");
const closeButton = document.querySelector("#close-btn");
const arrow = document.querySelector(".TOGGLE")
const rowFour = document.querySelector("#row-four")

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
    const rowFour = document.getElementById('row-four');
    const sectionTwo = document.querySelector('.section-two');

    rowFour.classList.toggle('collapsed');
    sectionTwo.classList.toggle('fill-gap');
}