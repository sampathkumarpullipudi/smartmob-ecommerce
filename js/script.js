
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
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxBSZ2w_sigLkNTbrYzLFcYloZd-Q4oKl40bXj_1eMcg&s=10"
    },
    {
        id: 2,
        name: "Samsung Galaxy S25 Ultra",
        brand: "Samsung",
        price: 74999,
        oldPrice: 84999,
        discount: "12%",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsoz1DrG9DQdYzP98F8nGGr1eEYyHswLOCaaRTkI4vVA&s=10"
    },
    {
        id: 3,
        name: "OnePlus 13",
        brand: "OnePlus",
        price: 88800,
        oldPrice: 130000,
        discount: "13%",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXaKRkFc1ufPQrFHm-dFwJ6MVetMpbs63mmiHw3BLKng&s=10"
    },
    {
        id: 4,
        name: "Redmi Note 14 Pro",
        brand: "Redmi",
        price: 24999,
        oldPrice: 29999,
        discount: "17%",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ57icbvOdXAEmcWIZaSJAOKb9-iaa35H0mmSIiG_zaIQ&s=10"
    },
    {
        id: 5,
        name: "Google Pixel 9",
        brand: "Google",
        category: "Mobiles",
        price: 59999,
        oldPrice: 69999,
        discount: "14%",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR32KB_9P87c3FTpIgKoV8kWxRjxd4k3Gj-loo9ptyDg&s=10"
    },
    {
        id: 6,
        name: "Samsung Galaxy Z Flip",
        brand: "Samsung",
        category: "Mobiles",
        price: 89999,
        oldPrice: 99999,
        discount: "10%",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuIH_dAIrKFZYR392X_Oqub2GvqFyhCpqSNd5yAE-PbA&s=10"
    },
    {
        id: 7,
        name: "Vivo V40 Pro",
        brand: "Vivo",
        category: "Mobiles",
        price: 39999,
        oldPrice: 44999,
        discount: "11%",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgqOF5bVRYnc5LG1kpCFBv6_aVlKtyMqZZTvQR3HiZXQ&s=10"
    },
    {
        id: 8,
        name: "Realme X7 Max 5G",
        brand: "Realme",
        category: "Mobiles",
        price: 21999,
        oldPrice: 34999,
        discount: "14%",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR52UoYn5r8ayR7KY1gU8rcr3BBxwZFREkN342csZh9EA&s=10"
    },
    {
        id: 9,
        name: "Realme Buds Air 6",
        brand: "Realme",
        category: "Earbuds",
        price: 2999,
        oldPrice: 3999,
        discount: "25%",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9qF4Wcg5ejkMS-o7wNfcVUVFefxqFMPQwwQKycQIkrw&s=10"
    },
    {
        id: 10,
        name: "OnePlus Buds 3",
        brand: "OnePlus",
        category: "Earbuds",
        price: 5499,
        oldPrice: 6499,
        discount: "15%",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRecSDxJ-v90H8h-CYG-WpzvX6z71em80hEmpsvfovY8w&s"
    },
    {
        id: 11,
        name: "boAt Airdopes 141",
        brand: "boAt",
        category: "Earbuds",
        price: 999,
        oldPrice: 1999,
        discount: "35%",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr-0f8vsgQ8dIl_Iuqw6ApV9yHpFj8jUDcH0CtK6qLLg&s"
    },
    {
        id: 12,
        name: "Samsung Galaxy Watch 8",
        brand: "Samsung",
        category: "Smartwatches",
        price: 27999,
        oldPrice: 33999,
        discount: "17%",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEA_-fQa8BlqTytsQZ9rbB4RXyKOI83tx1xuNlU6x1SA&s=10"
    },
    {
        id: 13,
        name: "Noise ColorFit Pro",
        brand: "Noise",
        category: "Smartwatches",
        price: 2499,
        oldPrice: 3499,
        discount: "29%",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsXYtuIHeZW7gRs61A0e8khJhRtUVExUAOuWMzjTp6_w&s=10"
    },
    {
        id: 14,
        name: "boAt Storm Smartwatch",
        brand: "boAt",
        category: "Smartwatches",
        price: 1999,
        oldPrice: 2999,
        discount: "33%",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaA2zjpbOcErkCI59Is_fRaKl4hmQD9oyS_fiMBBhTWw&s=10"
    },
    {
        id: 15,
        name: "Redmi Power Bank 4i",
        brand: "Redmi",
        category: "Power Banks",
        price: 2499,
        oldPrice: 2999,
        discount: "17%",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHhMA6Y-ZjqXkBIdWDjgNf-rRcO95l6e8J2ZF2DA1_CA&s=10"
    },
    {
        id: 16,
        name: "Realme SuperDart Type-C ",
        brand: "Reamlme",
        category: "Chargers",
        price: 599,
        oldPrice: 799,
        discount: "25%",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUnMV-tllSs5kxij1kduBJ7XKbbCz_uxnzT0gPcFhnAg&s=10"
    },
    {
        id: 17,
        name: "Apple AirPods MAX 2",
        brand: "Apple",
        category: "Headphones",
        price: 74999,
        oldPrice: 84999,
        discount: "17%",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdbGLBOPjA9wzTCV3j9ev1SqbnQrZ3IBg-Qv4fgx59Bw&s=100"
    },
    {
        id: 18,
        name: "JBL Go 4",
        brand: "JBL",
        category: "Speakers",
        price: 3499,
        oldPrice: 4499,
        discount: "22%",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZMrWJPjP9rJgePO7qukHEhA0B-9rwWWdwNOT1vR-zJg&s=10"
    },
    {
        id: 19,
        name: "Realme Buds T310",
        brand: "Realme",
        category: "Earbuds",
        price: 1799,
        oldPrice: 2499,
        discount: "28%",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXouCZMsn6TtD7UCVbzI_539XOw014mP7coT0feFWKzQ&s=10"
    }
];



