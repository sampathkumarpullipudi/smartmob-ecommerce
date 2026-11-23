
/* SMARTMOB - ACCOUNT-SPECIFIC CART STORAGE */

function getSmartMobCartKey() {
    let user = null;

    try {
        user = JSON.parse(localStorage.getItem("loggedInUser"));
    } catch (error) {
        user = null;
    }

    if (user && user.email) {
        return "cart_user_" + user.email.trim().toLowerCase();
    }

    return "cart_guest";
}

function getSmartMobCart() {
    try {
        const cart = JSON.parse(
            localStorage.getItem(getSmartMobCartKey())
        );

        return Array.isArray(cart) ? cart : [];
    } catch (error) {
        return [];
    }
}

function saveSmartMobCart(cart) {
    localStorage.setItem(
        getSmartMobCartKey(),
        JSON.stringify(Array.isArray(cart) ? cart : [])
    );

    window.dispatchEvent(new Event("smartmob-cart-updated"));
}

function clearSmartMobCart() {
    localStorage.removeItem(getSmartMobCartKey());

    window.dispatchEvent(new Event("smartmob-cart-updated"));
}
