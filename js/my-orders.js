
// ======================================
// CUSTOMER ORDER HISTORY
// ======================================

// Safely display customer-entered text
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}


// ======================================
// DISPLAY CUSTOMER ORDERS
// ======================================

function displayMyOrders() {

    const ordersContainer =
        document.getElementById("customer-orders");

    if (!ordersContainer) return;

    let orders = [];

    try {
        orders = JSON.parse(localStorage.getItem("orders")) || [];
    } catch (error) {
        orders = [];
    }

    let loggedInUser = null;

    try {
        loggedInUser = JSON.parse(
            localStorage.getItem("loggedInUser")
        );
    } catch (error) {
        loggedInUser = null;
    }

    if (!loggedInUser) {

        ordersContainer.innerHTML = `
            <h3>Please login to view your orders.</h3>
            <a href="login.html">Login Now</a>
        `;

        return;
    }

    // Show only logged-in customer's orders
    const userOrders = orders.filter(order =>
        order.customer?.email?.toLowerCase() ===
        loggedInUser.email?.toLowerCase()
    );

    if (userOrders.length === 0) {

        ordersContainer.innerHTML = `
            <h3>You have not placed any orders yet!</h3>
            <a href="products.html">Start Shopping</a>
        `;

        return;
    }

    ordersContainer.innerHTML = [...userOrders].reverse().map(order => {

        const products = Array.isArray(order.products)
            ? order.products
            : Array.isArray(order.items)
                ? order.items
                : [];

        return `

        <div class="order-card">

            <!-- 1. ORDER ID -->

            <div class="compact-order-header">

                <h2>
                    Order ID: ${escapeHTML(order.orderId)}
                </h2>

                <span class="order-status ${escapeHTML(
                    (order.status || "").toLowerCase().replace(/\s+/g, '-')
                )}">
                    ${escapeHTML(order.status)}
                </span>

            </div>


            <!-- 2. PRODUCTS ORDERED -->

            <div class="customer-ordered-products">

                <h3>Products Ordered</h3>

                ${
                    products.length > 0
                    ?
                    products.map(product => {

                        const quantity =
                            Number(product.quantity) || 1;

                        const price =
                            Number(product.price) || 0;

                        const subtotal =
                            price * quantity;

                        return `

                        <div class="customer-order-product">

                            <img
                                src="${escapeHTML(product.image || '')}"
                                alt="${escapeHTML(product.name || 'Product')}"
                                class="customer-order-product-image">

                            <div class="customer-order-product-info">

                                <h4>
                                    ${escapeHTML(product.name || "Product name unavailable")}
                                </h4>

                                <p>Quantity: ${quantity}</p>

                                <p>
                                    Price: ₹${price.toLocaleString("en-IN")}
                                </p>

                                <p>
                                    Subtotal:
                                    ₹${subtotal.toLocaleString("en-IN")}
                                </p>

                            </div>

                        </div>

                        `;

                    }).join("")
                    :
                    "<p>Product details are not available for this order.</p>"
                }

            </div>


            <!-- 3. DATE, TOTAL AND PAYMENT -->

            <div class="order-summary-information">

                <p>
                    <strong>Date:</strong>
                    ${escapeHTML(order.orderDate)}
                </p>

                <p>
                    <strong>Total:</strong>
                    ₹${Number(order.total || 0).toLocaleString("en-IN")}
                </p>

                <p>
                    <strong>Payment:</strong>
                    ${escapeHTML(order.paymentMethod)}
                </p>

            </div>


            <!-- 4. ORDER DETAILS BUTTON -->

            <button
                type="button"
                class="view-order-details-btn"
                data-id="${escapeHTML(order.orderId)}"
                aria-expanded="false">
                Delivery Details ▼
            </button>


            <!-- EXPANDABLE DELIVERY DETAILS -->

            <div class="order-details-content"
                 id="details-${escapeHTML(order.orderId)}"
                 hidden>

                <div class="order-delivery-details">

                    <h3>Delivery Details</h3>

                    <p>
                        <strong>Customer Name:</strong>
                        ${escapeHTML(order.customer?.name || "Not available")}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${escapeHTML(order.customer?.email || "Not available")}
                    </p>

                    <p>
                        <strong>Mobile:</strong>
                        ${escapeHTML(order.customer?.phone || "Not available")}
                    </p>

                    <p>
                        <strong>Delivery Address:</strong>
                        ${escapeHTML(order.customer?.address || "Not available")}
                    </p>

                    <p>
                        <strong>City:</strong>
                        ${escapeHTML(order.customer?.city || "Not available")}
                    </p>

                    <p>
                        <strong>PIN Code:</strong>
                        ${escapeHTML(order.customer?.pincode || "Not available")}
                    </p>

                </div>

            </div>


            <!-- CANCEL ORDER -->

            ${["Pending", "Order Placed"].includes(order.status) ? `
                <button class="cancel-order-btn"
                        data-id="${escapeHTML(order.orderId)}">
                    Cancel Order
                </button>
            ` : ""}

        </div>

        `;

    }).join("");

}


// ======================================
// ORDER DETAILS AND CANCEL BUTTONS
// ======================================

const ordersContainer =
    document.getElementById("customer-orders");

if (ordersContainer) {

    ordersContainer.addEventListener("click", function(event) {

        // OPEN OR CLOSE ORDER DETAILS

        const detailsButton = event.target.closest(
            ".view-order-details-btn"
        );

        if (detailsButton) {

            const orderId = detailsButton.dataset.id;

            const details = document.getElementById(
                "details-" + orderId
            );

            if (!details) return;

            const isExpanded = !details.hidden;

            details.hidden = isExpanded;

            detailsButton.setAttribute(
                "aria-expanded",
                String(!isExpanded)
            );

            detailsButton.textContent = isExpanded
                ? "Delivery Details ▼"
                : "Hide Delivery Details ▲";

            return;
        }


        // CANCEL CUSTOMER ORDER

        if (event.target.classList.contains("cancel-order-btn")) {

            const orderId = event.target.dataset.id;

            if (!confirm("Are you sure you want to cancel this order?")) {
                return;
            }

            let orders = [];

            try {
                orders = JSON.parse(
                    localStorage.getItem("orders")
                ) || [];
            } catch (error) {
                orders = [];
            }

            orders = orders.map(order => {

                if (
                    String(order.orderId) === String(orderId) &&
                    ["Pending", "Order Placed"].includes(order.status)
                ) {
                    return {
                        ...order,
                        status: "Cancelled"
                    };
                }

                return order;

            });

            localStorage.setItem(
                "orders",
                JSON.stringify(orders)
            );

            alert("Order cancelled successfully!");

            displayMyOrders();

        }

    });

}


// ======================================
// INITIAL DISPLAY
// ======================================

displayMyOrders();
