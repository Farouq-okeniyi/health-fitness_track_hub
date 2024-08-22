let emailInput = document.getElementById("email");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const errorMessage = document.getElementById("errorMessage");

function formValidation() {

    email = emailInput.value;

    if (email === "") {
        errorMessage.style.cssText = "display: block; padding: 5px 1px;";
        errorMessage.innerHTML = `<img src='${"./../resourcesFiles/Vector (5).png"}' alt='Error Icon'> Cannot be empty`;
    } else if (!emailRegex.test(email)) {
        errorMessage.style.cssText = "display: block; padding: 5px 12px 2px 12px";
        errorMessage.innerHTML = `<img src='${"./../resourcesFiles/Vector (5).png"}' alt='Error Icon'> Invalid Email Address`;
    } else {
        document.getElementById('sub-container').style.display = "none"
        document.getElementById("message").style.display = "block";
        console.log('Email Reset Successful');
    }
}












