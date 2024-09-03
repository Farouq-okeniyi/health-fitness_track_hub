let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");

function showform() {
    const imagediv = document.getElementById('imagediv');
    const form = document.getElementById('form');

    if (imagediv.style.position === 'absolute' || imagediv.style.position === '') {
        imagediv.style.position = 'relative';
        form.style.display = 'block';
        form.style.opacity = 1;
    } else {
        imagediv.style.position = 'absolute';
        form.style.display = 'none';
        form.style.opacity = 0;
    }
}
  

function loginValidation() {

    email = email.value;
    password = password.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email === "" && password === "") {
        document.getElementById("error-message").style.cssText = "display: block; padding: 5px 1px ";
        document.getElementById("error-message").innerHTML = "No field can be empty";
    } else if (email !== "" && password === "") {
        document.getElementById("error-message").style.display = "block";
        document.getElementById("error-message").innerHTML = "Please enter a password";
    } else if (password !== "" && email === "") {
        document.getElementById("error-message").style.display = "block";
        document.getElementById("error-message").innerHTML = "Please enter an Email";
    } else if (!emailRegex.test(email)) {
        document.getElementById("error-message").style.display = "block";
        document.getElementById("error-message").innerHTML = "Invalid email address";
    } else if (password.length < 8) {
        document.getElementById("error-message").style.cssText = "display: block; padding: 5px 12px 2px 12px";
        document.getElementById("error-message").innerHTML = "Password must be at least 8 characters";
    } else {
        document.getElementById("error-message").style.display = "block";
    }
}
