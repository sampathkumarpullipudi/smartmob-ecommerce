
// ==========================================
// SMARTMOB - MAIN JAVASCRIPT
// STEP 4: MOBILE PRODUCT DETAILS
// ==========================================

const defaultMobiles = [
    {
        id: 1,
        name: "iPhone 17",
        brand: "Apple",
        price: 79999,
        oldPrice: 89999,
        discount: "11%",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500"
    },
    {
        id: 2,
        name: "Samsung Galaxy S25",
        brand: "Samsung",
        price: 74999,
        oldPrice: 84999,
        discount: "12%",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    },
    {
        id: 3,
        name: "OnePlus 13",
        brand: "OnePlus",
        price: 69999,
        oldPrice: 79999,
        discount: "13%",
        image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500"
    },
    {
        id: 4,
        name: "Redmi Note 14 Pro",
        brand: "Redmi",
        price: 24999,
        oldPrice: 29999,
        discount: "17%",
        image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=500"
    }
];


// ==========================================
// LOAD PRODUCTS FROM LOCALSTORAGE
// ==========================================

let mobiles = [];

try {
    const savedMobiles = JSON.parse(localStorage.getItem("mobiles"));

    if (Array.isArray(savedMobiles) && savedMobiles.length > 0) {
        mobiles = savedMobiles;
    } else {
        mobiles = defaultMobiles;
        localStorage.setItem("mobiles", JSON.stringify(defaultMobiles));
    }
} catch (error) {
    mobiles = defaultMobiles;
    localStorage.setItem("mobiles", JSON.stringify(defaultMobiles));
}


// ==========================================
// STEP 5: GET HTML ELEMENTS
// ==========================================

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const brandFilter = document.getElementById("brand-filter");
const sortPrice = document.getElementById("sort-price");
const categoryFilter = document.getElementById("category-filter");
const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
// Customer rating filter
const ratingFilter = document.getElementById("rating-filter");

// ==========================================
// STEP 5: DISPLAY PRODUCTS
// ==========================================

function displayProducts(products) {

    if (!productList) return;

    if (products.length === 0) {
        productList.innerHTML = `
    <div class="no-products-message">
        <div class="no-products-icon">🛍️</div>
<h3>No Products Found!</h3>
<p>Sorry, we couldn't find any products matching your search.</p>
<p>Try changing your search or filters.</p>
    </div>
`;
        return;
    }

    productList.innerHTML = products.map(mobile => `

        <div class="product-card">

            <!-- Wishlist Heart Icon -->

            <button class="wishlist-btn wishlist-icon"
                    data-id="${mobile.id}">
                ♡
            </button>

            <!-- Product Image and Name -->

            <a href="product-details.html?id=${mobile.id}"
               class="product-details-link">

                <img src="${mobile.image}" alt="${mobile.name}">

                <h3>${mobile.name}</h3>

            </a>

            <!-- Product Price -->

            <p class="price">
                ₹${mobile.price.toLocaleString("en-IN")}
            </p>

            <p class="old-price">
                ₹${mobile.oldPrice.toLocaleString("en-IN")}
            </p>

            <p class="discount">
                ${mobile.discount} OFF
            </p>

            <!-- Add to Cart -->

            <button class="add-cart" data-id="${mobile.id}">
                Add to Cart
            </button>

        </div>

    `).join("");


    // Display filled heart for wishlist products

    const wishlist = JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];

    productList.querySelectorAll(".wishlist-btn").forEach(button => {

        const id = Number(button.dataset.id);

        if (wishlist.some(item => item.id === id)) {
            button.innerHTML = "♥";
            button.classList.add("active");
        }

    });

}


// ==========================================
// STEP 5: SEARCH, FILTER AND SORT
// ==========================================
// ==========================================
// SEARCH, FILTER AND SORT
// ==========================================


