
// ======================================
// SMARTMOB PROFILE PICTURE MANAGEMENT
// ======================================


// Get the logged-in customer's storage key
function getProfilePictureKey() {

    let user = null;

    try {
        user = JSON.parse(
            localStorage.getItem("loggedInUser")
        );
    } catch (error) {
        user = null;
    }

    if (!user || !user.email) {
        return null;
    }

    return "profilePicture_" + user.email.toLowerCase();

}


// Default profile picture
const defaultProfilePicture =
    "https://i.pravatar.cc/150?img=12";


// Get saved profile picture
function getSavedProfilePicture() {

    const key = getProfilePictureKey();

    if (!key) return defaultProfilePicture;

    return localStorage.getItem(key) || defaultProfilePicture;

}


// Update profile picture circles on the page
function updateHeaderProfilePicture() {

    const picture =
        getSavedProfilePicture();

    const headerPicture =
        document.getElementById("header-profile-picture");

    if (headerPicture) {
        headerPicture.src = picture;
    }

}


// ======================================
// PROFILE PICTURE PAGE
// ======================================

const picturePreview =
    document.getElementById("picture-preview");

const avatarOptions =
    document.querySelectorAll(".avatar-option");

const uploadInput =
    document.getElementById("upload-picture");

const saveButton =
    document.getElementById("save-profile-picture");


let selectedPicture = getSavedProfilePicture();


// Display current picture
if (picturePreview) {
    picturePreview.src = selectedPicture;
}


// Highlight selected default avatar
avatarOptions.forEach(button => {

    if (button.dataset.image === selectedPicture) {
        button.classList.add("selected");
    }

});


// ======================================
// SELECT DEFAULT AVATAR
// ======================================

avatarOptions.forEach(button => {

    button.addEventListener("click", function() {

        selectedPicture = this.dataset.image;

        picturePreview.src = selectedPicture;

        avatarOptions.forEach(option => {
            option.classList.remove("selected");
        });

        this.classList.add("selected");

        // Clear uploaded file selection
        if (uploadInput) {
            uploadInput.value = "";
        }

    });

});


// ======================================
// UPLOAD PICTURE FROM DEVICE
// ======================================

if (uploadInput) {

    uploadInput.addEventListener("change", function() {

        const file = this.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            this.value = "";
            return;
        }

        // Limit image size to 1 MB
        if (file.size > 1024 * 1024) {
            alert("Please select an image smaller than 1 MB.");
            this.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function(event) {

            selectedPicture = event.target.result;

            picturePreview.src = selectedPicture;

            avatarOptions.forEach(option => {
                option.classList.remove("selected");
            });

        };

        reader.readAsDataURL(file);

    });

}


// ======================================
// SAVE PROFILE PICTURE
// ======================================

if (saveButton) {

    saveButton.addEventListener("click", function() {

        const key = getProfilePictureKey();

        if (!key) {
            alert("Please login before changing your profile picture.");
            window.location.href = "login.html";
            return;
        }

        try {

            localStorage.setItem(
                key,
                selectedPicture
            );

            alert("Profile picture updated successfully!");

            window.location.href = "profile.html";

        } catch (error) {

            alert(
                "Unable to save this picture. Please choose a smaller image."
            );

        }

    });

}


// ======================================
// UPDATE PROFILE CIRCLE ON EVERY PAGE
// ======================================

updateHeaderProfilePicture();
