
// SMARTMOB ADMIN LOGIN

const ADMIN_EMAIL = "sampathkumarpullipudi@gmail.com";
const ADMIN_PASSWORD = "Sampath@123";

const adminLoginForm = document.getElementById("admin-login-form");

if (adminLoginForm) {

    adminLoginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("admin-email").value.trim().toLowerCase();
        const password = document.getElementById("admin-password").value;

        const message = document.getElementById("admin-login-message");

        if (
            email === ADMIN_EMAIL &&
            password === ADMIN_PASSWORD
        ) {

            localStorage.setItem("adminLoggedIn", "true");

            alert("Admin login successful!");

            window.location.href = "admin.html";

        } else {

            message.textContent = "Invalid admin email or password!";
            message.style.color = "red";

        }

    });

}