function filterProducts() {
    let filtered = [...mobiles];

    // SEARCH
    const searchValue = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    filtered = filtered.filter(mobile =>
        (mobile.name || "").toLowerCase().includes(searchValue) ||
        (mobile.brand || "").toLowerCase().includes(searchValue) ||
        (mobile.category || "Mobiles").toLowerCase().includes(searchValue)
    );

    // BRAND FILTER
    if (brandFilter && brandFilter.value !== "all") {
        filtered = filtered.filter(mobile =>
            mobile.brand === brandFilter.value
        );
    }

    // CATEGORY FILTER
    if (categoryFilter && categoryFilter.value !== "all") {
        filtered = filtered.filter(mobile =>
            (mobile.category || "Mobiles") === categoryFilter.value
        );
    }

    // MINIMUM PRICE
    if (minPriceInput && minPriceInput.value !== "") {
        const minPrice = Number(minPriceInput.value);

        filtered = filtered.filter(mobile =>
            mobile.price >= minPrice
        );
    }

    // MAXIMUM PRICE
    if (maxPriceInput && maxPriceInput.value !== "") {
        const maxPrice = Number(maxPriceInput.value);

        filtered = filtered.filter(mobile =>
            mobile.price <= maxPrice
        );
    }

    // CUSTOMER RATING
    if (ratingFilter && ratingFilter.value !== "all") {
        const selectedRating = Number(ratingFilter.value);

        filtered = filtered.filter(mobile => {
            let reviews = [];

            try {
                reviews = JSON.parse(
                    localStorage.getItem("reviews_" + mobile.id)
                ) || [];
            } catch (error) {
                reviews = [];
            }

            if (!Array.isArray(reviews) || reviews.length === 0) {
                return false;
            }

            const ratings = reviews
                .map(review => Number(review.rating))
                .filter(rating =>
                    Number.isFinite(rating) &&
                    rating >= 1 &&
                    rating <= 5
                );

            if (ratings.length === 0) return false;

            const averageRating =
                ratings.reduce((sum, rating) => sum + rating, 0) /
                ratings.length;

            return averageRating >= selectedRating;
        });
    }

    // PRICE SORTING
    if (sortPrice && sortPrice.value === "low-high") {
        filtered.sort((a, b) => a.price - b.price);

    } else if (sortPrice && sortPrice.value === "high-low") {
        filtered.sort((a, b) => b.price - a.price);
    }

    // DISPLAY FILTERED PRODUCTS
    displayProducts(filtered);
}



// ==========================================
// FILTER EVENT LISTENERS
// ==========================================

if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
}
// CLEAR SEARCH TEXT BUTTON

const clearSearchInput = document.getElementById("clear-search-input");

if (searchInput && clearSearchInput) {

    searchInput.addEventListener("input", function () {
        clearSearchInput.style.display =
            searchInput.value.trim() !== "" ? "block" : "none";
    });

    clearSearchInput.addEventListener("click", function () {
        searchInput.value = "";
        clearSearchInput.style.display = "none";
        filterProducts();
        searchInput.focus();
    });

}

if (brandFilter) {
    brandFilter.addEventListener("change", filterProducts);
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", filterProducts);
}

if (sortPrice) {
    sortPrice.addEventListener("change", filterProducts);
}

if (minPriceInput) {
    minPriceInput.addEventListener("input", filterProducts);
}

if (maxPriceInput) {
    maxPriceInput.addEventListener("input", filterProducts);
}

if (ratingFilter) {
    ratingFilter.addEventListener("change", filterProducts);
}

// CLEAR ALL SEARCH AND FILTER OPTIONS
const clearSearchButton = document.getElementById("clear-search");

if (clearSearchButton) {
    clearSearchButton.addEventListener("click", function () {

        if (searchInput) searchInput.value = "";

        if (brandFilter) brandFilter.selectedIndex = 0;

        // RESET CATEGORY FILTER
        if (categoryFilter) categoryFilter.selectedIndex = 0;

        if (minPriceInput) minPriceInput.value = "";

        if (maxPriceInput) maxPriceInput.value = "";

        if (ratingFilter) ratingFilter.selectedIndex = 0;

        if (sortPrice) sortPrice.selectedIndex = 0;

        // Hide search clear button
        const clearSearchInput = document.getElementById("clear-search-input");
        if (clearSearchInput) clearSearchInput.style.display = "none";

        filterProducts();
    });
}



// ==========================================
// CLEAR FILTERS
// ==========================================

const clearFilters = document.getElementById("clear-filters");

if (clearFilters) {
    clearFilters.addEventListener("click", function() {
        if (searchInput) searchInput.value = "";
        if (brandFilter) brandFilter.value = "all";
        if (sortPrice) sortPrice.value = "default";
        if (minPriceInput) minPriceInput.value = "";
        if (maxPriceInput) maxPriceInput.value = "";
        if (ratingFilter) ratingFilter.value = "all";
        

        filterProducts();
    });
}


// ==========================================
// DISPLAY PRODUCTS WHEN PAGE LOADS
// ==========================================

displayProducts(mobiles);


