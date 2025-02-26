document.addEventListener("DOMContentLoaded", function () {
    let user = localStorage.getItem("loggedInUser");
    if (document.getElementById("user-name") && user) {
        document.getElementById("user-name").textContent = user;
    }
});

function registerUser(event) {
    event.preventDefault();
    
    let name = document.getElementById("register-name").value;
    let email = document.getElementById("register-email").value;
    let password = document.getElementById("register-password").value;

    if (!/[!@#$%^&*]/.test(password) || password.length < 8) {
        alert("Password must be at least 8 characters and contain a symbol.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email)) {
        alert("This email is already registered. Try another one.");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! You can now log in.");
    window.location.href = "index.html";
}

function loginUser(event) {
    event.preventDefault();

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(user => user.email === email && user.password === password);
    if (user) {
        localStorage.setItem("loggedInUser", user.name);
        window.location.href = "welcome.html";
    } else {
        alert("Invalid email or password!");
    }
}

function resetPassword(event) {
    event.preventDefault();

    let email = document.getElementById("reset-email").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    let user = users.find(user => user.email === email);
    if (!user) {
        alert("No account found with this email.");
        return;
    }

    let newPassword = prompt("Enter a new password (8+ characters, 1 symbol):");
    if (!/[!@#$%^&*]/.test(newPassword) || newPassword.length < 8) {
        alert("Weak password! Please try again.");
        return;
    }

    user.password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password reset successful! You can now log in.");
    window.location.href = "index.html";
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}