// ==========================================
// LOAD PRODUCTS FROM LOCALSTORAGE
// ==========================================


let mobiles = [];

try {
    const savedMobiles = JSON.parse(localStorage.getItem("mobiles"));

    if (Array.isArray(savedMobiles)) {

        mobiles = [...savedMobiles];

        // Add new default products that are not already saved
        defaultMobiles.forEach(defaultProduct => {

            const alreadyExists = mobiles.some(
                mobile => Number(mobile.id) === Number(defaultProduct.id)
            );

            if (!alreadyExists) {
                mobiles.push(defaultProduct);
            }

        });

    } else {

        mobiles = [...defaultMobiles];

    }

    localStorage.setItem("mobiles", JSON.stringify(mobiles));

} catch (error) {

    mobiles = [...defaultMobiles];

    localStorage.setItem("mobiles", JSON.stringify(mobiles));

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
const clearFiltersButton = document.getElementById("clear-filters");

function resetAllFilters() {
    if (searchInput) searchInput.value = "";

    if (brandFilter) brandFilter.value = "all";
    if (categoryFilter) categoryFilter.value = "all";
    if (sortPrice) sortPrice.value = "default";

    if (minPriceInput) minPriceInput.value = "";
    if (maxPriceInput) maxPriceInput.value = "";

    if (ratingFilter) ratingFilter.value = "all";

    // Update the visible custom dropdown labels
    [brandFilter, categoryFilter, sortPrice, ratingFilter]
        .forEach(select => {
            if (select) {
                select.dispatchEvent(
                    new Event("change", { bubbles: true })
                );
            }
        });

    const clearSearchInput =
        document.getElementById("clear-search-input");

    if (clearSearchInput) {
        clearSearchInput.style.display = "none";
    }

    filterProducts();
}

if (clearSearchButton) {
    clearSearchButton.addEventListener("click", resetAllFilters);
}

if (clearFiltersButton) {
    clearFiltersButton.addEventListener("click", resetAllFilters);
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

    let cart = getSmartMobCart();

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
            <span class="floating-cart-icon">
    <svg width="32" height="32"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         stroke-width="1.8"
         stroke-linecap="round"
         stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
</span>
<span class="floating-cart-label">Cart</span>
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

        let cart = getSmartMobCart();

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

        saveSmartMobCart(cart);
        // Animate product image flying to cart
animateProductToCart(selectedProduct.image);

        // Immediately update floating cart
        updateFloatingCart();

        

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

    let cart = getSmartMobCart();

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
            <span class="floating-cart-icon">
    <svg width="32" height="32"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         stroke-width="1.8"
         stroke-linecap="round"
         stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
</span>
<span class="floating-cart-label">Cart</span>
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
// Homepage product scroll-reveal animation
document.addEventListener("DOMContentLoaded", () => {
    const productCards = document.querySelectorAll(".product-card");

    if (!("IntersectionObserver" in window)) {
        productCards.forEach(card => card.classList.add("show-card"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show-card");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    productCards.forEach(card => {
        card.classList.add("reveal-card");
        observer.observe(card);
    });
});

/* ==========================================
   SMARTMOB CUSTOM DOWNWARD DROPDOWNS
========================================== */

(function () {
    const dropdownIds = [
        "brand-filter",
        "category-filter",
        "sort-price"
    ];

    const wrappers = [];

    const style = document.createElement("style");

    
style.textContent = `
    .smartmob-dropdown {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        z-index: 20;
    }

    .smartmob-dropdown-trigger {
        width: 100%;
        min-height: 60px;
        padding: 0 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        background: white;
        color: #172554;
        border: 1px solid #d9e2f0;
        border-radius: 14px;
        font: inherit;
        font-size: 16px;
        cursor: pointer;
        transition: .25s ease;
    }

    .smartmob-dropdown-trigger:hover,
    .smartmob-dropdown.open .smartmob-dropdown-trigger {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37,99,235,.12);
    }

    .smartmob-dropdown-arrow {
        width: 9px;
        height: 9px;
        border-right: 2px solid currentColor;
        border-bottom: 2px solid currentColor;
        transform: rotate(45deg);
        transition: .2s ease;
    }

    .smartmob-dropdown.open .smartmob-dropdown-arrow {
        transform: rotate(225deg);
    }

    .smartmob-dropdown-menu {
        display: none;
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        width: 100%;
        max-height: 260px;
        overflow-y: auto;
        padding: 6px;
        margin: 0;
        list-style: none;
        box-sizing: border-box;
        background: white;
        border: 1px solid #dbe3ef;
        border-radius: 12px;
        box-shadow: 0 12px 28px rgba(0,0,0,.18);
        z-index: 99999;
    }

    .smartmob-dropdown.open .smartmob-dropdown-menu {
        display: block;
        animation: dropdownSlideDown .2s ease;
    }

    @keyframes dropdownSlideDown {
        from {
            opacity: 0;
            transform: translateY(-8px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .smartmob-dropdown-option {
        width: 100%;
        display: block;
        padding: 11px 12px;
        border: none;
        border-radius: 7px;
        background: white;
        color: #172554;
        text-align: left;
        font: inherit;
        cursor: pointer;
    }

    .smartmob-dropdown-option:hover,
    .smartmob-dropdown-option.selected {
        background: #eaf1ff;
        color: #1d4ed8;
    }

    .smartmob-original-select {
        display: none !important;
    }

    /* DARK MODE */
    html[data-theme="dark"] .smartmob-dropdown-trigger {
        background: #1f2937 !important;
        color: #f9fafb !important;
        border-color: #4b5563 !important;
    }

    html[data-theme="dark"] .smartmob-dropdown-menu {
        background: #1f2937 !important;
        border-color: #4b5563 !important;
    }

    html[data-theme="dark"] .smartmob-dropdown-option {
        background: #1f2937 !important;
        color: #f9fafb !important;
    }

    html[data-theme="dark"] .smartmob-dropdown-option:hover,
    html[data-theme="dark"] .smartmob-dropdown-option.selected {
        background: #374151 !important;
        color: #60a5fa !important;
    }
        /* DARK MODE - DROPDOWN SCROLLBAR */

html[data-theme="dark"] .smartmob-dropdown-menu {
    scrollbar-width: thin;
    scrollbar-color: #64748b #1f2937;
}

html[data-theme="dark"] .smartmob-dropdown-menu::-webkit-scrollbar {
    width: 9px;
}

html[data-theme="dark"] .smartmob-dropdown-menu::-webkit-scrollbar-track {
    background: #1f2937;
    border-radius: 10px;
}

html[data-theme="dark"] .smartmob-dropdown-menu::-webkit-scrollbar-thumb {
    background: #64748b;
    border-radius: 10px;
}

html[data-theme="dark"] .smartmob-dropdown-menu::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}
`;


    document.head.appendChild(style);

    function closeDropdowns(except) {
        wrappers.forEach(wrapper => {
            if (wrapper !== except) {
                wrapper.classList.remove("open");
            }
        });
    }

    dropdownIds.forEach(id => {
        const select = document.getElementById(id);

        if (!select) return;

        const wrapper = document.createElement("div");
        wrapper.className = "smartmob-dropdown";

        const originalWidth =
            select.getBoundingClientRect().width;

        wrapper.style.width =
            originalWidth + "px";

        const trigger = document.createElement("button");
        trigger.type = "button";
        trigger.className = "smartmob-dropdown-trigger";

        const label = document.createElement("span");

        const arrow = document.createElement("span");
        arrow.className = "smartmob-dropdown-arrow";

        trigger.append(label, arrow);

        const menu = document.createElement("div");
        menu.className = "smartmob-dropdown-menu";

        function updateMenu() {
            label.textContent =
                select.options[select.selectedIndex].text;

            menu.innerHTML = "";

            Array.from(select.options).forEach((option, index) => {
                const button = document.createElement("button");

                button.type = "button";
                button.className = "smartmob-dropdown-option";
                button.textContent = option.text;
                
                if (index === select.selectedIndex) {
                    button.classList.add("selected");
                }

                button.addEventListener("click", () => {
                    select.selectedIndex = index;

                    // Keep existing filtering and sorting working
                    select.dispatchEvent(
                        new Event("change", { bubbles: true })
                    );

                    updateMenu();
                    wrapper.classList.remove("open");
                });

                menu.appendChild(button);
            });
        }

        trigger.addEventListener("click", () => {
            const shouldOpen =
                !wrapper.classList.contains("open");

            closeDropdowns(wrapper);

            wrapper.classList.toggle("open", shouldOpen);
        });

        select.addEventListener("change", updateMenu);

        select.parentNode.insertBefore(wrapper, select);

        wrapper.appendChild(trigger);
        wrapper.appendChild(menu);
        wrapper.appendChild(select);

        select.classList.add("smartmob-original-select");

        updateMenu();

        wrappers.push(wrapper);
    });

    document.addEventListener("click", event => {
        if (!event.target.closest(".smartmob-dropdown")) {
            closeDropdowns();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeDropdowns();
        }
    });

})();
