
// STEP 7: DISPLAY WISHLIST PRODUCTS

// Get wishlist data
function getWishlist() {

    return JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];

}


// Display wishlist products
function displayWishlist() {

    const wishlistItems =
        document.getElementById("wishlist-items");

    if (!wishlistItems) return;

    let wishlist = getWishlist();

    // Check empty wishlist
    if (wishlist.length === 0) {

        wishlistItems.innerHTML =
            "<h3>Your wishlist is empty! ❤️</h3>";

        return;

    }

    // Display products
    wishlistItems.innerHTML = wishlist.map(mobile => `

        <div class="product-card wishlist-card">

            <!-- Functional Wishlist Heart Icon -->
            <button
                class="wishlist-heart-icon"
                type="button"
                onclick="removeWishlist(${mobile.id})"
                aria-label="Remove ${mobile.name} from wishlist"
                title="Remove from wishlist">

                ♥
            </button>

            <!-- Clickable Product Image and Name -->
            <a href="product-details.html?id=${mobile.id}"
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
                onclick="addWishlistToCart(${mobile.id})">

                Add to Cart

            </button>

        </div>

    `).join("");

}


// Remove product by clicking heart icon
function removeWishlist(id) {

    let wishlist = getWishlist();

    wishlist = wishlist.filter(
        mobile => mobile.id !== id
    );

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    displayWishlist();

}


// Add wishlist product to cart
function addWishlistToCart(id) {

    const wishlist = getWishlist();

    const product = wishlist.find(
        mobile => mobile.id === id
    );

    if (!product) return;

    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    const existingProduct = cart.find(
        item => item.id === id
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(product.name + " added to cart!");

}


// Initial display
displayWishlist();
