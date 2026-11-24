
/* ==========================================
   SMARTMOB INTERACTIVE MINI CART
========================================== */

(function () {
    // Create the cart drawer once
    const drawerHTML = `
        <div class="mini-cart-overlay" id="mini-cart-overlay"></div>

        <aside class="mini-cart-drawer" id="mini-cart-drawer">
            <div class="mini-cart-header">
                <h2>Shopping Cart</h2>
                <button class="mini-cart-close" id="mini-cart-close"
                    aria-label="Close cart">&times;</button>
            </div>

            <div class="mini-cart-items" id="mini-cart-items"></div>

            <div class="mini-cart-footer">
                <div class="mini-cart-total">
                    <span>Total</span>
                    <span>₹<span id="mini-cart-total">0</span></span>
                </div>
                <a href="checkout.html" class="mini-cart-checkout">
                    Proceed to Checkout
                </a>
            </div>
        </aside>
    `;

    document.body.insertAdjacentHTML("beforeend", drawerHTML);

    const overlay = document.getElementById("mini-cart-overlay");
    const drawer = document.getElementById("mini-cart-drawer");
    const itemsContainer = document.getElementById("mini-cart-items");
    const totalElement = document.getElementById("mini-cart-total");

    function getCart() {
    return getSmartMobCart();
}

    function saveCart(cart) {
    saveSmartMobCart(cart);
    renderCart();

    // Update the floating cart badge
    if (typeof updateFloatingCart === "function") {
        updateFloatingCart();
    }

    updateMiniCartIcon();
}

    function formatPrice(price) {
        return Number(price).toLocaleString("en-IN");
    }

    function renderCart() {
        const cart = getCart();
        let total = 0;

        if (cart.length === 0) {
            itemsContainer.innerHTML = `
                <div class="mini-cart-empty">
                    <h3>Your cart is empty</h3>
                    <p>Add products to start shopping!</p>
                    <a href="products.html">Explore Products</a>
                </div>
            `;
        } else {
            itemsContainer.innerHTML = cart.map(item => {
                const quantity = Number(item.quantity) || 1;
                const price = Number(item.price) || 0;

                total += price * quantity;

                return `
                    <div class="mini-cart-item">
                        <img src="${item.image}" alt="${item.name}">

                        <div class="mini-cart-item-details">
                            <h3>${item.name}</h3>
                            <p class="mini-cart-price">
                                ₹${formatPrice(price)}
                            </p>

                            <div class="mini-cart-quantity">
                                <button data-action="decrease"
                                    data-id="${item.id}">−</button>

                                <span>${quantity}</span>

                                <button data-action="increase"
                                    data-id="${item.id}">+</button>
                            </div>

                            <button class="mini-cart-remove"
                                data-action="remove"
                                data-id="${item.id}">
                                Remove
                            </button>
                        </div>
                    </div>
                `;
            }).join("");
        }

        totalElement.textContent = formatPrice(total);
    }

    function openCart() {
        renderCart();
        overlay.classList.add("open");
        drawer.classList.add("open");
        document.body.classList.add("mini-cart-open");
    }

    function closeCart() {
        overlay.classList.remove("open");
        drawer.classList.remove("open");
        document.body.classList.remove("mini-cart-open");
    }

    // Open drawer by clicking floating cart icon
    document.addEventListener("click", function (event) {
        const cartButton = event.target.closest("#floating-cart");

        if (cartButton) {
            event.preventDefault();
            openCart();
        }
    });

    // Close drawer
    overlay.addEventListener("click", closeCart);
    document.getElementById("mini-cart-close")
        .addEventListener("click", closeCart);

    // Quantity and remove actions
    itemsContainer.addEventListener("click", function (event) {
        const button = event.target.closest("button[data-action]");
        if (!button) return;

        const id = Number(button.dataset.id);
        const action = button.dataset.action;
        let cart = getCart();

        const product = cart.find(item => Number(item.id) === id);

        if (action === "increase" && product) {
            product.quantity = (Number(product.quantity) || 1) + 1;
        }

        if (action === "decrease" && product) {
            product.quantity = (Number(product.quantity) || 1) - 1;

            if (product.quantity <= 0) {
                cart = cart.filter(item => Number(item.id) !== id);
            }
        }

        if (action === "remove") {
            cart = cart.filter(item => Number(item.id) !== id);
        }

        saveCart(cart);
    });

    // Close with Escape key
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeCart();
    });

    // Keep the drawer updated if another tab changes the cart
    window.addEventListener("storage", renderCart);
})();
// Animate product image flying into the cart icon
// SMARTMOB - DYNAMIC FLY TO CART ANIMATION

function animateProductToCart(imageSrc, sourceImage) {

    const cartIcon = document.getElementById("floating-cart");

    if (!cartIcon || !imageSrc || !sourceImage) return;

    // Get the actual product image position
    const startPosition = sourceImage.getBoundingClientRect();

    // Get the floating cart position
    const cartPosition = cartIcon.getBoundingClientRect();

    // Create flying product image
    const flyingImage = document.createElement("img");

    flyingImage.src = imageSrc;
    flyingImage.className = "flying-cart-product";

    document.body.appendChild(flyingImage);

    // Start exactly at the clicked product image
    Object.assign(flyingImage.style, {
        position: "fixed",
        left: startPosition.left + "px",
        top: startPosition.top + "px",
        width: startPosition.width + "px",
        height: startPosition.height + "px",
        objectFit: "contain",
        zIndex: "99999",
        pointerEvents: "none",
        transition: "left 1.2s ease, top 1.2s ease, width 1.2s ease, height 1.2s ease, opacity 1.2s ease, transform 1.2s ease"
    });

    // Animate towards the cart
    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            flyingImage.style.left =
                (cartPosition.left + cartPosition.width / 2 - 15) + "px";

            flyingImage.style.top =
                (cartPosition.top + cartPosition.height / 2 - 15) + "px";

            flyingImage.style.width = "30px";
            flyingImage.style.height = "30px";
            flyingImage.style.transform = "rotate(90deg)";
            flyingImage.style.transform = "rotate(90deg)";

        });

    });

    // Bounce cart icon
    cartIcon.classList.remove("cart-bounce");

    void cartIcon.offsetWidth;

    cartIcon.classList.add("cart-bounce");

    setTimeout(() => {
        flyingImage.remove();
    }, 850);
}
// Create and update floating cart icon
function updateMiniCartIcon() {

    let cart = getSmartMobCart();

    const totalItems = cart.reduce(
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
        <svg viewBox="0 0 24 24" width="32" height="32"
             fill="none" stroke="currentColor"
             stroke-width="1.8" stroke-linecap="round"
             stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
    </span>
    <span class="floating-cart-count">${totalItems}</span>
    <span class="floating-cart-label">Cart</span>
`;

        document.body.appendChild(floatingCart);
    } else {
        floatingCart.querySelector(".floating-cart-count").textContent =
            totalItems;
    }
}

// Display cart icon when this page loads
updateMiniCartIcon();