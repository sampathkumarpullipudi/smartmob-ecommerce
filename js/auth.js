
// ==================================
// SMARTMOB - AUTHENTICATION
// SIGNUP, LOGIN AND PASSWORD VISIBILITY
// ==================================

// Safely get registered users
function getUsers() {
    try {
        const users = JSON.parse(localStorage.getItem("users"));
        return Array.isArray(users) ? users : [];
    } catch (error) {
        return [];
    }
}


// ==================================
// SIGNUP FUNCTIONALITY
// ==================================

const signupForm = document.getElementById("signup-form");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("signup-name").value.trim();
        const email = document.getElementById("signup-email").value.trim().toLowerCase();
        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const message = document.getElementById("signup-message");

        message.textContent = "";
        message.style.color = "red";

        if (!name || !email || !password || !confirmPassword) {
            message.textContent = "Please fill in all fields.";
            return;
        }

        if (password.length < 6) {
            message.textContent = "Password must contain at least 6 characters.";
            return;
        }

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match!";
            return;
        }

        let users = getUsers();

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            message.textContent = "Email already registered!";
            return;
        }

        users.push({
            name: name,
            email: email,
            password: password
        });

        localStorage.setItem("users", JSON.stringify(users));

        message.style.color = "green";
        message.textContent = "Registration successful!";

        alert("Registration successful!");

        window.location.href = "login.html";

    });

}


// ==================================
// LOGIN FUNCTIONALITY
// ==================================

const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("login-email").value.trim().toLowerCase();
        const password = document.getElementById("login-password").value;
        const message = document.getElementById("login-message");

        message.textContent = "";
        message.style.color = "red";

        const users = getUsers();

        const validUser = users.find(user =>
            user.email === email && user.password === password
        );

        if (validUser) {

            localStorage.setItem("loggedInUser", JSON.stringify({
                name: validUser.name,
                email: validUser.email
            }));

            alert("Login successful!");

            window.location.href = "index.html";

        } else {

            message.textContent = "Invalid email or password!";

        }

    });

}


// ==================================
// SHOW / HIDE PASSWORD
// ==================================

document.querySelectorAll(".toggle-password").forEach(button => {

    button.addEventListener("click", function() {

        const targetId = this.dataset.target;
        const passwordInput = document.getElementById(targetId);

        if (!passwordInput) return;

        if (passwordInput.type === "password") {

            passwordInput.type = "text";
            this.textContent = "🙈";

        } else {

            passwordInput.type = "password";
            this.textContent = "👁";

        }

    });

});
