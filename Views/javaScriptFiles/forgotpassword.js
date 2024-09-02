let emailInput = document.getElementById("email");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const errorMessage = document.getElementById("errorMessage");

function formValidation() {

    email = emailInput.value;

    if (email === "") {
        errorMessage.classList.add("show", "invalid")
        errorMessage.innerHTML = `<img src='${"./../resourcesFiles/Vector (5).png"}' alt='Error Icon'> Cannot be empty`;
    } else if (!emailRegex.test(email)) {
        errorMessage.classList.add("show", "invalid")
        errorMessage.innerHTML = `<img src='${"./../resourcesFiles/Vector (5).png"}' alt='Error Icon'> Invalid Email Address`;
    } else {
        document.getElementById('sub-container').style.cssText = "opacity: 0";
        document.getElementById("message").style.cssText = "opacity: 1; display: block;";
        console.log('Email Reset Successful');
    }
}












