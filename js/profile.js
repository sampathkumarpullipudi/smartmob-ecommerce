
// ==================================
// SMARTMOB - USER PROFILE
// PROFILE EDITING, ADDRESSES AND LOGOUT
// ==================================

let loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

const profileName = document.getElementById("profile-name");
const profileEmail = document.getElementById("profile-email");

const editButton = document.getElementById("edit-profile-btn");
const editForm = document.getElementById("edit-profile-form");

const editName = document.getElementById("edit-name");
const editEmail = document.getElementById("edit-email");

const cancelButton = document.getElementById("cancel-edit-btn");
const logoutButton = document.getElementById("logout-btn");
const message = document.getElementById("profile-message");

const addressForm = document.getElementById("address-form");
const addressList = document.getElementById("saved-address-list");
const addressMessage = document.getElementById("address-message");

const addressName = document.getElementById("address-name");
const addressPhone = document.getElementById("address-phone");
const addressLine = document.getElementById("address-line");
const addressCity = document.getElementById("address-city");
const addressState = document.getElementById("address-state");
const addressPincode = document.getElementById("address-pincode");

let editingAddressId = null;


// ==================================
// CHECK LOGIN
// ==================================

if (!loggedInUser) {

    alert("Please login first!");
    window.location.href = "login.html";

} else {

    profileName.textContent = loggedInUser.name;
    profileEmail.textContent = loggedInUser.email;

}


// ==================================
// ADDRESS STORAGE
// ==================================

function getAddressKey() {
    return "addresses_" + loggedInUser.email.toLowerCase();
}

function getAddresses() {
    try {
        const addresses = JSON.parse(
            localStorage.getItem(getAddressKey())
        );

        return Array.isArray(addresses) ? addresses : [];

    } catch (error) {
        return [];
    }
}

function saveAddresses(addresses) {
    localStorage.setItem(
        getAddressKey(),
        JSON.stringify(addresses)
    );
}


// ==================================
// DISPLAY SAVED ADDRESSES
// ==================================

function displayAddresses() {

    if (!addressList || !loggedInUser) return;

    const addresses = getAddresses();

    if (addresses.length === 0) {

        addressList.innerHTML =
            "<p>No saved delivery addresses yet.</p>";

        return;
    }

    addressList.innerHTML = addresses.map(address => `

        <div class="saved-address-card">

            <h3>${escapeHTML(address.name)}
                ${address.isDefault ? " ⭐ Default Address" : ""}
            </h3>

            <p>${escapeHTML(address.phone)}</p>
            <p>${escapeHTML(address.line)}</p>
            <p>
                ${escapeHTML(address.city)},
                ${escapeHTML(address.state)} -
                ${escapeHTML(address.pincode)}
            </p>

            <button type="button"
                class="edit-address-btn"
                data-id="${address.id}">
                Edit
            </button>

            <button type="button"
                class="default-address-btn"
                data-id="${address.id}">
                Make Default
            </button>

            <button type="button"
                class="delete-address-btn"
                data-id="${address.id}">
                Delete
            </button>

        </div>

    `).join("");

}


// Escape user-entered text before displaying it as HTML
function escapeHTML(value) {

    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);

}


// ==================================
// ADD OR EDIT ADDRESS
// ==================================

if (addressForm) {

    addressForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const address = {
            id: editingAddressId || Date.now(),
            name: addressName.value.trim(),
            phone: addressPhone.value.trim(),
            line: addressLine.value.trim(),
            city: addressCity.value.trim(),
            state: addressState.value.trim(),
            pincode: addressPincode.value.trim(),
            isDefault: false
        };

        if (!/^[0-9]{10}$/.test(address.phone)) {

            addressMessage.textContent =
                "Enter a valid 10-digit mobile number.";

            addressMessage.style.color = "red";
            return;
        }

        if (!/^[0-9]{6}$/.test(address.pincode)) {

            addressMessage.textContent =
                "Enter a valid 6-digit PIN code.";

            addressMessage.style.color = "red";
            return;
        }

        let addresses = getAddresses();

        if (editingAddressId) {

            const oldAddress = addresses.find(
                item => item.id === editingAddressId
            );

            if (oldAddress) {
                address.isDefault = oldAddress.isDefault;
            }

            addresses = addresses.map(item =>
                item.id === editingAddressId ? address : item
            );

        } else {

            // First address becomes the default address
            if (addresses.length === 0) {
                address.isDefault = true;
            }

            addresses.push(address);

        }

        saveAddresses(addresses);

        addressForm.reset();
        editingAddressId = null;

        addressMessage.style.color = "green";
        addressMessage.textContent =
            "Delivery address saved successfully!";

        displayAddresses();

        const submitButton = addressForm.querySelector(
            'button[type="submit"]'
        );

        if (submitButton) {
            submitButton.textContent = "Save Address";
        }

    });

}


