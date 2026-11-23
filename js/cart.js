/* STEP 6: DISPLAY CART PRODUCTS */

// Get cart data for the currently logged-in user
function getCart() {
    return getSmartMobCart();
}


// Display cart products
function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    let cart = getCart();

    // Empty cart check
    if (cart.length === 0) {
        cartItems.innerHTML = "<h3>Your cart is empty!</h3>";
        cartTotal.textContent = "0";
        return;
    }

    let total = 0;

    cartItems.innerHTML = cart.map(item => {

        total += item.price * item.quantity;

        return `
            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-details">

                    <h3>${item.name}</h3>

                    <p>Price: ₹${item.price.toLocaleString("en-IN")}</p>

                    <p>Quantity: ${item.quantity}</p>

                    <div class="quantity-buttons">

                        <button onclick="changeQuantity(${item.id}, -1)">
                            -
                        </button>

                        <span>${item.quantity}</span>

                        <button onclick="changeQuantity(${item.id}, 1)">
                            +
                        </button>

                    </div>

                    <button class="remove-btn"
                        onclick="removeProduct(${item.id})">
                        Remove
                    </button>

                </div>

            </div>
        `;

    }).join("");

    // Display total
    cartTotal.textContent = total.toLocaleString("en-IN");

}


// Increase or decrease quantity
function changeQuantity(id, change) {

    let cart = getCart();

    const product = cart.find(item => item.id === id);

    if (product) {

        product.quantity += change;

        // Remove product if quantity becomes zero
        if (product.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }

    }

    saveSmartMobCart(cart);

    displayCart();

}


// Remove product
function removeProduct(id) {

    let cart = getCart();

    cart = cart.filter(item => item.id !== id);

    saveSmartMobCart(cart);

    displayCart();

}


// Initial display
displayCart();