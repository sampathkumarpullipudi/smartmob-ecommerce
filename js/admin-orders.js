
// ======================================
// STEP 11: ADMIN ORDER MANAGEMENT
// ======================================


// DISPLAY CUSTOMER ORDERS

function displayAdminOrders() {

    const ordersContainer =
        document.getElementById("admin-orders-list");

    if (!ordersContainer) return;

    const orders = JSON.parse(
        localStorage.getItem("orders")
    ) || [];

    if (orders.length === 0) {

        ordersContainer.innerHTML =
            "<h3>No customer orders available!</h3>";

        return;

    }

    ordersContainer.innerHTML = [...orders].reverse().map(order => {

        // Get products from the order
        const products = order.items || order.products || [];

        return `

        <div class="admin-order-card">

            <h2>Order ID: ${order.orderId}</h2>

            <p><strong>Customer:</strong>
                ${order.customer.name}
            </p>

            <p><strong>Email:</strong>
                ${order.customer.email}
            </p>

            <p><strong>Phone:</strong>
                ${order.customer.phone}
            </p>

            <p><strong>Address:</strong>
                ${order.customer.address},
                ${order.customer.city} -
                ${order.customer.pincode}
            </p>


            <!-- PRODUCTS ORDERED -->

            <div class="admin-ordered-products">

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

                        <div class="admin-ordered-product">

                            <img
                                src="${product.image || ''}"
                                alt="${product.name || 'Product'}"
                                class="admin-order-product-image">

                            <div class="admin-order-product-details">

                                <h4>
                                    ${product.name || 'Product name unavailable'}
                                </h4>

                                <p>
                                    Quantity: ${quantity}
                                </p>

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


            <p><strong>Total:</strong>
                ₹${Number(order.total || 0).toLocaleString("en-IN")}
            </p>

            <p><strong>Current Status:</strong>
                ${order.status}
            </p>


            <!-- UPDATE ORDER STATUS -->

            <label>Update Order Status:</label>

            <select class="order-status-select"
                    data-id="${order.orderId}">

                <option value="Pending"
                    ${order.status === "Pending" ? "selected" : ""}>
                    Pending
                </option>

                <option value="Order Placed"
                    ${order.status === "Order Placed" ? "selected" : ""}>
                    Order Placed
                </option>

                <option value="Shipped"
                    ${order.status === "Shipped" ? "selected" : ""}>
                    Shipped
                </option>

                <option value="Delivered"
                    ${order.status === "Delivered" ? "selected" : ""}>
                    Delivered
                </option>

                <option value="Cancelled"
                    ${order.status === "Cancelled" ? "selected" : ""}>
                    Cancelled
                </option>

            </select>

        </div>

        `;

    }).join("");

}


// ======================================
// UPDATE ORDER STATUS
// ======================================

document.getElementById("admin-orders-list")
.addEventListener("change", function(event) {

    if (event.target.classList.contains("order-status-select")) {

        const orderId = event.target.dataset.id;

        const newStatus = event.target.value;

        let orders = JSON.parse(
            localStorage.getItem("orders")
        ) || [];

        orders = orders.map(order => {

            if (String(order.orderId) === String(orderId)) {

                return {
                    ...order,
                    status: newStatus
                };

            }

            return order;

        });

        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );

        alert("Order status updated successfully!");

        displayAdminOrders();

    }

});


// ======================================
// INITIAL DISPLAY
// ======================================

displayAdminOrders();
