
// ======================================
// SMARTMOB ADMIN PROFILE PICTURE
// ======================================

// Separate storage key for admin picture
const ADMIN_PROFILE_PICTURE_KEY = "adminProfilePicture";

// Default admin picture
const DEFAULT_ADMIN_PICTURE =
    "https://i.pravatar.cc/100?img=12";


// Get saved admin picture
function getAdminProfilePicture() {

    return localStorage.getItem(ADMIN_PROFILE_PICTURE_KEY)
        || DEFAULT_ADMIN_PICTURE;

}


// Update admin profile picture on the current page
function updateAdminProfilePicture() {

    const profileImage =
        document.getElementById("header-profile-picture");

    if (profileImage) {
        profileImage.src = getAdminProfilePicture();
    }

}


// Current picture preview
const adminPicturePreview =
    document.getElementById("admin-picture-preview");

const adminAvatarOptions =
    document.querySelectorAll(".admin-avatar-option");

const adminUploadInput =
    document.getElementById("admin-upload-picture");

const adminSaveButton =
    document.getElementById("admin-save-picture");

let selectedAdminPicture = getAdminProfilePicture();

if (adminPicturePreview) {
    adminPicturePreview.src = selectedAdminPicture;
}


// Select default avatar
adminAvatarOptions.forEach(button => {

    if (button.dataset.image === selectedAdminPicture) {
        button.classList.add("selected");
    }

    button.addEventListener("click", function() {

        selectedAdminPicture = this.dataset.image;

        adminPicturePreview.src = selectedAdminPicture;

        adminAvatarOptions.forEach(option => {
            option.classList.remove("selected");
        });

        this.classList.add("selected");

        if (adminUploadInput) {
            adminUploadInput.value = "";
        }

    });

});


// Upload picture from device
if (adminUploadInput) {

    adminUploadInput.addEventListener("change", function() {

        const file = this.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            this.value = "";
            return;
        }

        if (file.size > 1024 * 1024) {
            alert("Please select an image smaller than 1 MB.");
            this.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function(event) {

            selectedAdminPicture = event.target.result;

            adminPicturePreview.src = selectedAdminPicture;

            adminAvatarOptions.forEach(option => {
                option.classList.remove("selected");
            });

        };

        reader.readAsDataURL(file);

    });

}


// Save admin picture
if (adminSaveButton) {

    adminSaveButton.addEventListener("click", function() {

        try {

            localStorage.setItem(
                ADMIN_PROFILE_PICTURE_KEY,
                selectedAdminPicture
            );

            alert("Admin profile picture updated successfully!");

            window.location.href = "admin.html";

        } catch (error) {

            alert(
                "Unable to save this picture. Please choose a smaller image."
            );

        }

    });

}


// Update profile circle
updateAdminProfilePicture();
