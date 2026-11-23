
// ======================================
// STEP 10: CHECKOUT FUNCTIONALITY
// ======================================

// Get cart data
function getCart() {
    return getSmartMobCart();
}


// Display order summary
function displayCheckout() {

    const checkoutItems =
        document.getElementById("checkout-items");

    const checkoutTotal =
        document.getElementById("checkout-total");

    const cart = getCart();

    if (cart.length === 0) {

        checkoutItems.innerHTML =
            "<h3>Your cart is empty!</h3>";

        checkoutTotal.textContent = "0";

        document.querySelector(".place-order-btn").disabled = true;

        return;

    }

    let total = 0;

    checkoutItems.innerHTML = cart.map(item => {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        return `

            <div class="checkout-item">

                <img src="${item.image}" alt="${item.name}">

                <div>

                    <h3>${item.name}</h3>

                    <p>Quantity: ${item.quantity}</p>

                    <p>Price: ₹${subtotal.toLocaleString("en-IN")}</p>

                </div>

            </div>

        `;

    }).join("");

    checkoutTotal.textContent =
        total.toLocaleString("en-IN");

}


// Place order
const checkoutForm =
    document.getElementById("checkout-form");

checkoutForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const cart = getCart();

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    const name =
        document.getElementById("customer-name").value.trim();

    const email =
        document.getElementById("customer-email").value.trim();

    const phone =
        document.getElementById("customer-phone").value.trim();

    const address =
        document.getElementById("customer-address").value.trim();

    const city =
        document.getElementById("customer-city").value.trim();

    const pincode =
        document.getElementById("customer-pincode").value.trim();

    const payment =
        document.querySelector('input[name="payment"]:checked').value;

    // Calculate total
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // Create order
    const order = {

        orderId: "SM" + Date.now(),

        customer: {
            name,
            email,
            phone,
            address,
            city,
            pincode
        },

        products: cart,

        total: total,

        paymentMethod: payment,

        orderDate: new Date().toLocaleString(),

        status: "Order Placed"

    };

    // Save order
    let orders = JSON.parse(
        localStorage.getItem("orders")
    ) || [];

    orders.push(order);

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    // Clear shopping cart
    clearSmartMobCart();

    // Display confirmation
    alert(
        "Order placed successfully!\n" +
        "Order ID: " + order.orderId
    );

    // Open confirmation page
    window.location.href =
        "order-success.html?orderId=" +
        encodeURIComponent(order.orderId);

});


// Fill customer details from logged-in account
const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if (loggedInUser) {
    document.getElementById("customer-name").value =
        loggedInUser.name || "";

    document.getElementById("customer-email").value =
        loggedInUser.email || "";
}

// ======================================
// LOAD SAVED DELIVERY ADDRESSES
// ======================================

const savedAddressSelect = document.getElementById(
    "saved-address-select"
);

if (loggedInUser && savedAddressSelect) {

    const addressKey =
        "addresses_" + loggedInUser.email.toLowerCase();

    let savedAddresses = [];

    try {
        savedAddresses = JSON.parse(
            localStorage.getItem(addressKey)
        ) || [];
    } catch (error) {
        savedAddresses = [];
    }

    // Add saved addresses to dropdown

    savedAddresses.forEach(address => {

        const option = document.createElement("option");

        option.value = address.id;

        option.textContent =
            address.name + " - " +
            address.city + " (" +
            address.pincode + ")" +
            (address.isDefault ? " - Default" : "");

        savedAddressSelect.appendChild(option);

    });

    // Automatically select default address

    const defaultAddress = savedAddresses.find(
        address => address.isDefault
    );

    if (defaultAddress) {
        savedAddressSelect.value = defaultAddress.id;
        fillDeliveryAddress(defaultAddress);
    }

    // Fill checkout fields when customer selects an address

    savedAddressSelect.addEventListener("change", function() {

        const selectedAddress = savedAddresses.find(
            address => String(address.id) === this.value
        );

        if (selectedAddress) {

            fillDeliveryAddress(selectedAddress);

        } else {

            document.getElementById("customer-phone").value = "";
            document.getElementById("customer-address").value = "";
            document.getElementById("customer-city").value = "";
            document.getElementById("customer-pincode").value = "";

        }

    });

}


// ======================================
// FILL DELIVERY INFORMATION
// ======================================

function fillDeliveryAddress(address) {

    document.getElementById("customer-name").value =
        address.name || "";

    document.getElementById("customer-phone").value =
        address.phone || "";

    document.getElementById("customer-address").value =
        [address.line, address.state].filter(Boolean).join(", ");

    document.getElementById("customer-city").value =
        address.city || "";

    document.getElementById("customer-pincode").value =
        address.pincode || "";

}
// Initial display
displayCheckout();

