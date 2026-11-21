
// ==========================================
// SMARTMOB
// STEP 12: PRODUCT DETAILS
// STEP 13: CUSTOMER REVIEWS & RATINGS
// ==========================================


// ==========================================
// STEP 1: DEFAULT MOBILE PRODUCTS
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
// STEP 2: LOAD PRODUCTS FROM LOCALSTORAGE
// ==========================================

let mobiles;

try {
    mobiles = JSON.parse(
        localStorage.getItem("mobiles")
    );
} catch (error) {
    mobiles = null;
}

if (!Array.isArray(mobiles) || mobiles.length === 0) {

    mobiles = defaultMobiles;

    localStorage.setItem(
        "mobiles",
        JSON.stringify(mobiles)
    );

}


// ==========================================
// STEP 3: GET PRODUCT ID FROM URL
// ==========================================

const urlParams = new URLSearchParams(
    window.location.search
);

const productId = Number(urlParams.get("id"));


// Find selected product

const product = mobiles.find(
    mobile => mobile.id === productId
);


// Get product details container

const productDetails =
    document.getElementById("product-details");


// ==========================================
// STEP 4: DISPLAY PRODUCT DETAILS
// ==========================================

function displayProductDetails() {

    if (!productDetails) return;

    if (!product) {

        productDetails.innerHTML = `
            <h2>Product not found!</h2>
            <a href="products.html">Back to Mobiles</a>
        `;

        return;
    }


    productDetails.innerHTML = `

        <!-- Product Information -->

        <div class="details-container">

            <div class="details-image">

                <img src="${product.image}"
                     alt="${product.name}">

            </div>


            <div class="details-info">

                <p class="details-brand">
                    ${product.brand}
                </p>

                <h1>${product.name}</h1>

                <div class="details-rating">

                    <span id="average-rating">
                        No ratings yet
                    </span>

                    <span id="review-count"></span>

                </div>

                <h2 class="details-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </h2>

                <p class="details-old-price">
                    ₹${product.oldPrice.toLocaleString("en-IN")}
                </p>

                <p class="details-discount">
                    ${product.discount} OFF
                </p>

                <p class="details-description">
                    Explore the ${product.name} from
                    ${product.brand}. Discover its features
                    and enjoy shopping with SmartMob.
                </p>

                <p class="stock-status">
                    In Stock
                </p>

                <div class="details-buttons">

                    <button class="details-cart-btn"
                            id="details-add-cart">
                        Add to Cart
                    </button>

                    <button class="buy-now-btn"
                            id="buy-now">
                        Buy Now
                    </button>

                </div>

            </div>

        </div>


        <!-- PRODUCT SPECIFICATIONS -->

        <div class="specifications">

            <h2>Product Information</h2>

            <table>

                <tr>
                    <th>Product Name</th>
                    <td>${product.name}</td>
                </tr>

                <tr>
                    <th>Brand</th>
                    <td>${product.brand}</td>
                </tr>

                <tr>
                    <th>Price</th>
                    <td>
                        ₹${product.price.toLocaleString("en-IN")}
                    </td>
                </tr>

                <tr>
                    <th>Discount</th>
                    <td>${product.discount}</td>
                </tr>

                <tr>
                    <th>Availability</th>
                    <td>In Stock</td>
                </tr>

            </table>

        </div>


        <!-- ==================================
             STEP 13: CUSTOMER REVIEWS
        ================================== -->

        <div class="reviews-section">

            <h2>Customer Reviews & Ratings</h2>


            <!-- Average Rating -->

            <div class="average-rating">

                <h3 id="review-average">
                    No ratings yet
                </h3>

                <p id="total-reviews">
                    Be the first to review!
                </p>

            </div>


            <!-- Review Form -->

            <div class="review-form">

                <h3>Write a Review</h3>

                <form id="review-form">

                    <input
                        type="text"
                        id="review-name"
                        placeholder="Your Name"
                        required
                    >

                    <label for="review-rating">
                        Select Your Rating
                    </label>

                    <select id="review-rating" required>

                        <option value="">
                            Choose Rating
                        </option>

                        <option value="5">
                            ⭐⭐⭐⭐⭐ - Excellent
                        </option>

                        <option value="4">
                            ⭐⭐⭐⭐ - Very Good
                        </option>

                        <option value="3">
                            ⭐⭐⭐ - Good
                        </option>

                        <option value="2">
                            ⭐⭐ - Average
                        </option>

                        <option value="1">
                            ⭐ - Poor
                        </option>

                    </select>

                    <textarea
                        id="review-text"
                        placeholder="Write your review..."
                        required
                    ></textarea>

                    <button type="submit">
                        Submit Review
                    </button>

                </form>

            </div>


            <!-- Customer Reviews Display -->

            <div class="customer-reviews">

                <h3>What Customers Say</h3>

                <div id="reviews-list"></div>

            </div>

        </div>

    `;


    // ======================================
    // ADD TO CART BUTTON
    // ======================================

    document.getElementById("details-add-cart")
        .addEventListener("click", function() {

            addProductToCart();

            alert(product.name + " added to cart!");

        });


    // ======================================
    // BUY NOW BUTTON
    // ======================================

    document.getElementById("buy-now")
        .addEventListener("click", function() {

            addProductToCart();

            window.location.href = "checkout.html";

        });

}