// ==================================
// EDIT, DELETE AND DEFAULT ADDRESS
// ==================================

if (addressList) {

    addressList.addEventListener("click", function(event) {

        const id = Number(event.target.dataset.id);

        if (!id) return;

        let addresses = getAddresses();

        // EDIT ADDRESS
        if (event.target.classList.contains("edit-address-btn")) {

            const address = addresses.find(item => item.id === id);

            if (!address) return;

            editingAddressId = id;

            addressName.value = address.name;
            addressPhone.value = address.phone;
            addressLine.value = address.line;
            addressCity.value = address.city;
            addressState.value = address.state;
            addressPincode.value = address.pincode;

            const submitButton = addressForm.querySelector(
                'button[type="submit"]'
            );

            submitButton.textContent = "Update Address";

            addressForm.scrollIntoView({
                behavior: "smooth"
            });

        }

        // DELETE ADDRESS
        if (event.target.classList.contains("delete-address-btn")) {

            if (!confirm("Are you sure you want to delete this address?")) {
                return;
            }

            addresses = addresses.filter(item => item.id !== id);

            if (!addresses.some(item => item.isDefault) && addresses.length > 0) {
                addresses[0].isDefault = true;
            }

            saveAddresses(addresses);

            addressMessage.style.color = "green";
            addressMessage.textContent = "Address deleted successfully!";

            displayAddresses();

        }

        // SET DEFAULT ADDRESS
        if (event.target.classList.contains("default-address-btn")) {

            addresses = addresses.map(item => ({
                ...item,
                isDefault: item.id === id
            }));

            saveAddresses(addresses);

            addressMessage.style.color = "green";
            addressMessage.textContent =
                "Default address updated successfully!";

            displayAddresses();

        }

    });

}


// ==================================
// EDIT PROFILE
// ==================================

if (editButton) {

    editButton.addEventListener("click", function() {

        editName.value = loggedInUser.name;
        editEmail.value = loggedInUser.email;

        editForm.style.display = "block";
        editButton.style.display = "none";

        message.textContent = "";

    });

}


// ==================================
// SAVE PROFILE CHANGES
// ==================================

if (editForm) {

    editForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const newName = editName.value.trim();
        const newEmail = editEmail.value.trim().toLowerCase();

        if (!newName || !newEmail) {

            message.style.color = "red";
            message.textContent = "Please fill in all fields.";
            return;

        }

        let users = [];

        try {
            users = JSON.parse(localStorage.getItem("users")) || [];
        } catch (error) {
            users = [];
        }

        const oldEmail = loggedInUser.email.toLowerCase();

        const emailExists = users.some(user =>
            user.email.toLowerCase() === newEmail &&
            user.email.toLowerCase() !== oldEmail
        );

        if (emailExists) {

            message.style.color = "red";
            message.textContent = "This email is already registered!";
            return;

        }

        const userIndex = users.findIndex(user =>
            user.email.toLowerCase() === oldEmail
        );

        if (userIndex === -1) {

            message.style.color = "red";
            message.textContent = "User account not found!";
            return;

        }

        users[userIndex].name = newName;
        users[userIndex].email = newEmail;

        localStorage.setItem("users", JSON.stringify(users));

        // Move saved addresses if the email changes
        if (oldEmail !== newEmail) {

            const oldKey = "addresses_" + oldEmail;
            const newKey = "addresses_" + newEmail;

            const oldAddresses = localStorage.getItem(oldKey);

            if (oldAddresses !== null) {
                localStorage.setItem(newKey, oldAddresses);
                localStorage.removeItem(oldKey);
            }

        }

        loggedInUser.name = newName;
        loggedInUser.email = newEmail;

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(loggedInUser)
        );

        profileName.textContent = newName;
        profileEmail.textContent = newEmail;

        editForm.style.display = "none";
        editButton.style.display = "block";

        message.style.color = "green";
        message.textContent = "Profile updated successfully!";

    });

}


// ==================================
// CANCEL PROFILE EDITING
// ==================================

if (cancelButton) {

    cancelButton.addEventListener("click", function() {

        editForm.style.display = "none";
        editButton.style.display = "block";

        message.textContent = "";

    });

}


// ==================================
// LOGOUT
// ==================================

if (logoutButton) {

    logoutButton.addEventListener("click", function() {

        localStorage.removeItem("loggedInUser");

        alert("You have logged out successfully!");

        window.location.href = "index.html";

    });

}


// ==================================
// INITIAL DISPLAY
// ==================================

if (loggedInUser) {
    displayAddresses();
}
