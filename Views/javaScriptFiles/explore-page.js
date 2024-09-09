const filterSidebar = document.querySelector(".filter")
const openButton = document.querySelector(".bi-caret-down-fill")
//const closeButton = document.querySelector(".bi-x")

openButton.addEventListener("click", () => {
    filterSidebar.classList.toggle('closed')
    openButton.classList.toggle('rotated')
})