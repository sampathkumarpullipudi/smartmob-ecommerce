
/* SMARTMOB - ACCOUNT-SPECIFIC WISHLIST STORAGE */

function getSmartMobWishlistKey() {
    let user = null;

    try {
        user = JSON.parse(localStorage.getItem("loggedInUser"));
    } catch (error) {
        user = null;
    }

    if (user && user.email) {
        return "wishlist_user_" + user.email.trim().toLowerCase();
    }

    return "wishlist_guest";
}

function getSmartMobWishlist() {
    try {
        const wishlist = JSON.parse(
            localStorage.getItem(getSmartMobWishlistKey())
        );

        return Array.isArray(wishlist) ? wishlist : [];
    } catch (error) {
        return [];
    }
}

function saveSmartMobWishlist(wishlist) {
    localStorage.setItem(
        getSmartMobWishlistKey(),
        JSON.stringify(Array.isArray(wishlist) ? wishlist : [])
    );

    window.dispatchEvent(new Event("smartmob-wishlist-updated"));
}
