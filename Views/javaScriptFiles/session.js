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


const financeLink = document.getElementById('finance-link');
const financeDropdown = document.getElementById('finance-dropdown');
const settingsLink = document.getElementById('settings-link');
const settingsDropdown = document.getElementById('settings-dropdown');
const dropdown = document.querySelector('.finance', '.settings')

financeLink.addEventListener('click', (e) => {
    e.preventDefault();
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');

    if (currentPage === 'finance') {
        financeDropdown.classList.toggle('show');
        dropdown.classList.toggle('hide');
        console.log(dropdown);


    } else {
        window.location.href = 'http://127.0.0.1:5501/Views/htmlFiles/finance.html';
    }
});

settingsLink.addEventListener('click', (e) => {
    e.preventDefault();
    settingsDropdown.classList.toggle('show');
    console.log(settingsDropdown);

});

// POPUP //

function toggle() {
    const blur = document.getElementById("blur");
    blur.classList.toggle("blur-active")
    const popup = document.getElementById('popup');
    popup.classList.toggle('popup-active')
}

function navigate() {
    const form = document.getElementById('card-form');
    form.classList.toggle('card_form_show');
    document.querySelector('.sub-paymentOptions').classList.toggle('card-form-active');
}