// ==========================================
// STEP 5: ADD PRODUCT TO CART
// ==========================================

function addProductToCart() {

    if (!product) return;

    let cart = [];

    try {
        cart = JSON.parse(
            localStorage.getItem("cart")
        ) || [];
    } catch (error) {
        cart = [];
    }

    const existingProduct = cart.find(
        item => item.id === product.id
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

}


// ==========================================
// STEP 6: GET PRODUCT REVIEWS
// ==========================================

function getProductReviews() {

    try {

        const reviews = JSON.parse(
            localStorage.getItem("reviews_" + productId)
        );

        return Array.isArray(reviews) ? reviews : [];

    } catch (error) {

        return [];

    }

}


// ==========================================
// STEP 7: SAFELY DISPLAY REVIEW TEXT
// ==========================================

function escapeReviewText(value) {

    return String(value).replace(/[&<>"']/g, char => ({

        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"

    })[char]);

}


// ==========================================
// STEP 8: DISPLAY CUSTOMER REVIEWS
// ==========================================

function displayReviews() {

    if (!product) return;

    const reviews = getProductReviews();

    const reviewsList =
        document.getElementById("reviews-list");

    const averageRating =
        document.getElementById("review-average");

    const totalReviews =
        document.getElementById("total-reviews");

    const detailsRating =
        document.getElementById("average-rating");

    const reviewCount =
        document.getElementById("review-count");


    // Check whether review elements exist

    if (
        !reviewsList ||
        !averageRating ||
        !totalReviews ||
        !detailsRating ||
        !reviewCount
    ) {
        return;
    }


    // Calculate average rating

    if (reviews.length > 0) {

        const totalRating = reviews.reduce(
            (sum, review) =>
                sum + Number(review.rating || 0),
            0
        );

        const average = totalRating / reviews.length;

        const roundedAverage = average.toFixed(1);


        averageRating.textContent =
            "⭐ " + roundedAverage + " / 5";

        totalReviews.textContent =
            reviews.length + " customer reviews";

        detailsRating.textContent =
            "⭐ " + roundedAverage + " / 5";

        reviewCount.textContent =
            "(" + reviews.length + " reviews)";

    } else {

        averageRating.textContent = "No ratings yet";

        totalReviews.textContent =
            "Be the first to review!";

        detailsRating.textContent = "No ratings yet";

        reviewCount.textContent = "";

    }


    // Display individual reviews

    if (reviews.length === 0) {

        reviewsList.innerHTML = `
            <p>No reviews yet. Write the first review!</p>
        `;

        return;

    }


    reviewsList.innerHTML = [...reviews].reverse().map(review => `

        <div class="review-card">

            <h4>
                ${escapeReviewText(review.name)}
            </h4>

            <p class="review-stars">
                ${"⭐".repeat(
                    Math.min(5, Math.max(0, Number(review.rating) || 0))
                )}
            </p>

            <p>
                ${escapeReviewText(review.text)}
            </p>

            <small>
                ${escapeReviewText(review.date || "")}
            </small>

        </div>

    `).join("");

}


// ==========================================
// STEP 9: SUBMIT CUSTOMER REVIEW
// ==========================================

function setupReviewForm() {

    const reviewForm =
        document.getElementById("review-form");

    if (!reviewForm || !product) return;


    reviewForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("review-name").value.trim();

        const rating =
            Number(document.getElementById("review-rating").value);

        const reviewText =
            document.getElementById("review-text").value.trim();


        // Validate review

        if (
            !name ||
            !reviewText ||
            !Number.isInteger(rating) ||
            rating < 1 ||
            rating > 5
        ) {

            alert("Please enter all review details!");

            return;

        }


        // Get existing reviews

        const reviews = getProductReviews();


        // Create new review

        const newReview = {

            name: name,

            rating: rating,

            text: reviewText,

            date: new Date().toLocaleDateString()

        };


        // Save review

        reviews.push(newReview);

        localStorage.setItem(
            "reviews_" + productId,
            JSON.stringify(reviews)
        );


        // Show success message

        alert("Thank you! Your review has been submitted.");


        // Clear form

        reviewForm.reset();


        // Update reviews and average rating

        displayReviews();

    });

}


// ==========================================
// STEP 10: INITIALIZE PAGE
// ==========================================

if (productDetails) {

    if (product) {

        // First display product and review HTML

        displayProductDetails();

        // Then attach review form functionality

        setupReviewForm();

        // Finally display saved reviews

        displayReviews();

    } else {

        productDetails.innerHTML = `
            <h2>Product not found!</h2>
            <a href="products.html">Back to Mobiles</a>
        `;

    }

}
