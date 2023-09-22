// Common functions

function validateEmail(email) {
    return email.includes('@');
}

function togglePasswordVisibility(checkboxId, passwordId) {
    const checkbox = document.getElementById(checkboxId);
    const password = document.getElementById(passwordId);

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            password.type = 'text';
        } else {
            password.type = 'password';
        }
    });
}

// Sign-up page specific functions

function signUp(event) {
    event.preventDefault();

    const name = document.getElementById('sName').value;
    const email = document.getElementById('sEmail').value;
    const password = document.getElementById('sPassword').value;
    const lastName =document.getElementById('sLastName').value;
    
    if (validateEmail(email)&& name!=""&& lastName!=''&& email!=''&& password!="") {
        localStorage.setItem('Name', name);
        localStorage.setItem('Email', email);
        localStorage.setItem('Password', password);
        location.href = './login.html';
    }
    
    if(name==""||lastName==''||email==''||password==''){
        document.getElementById('sErrorMessage').textContent = "Please fill out all fields";

    }
     else if(!validateEmail(email)){
        document.getElementById('sErrorMessage').textContent = "Email must contain @ symbol";
    }
    else{
        document.getElementById('sErrorMessage').textContent = "";

    }
}

if (document.title === 'Sign Up') {
    document.getElementById('sBtn').addEventListener('click', signUp);
    togglePasswordVisibility('check', 'sPassword');
}

// Login page specific functions

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('lPassword').value;

    if (validateEmail(email) && email === localStorage.getItem('Email') && password === localStorage.getItem('Password')) {
        location.href = './toDoapp.html';
    } else {
        document.getElementById('errorMessage').textContent = 'Invalid Email or password';
    }
}

if (document.title === 'Login') {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        login();
    });

    togglePasswordVisibility('checkl', 'lPassword');
}