// ==========================================
// STEP 6: ADD TO CART
// ==========================================


 // ==========================================
 // FLOATING CART ICON
 // ==========================================

function updateFloatingCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = cart.reduce(
        (total, item) => total + Number(item.quantity || 1),
        0
    );

    let floatingCart = document.getElementById("floating-cart");

    if (totalItems === 0) {
        if (floatingCart) floatingCart.remove();
        return;
    }

    if (!floatingCart) {
        floatingCart = document.createElement("a");
        floatingCart.id = "floating-cart";
        floatingCart.href = "cart.html";
        floatingCart.className = "floating-cart";

        floatingCart.innerHTML = `
            <span class="floating-cart-icon">🛒</span>
            <span class="floating-cart-count">0</span>
        `;

        document.body.appendChild(floatingCart);
    }

    floatingCart.querySelector(".floating-cart-count").textContent = totalItems;
}


// ==========================================
// STEP 6: ADD TO CART
// ==========================================

if (productList) {

    productList.addEventListener("click", function(event) {

        const button = event.target.closest(".add-cart");

        if (!button) return;

        const productId = Number(button.dataset.id);

        const selectedProduct = mobiles.find(
            mobile => mobile.id === productId
        );

        if (!selectedProduct) return;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingProduct = cart.find(
            item => item.id === productId
        );

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                ...selectedProduct,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        // Immediately update floating cart
        updateFloatingCart();

        alert(selectedProduct.name + " added to cart!");

    });

}


// Show cart icon when page loads
updateFloatingCart();

// Update if cart changes in another browser tab
window.addEventListener("storage", updateFloatingCart);


// ==========================================
// FLOATING CART ICON
// ==========================================

function updateFloatingCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = cart.reduce(
        (total, item) => total + Number(item.quantity || 1),
        0
    );

    let floatingCart = document.getElementById("floating-cart");

    if (totalItems === 0) {

        if (floatingCart) {
            floatingCart.remove();
        }

        return;
    }

    if (!floatingCart) {

        floatingCart = document.createElement("a");

        floatingCart.id = "floating-cart";
        floatingCart.href = "cart.html";
        floatingCart.className = "floating-cart";

        floatingCart.innerHTML = `
            <span class="floating-cart-icon">🛒</span>
            <span class="floating-cart-count">0</span>
        `;

        document.body.appendChild(floatingCart);
    }

    floatingCart.querySelector(".floating-cart-count").textContent =
        totalItems;
}

// Show cart icon when page loads
updateFloatingCart();

// Update cart icon when cart changes in another tab
window.addEventListener("storage", updateFloatingCart);



// ==========================================
// STEP 7: WISHLIST FUNCTIONALITY
// ==========================================

if (productList) {

    productList.addEventListener("click", function(event) {

        const button = event.target.closest(".wishlist-btn");

        if (!button) return;

        const productId = Number(button.dataset.id);

        const selectedProduct = mobiles.find(
            mobile => mobile.id === productId
        );

        if (!selectedProduct) return;

        let wishlist = JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];

        const existingProduct = wishlist.find(
            item => item.id === productId
        );


        if (existingProduct) {

            // Remove from wishlist

            wishlist = wishlist.filter(
                item => item.id !== productId
            );

            button.innerHTML = "♡";
            button.classList.remove("active");

        } else {

            // Add to wishlist

            wishlist.push(selectedProduct);

            button.innerHTML = "♥";
            button.classList.add("active");

        }


        // Save wishlist

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );
        updateFloatingCart();

    });

}
// ==================================
// STEP 23: USER NAVIGATION
// ==================================

// ==================================
// STEP 23: USER NAVIGATION
// ==================================

const userNav = document.getElementById("user-nav");
const welcomeUser = document.getElementById("welcome-user");

const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if (loggedInUser) {

    // Display welcome message inside Hero section
    if (welcomeUser) {
        welcomeUser.textContent =
            "Welcome, " + loggedInUser.name;
    }

    // Display profile and logout in navigation
    if (userNav) {
        userNav.innerHTML = `
            <a href="profile.html">My Profile</a>
            <a href="#" id="nav-logout">Logout</a>
        `;

        document.getElementById("nav-logout")
            .addEventListener("click", function(event) {

                event.preventDefault();

                localStorage.removeItem("loggedInUser");

                window.location.href = "index.html";
            });
    }

} else {

    if (welcomeUser) {
        welcomeUser.textContent = "";
    }

    if (userNav) {
        userNav.innerHTML = `
            <a href="login.html">Login</a>
        `;
    }
}