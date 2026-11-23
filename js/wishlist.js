
// STEP 7: DISPLAY WISHLIST PRODUCTS

// Get wishlist data
function getWishlist() {
    return getSmartMobWishlist();
}

// Display wishlist products
function displayWishlist() {
    const wishlistItems = document.getElementById("wishlist-items");

    if (!wishlistItems) return;

    const wishlist = getWishlist();

    // Check empty wishlist
    if (wishlist.length === 0) {
        wishlistItems.innerHTML = `
    <div class="empty-wishlist">

        <div class="empty-wishlist-icon">
            <span>♡</span>
        </div>

        <h2>Your Wishlist is Waiting!</h2>

        <p>
            You haven't saved any products yet.
            Explore our collection and save your favourites here.
        </p>

        <a href="products.html" class="browse-mobiles-btn">
            <span>Explore Mobiles</span>
            <span>→</span>
        </a>

        <div class="empty-wishlist-note">
            ❤️ Your favourite products, all in one place!
        </div>

    </div>
`;

return;
        return;
    }

    // Display products
    wishlistItems.innerHTML = wishlist.map(mobile => `
        <div class="product-card wishlist-card">

            <!-- Wishlist Heart Icon -->
            <button
                class="wishlist-heart-icon"
                type="button"
                onclick="removeWishlist(${Number(mobile.id)})"
                aria-label="Remove from wishlist"
                title="Remove from wishlist">
                ♥
            </button>

            <!-- Clickable Product Image and Name -->
            <a href="product-details.html?id=${encodeURIComponent(mobile.id)}"
               class="product-details-link">

                <img src="${mobile.image}" alt="${mobile.name}">

                <h3>${mobile.name}</h3>

            </a>

            <!-- Product Price -->
            <p class="price">
                ₹${Number(mobile.price).toLocaleString("en-IN")}
            </p>

            <!-- Add to Cart -->
            <button
                class="wishlist-cart"
                type="button"
                onclick="addWishlistToCart(${Number(mobile.id)})">

                Add to Cart

            </button>

        </div>
    `).join("");
}

// Remove product from wishlist
function removeWishlist(id) {
    let wishlist = getWishlist();

    wishlist = wishlist.filter(
        mobile => Number(mobile.id) !== Number(id)
    );

    saveSmartMobWishlist(wishlist);

    displayWishlist();
}

// Add wishlist product to account-specific cart

// Add wishlist product to cart with fly-to-cart animation
function addWishlistToCart(id) {

    const wishlist = getWishlist();

    const product = wishlist.find(
        mobile => Number(mobile.id) === Number(id)
    );

    if (!product) return;

    let cart = getSmartMobCart();

    const existingProduct = cart.find(
        item => Number(item.id) === Number(id)
    );

    if (existingProduct) {
        existingProduct.quantity =
            (Number(existingProduct.quantity) || 1) + 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    // Save to the correct user's cart
    saveSmartMobCart(cart);

    // Update the floating cart icon and item count
    updateMiniCartIcon();

    // Animate the product image into the cart
    if (typeof animateProductToCart === "function") {
        animateProductToCart(product.image);
    }

}


// Initial display
displayWishlist();
