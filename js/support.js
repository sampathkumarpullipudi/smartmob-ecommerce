
/* SMARTMOB - MULTIPLE PRODUCT WHATSAPP SUPPORT */

document.addEventListener("DOMContentLoaded", function () {
    const orderSelect = document.getElementById("support-order");
    const productList = document.getElementById("support-product-list");
    const productToggle = document.getElementById("support-product-toggle");
    const issueInput = document.getElementById("support-issue");
    const whatsappLink = document.getElementById("whatsapp-support-link");

    if (!orderSelect || !productList || !productToggle || !issueInput || !whatsappLink) {
    return;
}
// Open and close the product selection dropdown
productToggle.addEventListener("click", function () {
    const isHidden = productList.hidden;

    productList.hidden = !isHidden;

    productToggle.textContent = isHidden
        ? "Hide Products ▲"
        : "Choose Products ▼";

    productToggle.setAttribute("aria-expanded", String(isHidden));
});

    let orders = [];
    let loggedInUser = null;

    try {
        orders = JSON.parse(localStorage.getItem("orders")) || [];
        loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    } catch (error) {
        orders = [];
        loggedInUser = null;
    }

    if (!loggedInUser || !loggedInUser.email) {
        orderSelect.innerHTML =
            '<option value="">Please login to view your orders</option>';
        return;
    }

    // Get only this customer's orders
    const userOrders = orders.filter(order =>
        order.customer?.email?.toLowerCase() ===
        loggedInUser.email.toLowerCase()
    );

    if (userOrders.length === 0) {
        orderSelect.innerHTML =
            '<option value="">No orders found</option>';
        return;
    }

    // Load orders
    userOrders.forEach((order, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent =
            `${order.orderId || "Order"} - ${order.orderDate || ""}`;
        orderSelect.appendChild(option);
    });

    // Load multiple product checkboxes
    orderSelect.addEventListener("change", function () {
    productList.innerHTML = "";
    productList.hidden = true;
    productToggle.textContent = "Choose Products ▼";
    productToggle.setAttribute("aria-expanded", "false");

        const selectedOrder = userOrders[Number(orderSelect.value)];

        if (!selectedOrder || orderSelect.value === "") {
            productList.innerHTML = "<p>Please select an order first.</p>";
            return;
        }

        const products = Array.isArray(selectedOrder.products)
            ? selectedOrder.products
            : Array.isArray(selectedOrder.items)
                ? selectedOrder.items
                : [];

        if (products.length === 0) {
            productList.innerHTML =
                "<p>No product details found for this order.</p>";
            return;
        }

        products.forEach((product, index) => {
    const label = document.createElement("label");
    label.className = "support-product-option";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "support-product-checkbox";
    checkbox.value = index;

    const name = document.createElement("span");
    const purchasedQty = Math.max(1, Number(product.quantity) || 1);

    name.textContent =
        `${product.name || "Product"} (Ordered: ${purchasedQty})`;

    const quantitySelect = document.createElement("select");
    quantitySelect.className = "support-issue-quantity";
    quantitySelect.disabled = true;

    for (let qty = 1; qty <= purchasedQty; qty++) {
        const option = document.createElement("option");
        option.value = qty;
        option.textContent = qty;
        quantitySelect.appendChild(option);
    }

    checkbox.addEventListener("change", function () {
        quantitySelect.disabled = !checkbox.checked;
    });

    label.appendChild(checkbox);
    label.appendChild(name);
    label.appendChild(quantitySelect);

    productList.appendChild(label);
});
    });

    // Open WhatsApp with order and selected product details
    whatsappLink.addEventListener("click", function (event) {
        event.preventDefault();

        if (orderSelect.value === "") {
            alert("Please select your order.");
            return;
        }

        const order = userOrders[Number(orderSelect.value)];

        const products = Array.isArray(order.products)
            ? order.products
            : Array.isArray(order.items)
                ? order.items
                : [];

        const selectedCheckboxes = productList.querySelectorAll(
            ".support-product-checkbox:checked"
        );

        if (selectedCheckboxes.length === 0) {
            alert("Please select at least one product.");
            return;
        }

        const selectedProducts = Array.from(selectedCheckboxes)
            .map(checkbox => products[Number(checkbox.value)])
            .filter(Boolean);

        const issue = issueInput.value.trim();

        if (!issue) {
            alert("Please describe your problem.");
            issueInput.focus();
            return;
        }

        const productDetails = selectedProducts.map((product, index) => {
            return `${index + 1}. ${product.name || "Product"}
Quantity: ${Number(product.quantity) || 1}
Price: ₹${Number(product.price || 0).toLocaleString("en-IN")}`;
        }).join("\n\n");

        const message =
`Hello SmartMob! I need help with my order.

Customer: ${order.customer?.name || loggedInUser.fullName || loggedInUser.name || loggedInUser.username || "Customer"}  
Order ID: ${order.orderId || "Not available"}
Order Date: ${order.orderDate || "Not available"}
Order Status: ${order.status || "Not available"}

Products with problems:
${productDetails}

Problem:
${issue}

Please help me resolve this issue.`;

        const whatsappURL =
            "https://wa.me/918919176160?text=" +
            encodeURIComponent(message);

        window.open(whatsappURL, "_blank");
    });
});
