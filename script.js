// Register User
function registerUser(event) {
    event.preventDefault(); // Prevent form from reloading the page

    let name = document.getElementById("name").value;
    let email = document.getElementById("register-email").value;
    let password = document.getElementById("register-password").value;

    if (!name || !email || !password) {
        document.getElementById("register-error").innerText = "All fields are required!";
        return false;
    }

    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    alert("Registration successful! Please log in.");
    window.location.href = "login.html";
}

// Login User
function loginUser(event) {
    event.preventDefault(); // Prevent page refresh

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    let storedEmail = localStorage.getItem("userEmail");
    let storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && password === storedPassword) {
        localStorage.setItem("loggedIn", "true"); // Set session
        alert("Login successful!");
        window.location.href = "welcome.html";
    } else {
        document.getElementById("login-error").innerText = "Invalid email or password.";
    }
}

// Check if user is logged in (on Welcome Page)
function checkAuth() {
    let isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn !== "true") {
        window.location.href = "login.html";
    } else {
        document.getElementById("user-name").innerText = localStorage.getItem("userName");
    }
}

// Logout function
function logout() {
    localStorage.removeItem("loggedIn"); // Remove session
    alert("Logged out successfully!");
    window.location.href = "login.html";
}
