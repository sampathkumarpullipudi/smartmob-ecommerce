
// ======================================
// STEP 9: ADMIN DASHBOARD
// ======================================

// Get HTML elements

const productForm = document.getElementById("product-form");

const adminProductList =
    document.getElementById("admin-product-list");

const formHeading =
    document.getElementById("form-heading");

const saveButton =
    document.getElementById("save-button");

const cancelButton =
    document.getElementById("cancel-edit");


// Get products from LocalStorage

function getProducts() {

    return JSON.parse(
        localStorage.getItem("mobiles")
    ) || [];

}


// Save products

function saveProducts(products) {

    localStorage.setItem(
        "mobiles",
        JSON.stringify(products)
    );

}


// Safely display text in HTML

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);

}


// Display all products

function displayAdminProducts() {

    const products = getProducts();

    if (products.length === 0) {

        adminProductList.innerHTML =
            "<h3>No products available!</h3>";

        return;

    }

    adminProductList.innerHTML = products.map(product => `

        <div class="admin-product-card">

            <img src="${escapeHTML(product.image)}"
                 alt="${escapeHTML(product.name)}">

            <div class="admin-product-details">

                <h3>${escapeHTML(product.name)}</h3>

                <p>Brand: ${escapeHTML(product.brand)}</p>

                <p>Price: ₹${product.price.toLocaleString("en-IN")}</p>

                <button class="edit-btn" data-id="${product.id}">
                    Edit
                </button>

                <button class="delete-btn" data-id="${product.id}">
                    Delete
                </button>

            </div>

        </div>

    `).join("");

}


// Add or update product


// ==========================================
// ADD OR UPDATE PRODUCT
// ==========================================

productForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let products = getProducts();

    const name =
        document.getElementById("mobile-name").value.trim();

    const brand =
        document.getElementById("mobile-brand").value.trim();

    const category =
        document.getElementById("mobile-category").value;

    const price =
        Number(document.getElementById("mobile-price").value);

    const oldPrice =
        Number(document.getElementById("mobile-old-price").value);

    const image =
        document.getElementById("mobile-image").value.trim();

    if (!name || !brand || !category || !image ||
        price <= 0 || oldPrice <= 0) {

        alert("Please enter valid product details!");
        return;
    }

    const editingId = productForm.dataset.editingId;

    if (editingId) {

        // Update existing product

        products = products.map(product => {

            if (product.id === Number(editingId)) {

                return {
                    ...product,
                    name,
                    brand,
                    category,
                    price,
                    oldPrice,
                    discount: oldPrice > price
                        ? Math.round((oldPrice - price) / oldPrice * 100) + "%"
                        : "0%",
                    image
                };

            }

            return product;

        });

        alert("Product updated successfully!");

    } else {

        // Add new product

        const newProduct = {

            id: Date.now(),
            name,
            brand,
            category,
            price,
            oldPrice,
            discount: oldPrice > price
                ? Math.round((oldPrice - price) / oldPrice * 100) + "%"
                : "0%",
            image

        };

        products.push(newProduct);

        alert("New product added successfully!");

    }

    saveProducts(products);

    productForm.reset();

    delete productForm.dataset.editingId;

    formHeading.textContent = "Add New Mobile";

    saveButton.textContent = "Add Mobile";

    cancelButton.style.display = "none";

    displayAdminProducts();

});



// Edit and delete products

adminProductList.addEventListener("click", function(event) {

    const id = Number(event.target.dataset.id);

    if (event.target.classList.contains("delete-btn")) {

        if (!confirm("Are you sure you want to delete this mobile?")) {
            return;
        }

        let products = getProducts();

        products = products.filter(
            product => product.id !== id
        );

        saveProducts(products);

        displayAdminProducts();

        alert("Product deleted successfully!");

    }


    if (event.target.classList.contains("edit-btn")) {

        const products = getProducts();

        const product = products.find(
            item => item.id === id
        );

        if (!product) return;

        document.getElementById("mobile-name").value = product.name;

        document.getElementById("mobile-brand").value = product.brand;
        document.getElementById("mobile-category").value = product.category || "Mobiles";

        document.getElementById("mobile-price").value = product.price;

        document.getElementById("mobile-old-price").value = product.oldPrice;

        document.getElementById("mobile-image").value = product.image;

        productForm.dataset.editingId = product.id;

        formHeading.textContent = "Edit Mobile";

        saveButton.textContent = "Update Mobile";

        cancelButton.style.display = "inline-block";

        window.scrollTo(0, 0);

    }

});


// Cancel editing

cancelButton.addEventListener("click", function() {

    productForm.reset();

    delete productForm.dataset.editingId;

    formHeading.textContent = "Add New Mobile";

    saveButton.textContent = "Add Mobile";

    cancelButton.style.display = "none";

});


// Initial display

displayAdminProducts();

const adminLogout = document.getElementById("admin-logout");

if (adminLogout) {
    adminLogout.addEventListener("click", function(event) {
        event.preventDefault();

        localStorage.removeItem("adminLoggedIn");

        alert("Admin logged out successfully!");

        window.location.href = "admin-login.html";
    });
}

// ======================================
// CUSTOM SALES DATE RANGE VISIBILITY
// ======================================

const salesPeriod = document.getElementById("sales-period");
const customDateRange = document.getElementById("custom-date-range");

if (salesPeriod && customDateRange) {

    salesPeriod.addEventListener("change", function() {

        if (this.value === "custom") {
            customDateRange.style.display = "flex";
        } else {
            customDateRange.style.display = "none";
        }

    });

}


// ======================================
// ADMIN SALES STATISTICS
// ======================================

const totalRevenueElement =
    document.getElementById("total-revenue");

const totalOrdersElement =
    document.getElementById("total-orders");

const pendingOrdersElement =
    document.getElementById("pending-orders");

const deliveredOrdersElement =
    document.getElementById("delivered-orders");

const cancelledOrdersElement =
    document.getElementById("cancelled-orders");

const fromDateInput =
    document.getElementById("sales-from-date");

const toDateInput =
    document.getElementById("sales-to-date");

const applyDateButton =
    document.getElementById("apply-date-filter");


// Get orders safely
function getAdminOrders() {

    try {
        const orders = JSON.parse(
            localStorage.getItem("orders")
        );

        return Array.isArray(orders) ? orders : [];

    } catch (error) {
        return [];
    }

}


// Get local date at midnight
function getLocalDate(date) {

    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );

}


// Filter orders according to selected period
function getFilteredOrders() {

    const orders = getAdminOrders();

    const period = salesPeriod
        ? salesPeriod.value
        : "all";

    if (period === "all") {
        return orders;
    }

    const today = getLocalDate(new Date());

    let startDate;
    let endDate = new Date(today);

    if (period === "today") {

        startDate = new Date(today);

    } else if (period === "7days") {

        startDate = new Date(today);
        startDate.setDate(today.getDate() - 6);

    } else if (period === "30days") {

        startDate = new Date(today);
        startDate.setDate(today.getDate() - 29);

    } else if (period === "month") {

        startDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

    } else if (period === "year") {

        startDate = new Date(
            today.getFullYear(),
            0,
            1
        );

    } else if (period === "custom") {

        if (!fromDateInput.value || !toDateInput.value) {
            return null;
        }

        startDate = new Date(
            fromDateInput.value + "T00:00:00"
        );

        endDate = new Date(
            toDateInput.value + "T00:00:00"
        );

        if (startDate > endDate) {
            alert("From Date cannot be after To Date!");
            return null;
        }

    } else {

        return orders;

    }

    return orders.filter(order => {

        const orderDate = new Date(order.orderDate);

        if (isNaN(orderDate.getTime())) {
            return false;
        }

        const date = getLocalDate(orderDate);

        return date >= startDate && date <= endDate;

    });

}


// ======================================
// UPDATE DASHBOARD STATISTICS
// ======================================

function updateSalesStatistics() {

    if (!totalRevenueElement) return;

    const filteredOrders = getFilteredOrders();

    if (filteredOrders === null) {
        return;
    }

    let revenue = 0;
    let pending = 0;
    let delivered = 0;
    let cancelled = 0;

    filteredOrders.forEach(order => {

        const status = (order.status || "").toLowerCase();

        // Revenue excludes cancelled orders
        if (status !== "cancelled") {
            revenue += Number(order.total) || 0;
        }

        if (status === "pending" || status === "order placed") {
            pending++;
        }

        if (status === "delivered") {
            delivered++;
        }

        if (status === "cancelled") {
            cancelled++;
        }

    });

    totalRevenueElement.textContent =
        "₹" + revenue.toLocaleString("en-IN");

    totalOrdersElement.textContent =
        filteredOrders.length;

    pendingOrdersElement.textContent = pending;

    deliveredOrdersElement.textContent = delivered;

    cancelledOrdersElement.textContent = cancelled;
    const chartContent =
    document.getElementById("sales-chart-content");

if (chartContent && !chartContent.hidden) {
    drawSalesRevenueChart();
}
    displayBestSellingMobiles();

}


// ======================================
// APPLY CUSTOM DATE FILTER
// ======================================

if (applyDateButton) {

    applyDateButton.addEventListener("click", function() {

        if (!fromDateInput.value || !toDateInput.value) {

            alert("Please select both From Date and To Date.");

            return;

        }

        if (fromDateInput.value > toDateInput.value) {

            alert("From Date cannot be after To Date!");

            return;

        }

        updateSalesStatistics();

    });

}


// Update statistics when period changes

if (salesPeriod) {

    salesPeriod.addEventListener("change", function() {

        if (this.value !== "custom") {
            updateSalesStatistics();
        }

    });

}


// Initial statistics display

updateSalesStatistics();

// ======================================
// BEST SELLING MOBILES
// ======================================

function displayBestSellingMobiles() {

    const bestSellingList = document.getElementById(
        "best-selling-list"
    );

    if (!bestSellingList) return;

    const orders = getFilteredOrders();

    if (orders === null) return;

    const sales = {};

    orders.forEach(order => {

        if (order.status === "Cancelled") return;

        (order.products || []).forEach(product => {

            const name = product.name;

            if (!sales[name]) {

                sales[name] = {
                    name: name,
                    image: product.image,
                    quantity: 0
                };

            }

            sales[name].quantity += Number(product.quantity) || 0;

        });

    });

    const bestSelling = Object.values(sales)
        .sort((a, b) => b.quantity - a.quantity);

    if (bestSelling.length === 0) {

        bestSellingList.innerHTML =
            "<p>No sales available for this period.</p>";

        return;

    }

    bestSellingList.innerHTML = bestSelling.map((product, index) => `

        <div class="best-selling-card">

            <img src="${escapeHTML(product.image)}"
                 alt="${escapeHTML(product.name)}">

            <div>

                <h3>${index + 1}. ${escapeHTML(product.name)}</h3>

                <p>Units Sold: ${product.quantity}</p>

            </div>

        </div>

    `).join("");

}


// Initial display
displayBestSellingMobiles();

// ======================================
// SALES REVENUE CHART
// ======================================

function drawSalesRevenueChart() {

    const canvas = document.getElementById("sales-chart");

    if (!canvas || canvas.clientWidth === 0) return;

    const orders = getFilteredOrders();

    if (orders === null) return;

    // Calculate revenue for each date
    const dailySales = {};

    orders.forEach(order => {

        if ((order.status || "").toLowerCase() === "cancelled") {
            return;
        }

        const orderDate = new Date(order.orderDate);

        if (isNaN(orderDate.getTime())) return;

        const dateKey = [
            orderDate.getFullYear(),
            String(orderDate.getMonth() + 1).padStart(2, "0"),
            String(orderDate.getDate()).padStart(2, "0")
        ].join("-");

        dailySales[dateKey] =
            (dailySales[dateKey] || 0) + (Number(order.total) || 0);

    });

    const entries = Object.entries(dailySales)
        .sort((a, b) => a[0].localeCompare(b[0]));

    // Show the latest 14 dates with sales
    const chartData = entries.slice(-14);

    const width = canvas.clientWidth;
    const height = 320;
    const ratio = window.devicePixelRatio || 1;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    canvas.style.height = height + "px";

    const ctx = canvas.getContext("2d");

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);

    if (chartData.length === 0) {

        ctx.fillStyle = "#64748b";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";

        ctx.fillText(
            "No sales available for this period",
            width / 2,
            height / 2
        );

        return;
    }

    const left = 65;
    const right = 20;
    const top = 25;
    const bottom = 65;

    const chartWidth = width - left - right;
    const chartHeight = height - top - bottom;

    const maxValue = Math.max(
        ...chartData.map(item => item[1]),
        1
    );

    // Draw horizontal grid lines and revenue labels
    ctx.font = "11px Arial";
    ctx.textAlign = "right";
    ctx.fillStyle = "#64748b";
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i++) {

        const value = maxValue * (4 - i) / 4;
        const y = top + (chartHeight * i / 4);

        ctx.beginPath();
        ctx.moveTo(left, y);
        ctx.lineTo(width - right, y);
        ctx.stroke();

        ctx.fillText(
            "₹" + Math.round(value).toLocaleString("en-IN"),
            left - 8,
            y + 4
        );

    }

    // Draw revenue bars
    const slotWidth = chartWidth / chartData.length;
    const barWidth = Math.min(35, slotWidth * 0.55);

    chartData.forEach((item, index) => {

        const revenue = item[1];

        const barHeight =
            (revenue / maxValue) * chartHeight;

        const x =
            left + index * slotWidth + (slotWidth - barWidth) / 2;

        const y =
            top + chartHeight - barHeight;

        ctx.fillStyle = "#2563eb";

        ctx.fillRect(
            x,
            y,
            barWidth,
            barHeight
        );

        // Date labels
        const parts = item[0].split("-");

        ctx.fillStyle = "#64748b";
        ctx.font = "10px Arial";
        ctx.textAlign = "center";

        ctx.fillText(
            parts[2] + "/" + parts[1],
            x + barWidth / 2,
            height - 35
        );

    });

}


// ======================================
// EXPAND AND COLLAPSE REPORTS
// ======================================

document.addEventListener("click", function(event) {

    const button = event.target.closest(".report-toggle-btn");

    if (!button) return;

    const targetId = button.dataset.target;

    const content = document.getElementById(targetId);

    if (!content) return;

    const shouldOpen = content.hidden;

    content.hidden = !shouldOpen;

    button.setAttribute(
        "aria-expanded",
        String(shouldOpen)
    );

    if (targetId === "best-selling-content") {

        button.textContent = shouldOpen
            ? "Hide Best-Selling Mobiles ▲"
            : "View Best-Selling Mobiles ▼";

        if (shouldOpen) {
            displayBestSellingMobiles();
        }

    }

    if (targetId === "sales-chart-content") {

        button.textContent = shouldOpen
            ? "Hide Sales Revenue ▲"
            : "View Sales Revenue ▼";

        if (shouldOpen) {
            drawSalesRevenueChart();
        }

    }
    

});
    if (targetId === "monthly-sales-content") {

        button.textContent = shouldOpen
            ? "Hide Monthly Sales ▲"
            : "View Monthly Sales ▼";

        if (shouldOpen) {
            displayMonthlySales();
        }

    }

// Redraw chart when browser size changes
window.addEventListener("resize", function() {

    const chartContent =
        document.getElementById("sales-chart-content");

    if (chartContent && !chartContent.hidden) {
        drawSalesRevenueChart();
    }

});
// ======================================
// EXPORT SALES REPORT AS CSV
// ======================================


// ======================================
// EXPORT FILTERED SALES REPORT AS CSV
// ======================================

const exportSalesButton =
    document.getElementById("export-sales-btn");

if (exportSalesButton) {

    exportSalesButton.addEventListener("click", function() {

        // Get orders using the selected date filter
        const orders = getFilteredOrders();

        if (orders === null) {
            alert("Please select a valid date range.");
            return;
        }

        if (orders.length === 0) {
            alert("No orders found for the selected period.");
            return;
        }

        const headers = [
            "Order ID",
            "Order Date",
            "Customer Name",
            "Email",
            "Phone",
            "Delivery Address",
            "City",
            "PIN Code",
            "Products",
            "Total Amount",
            "Payment Method",
            "Status"
        ];

        const rows = orders.map(order => [

            order.orderId,
            order.orderDate,
            order.customer?.name || "",
            order.customer?.email || "",
            order.customer?.phone || "",
            order.customer?.address || "",
            order.customer?.city || "",
            order.customer?.pincode || "",

            (order.products || [])
                .map(product =>
                    `${product.name} x ${product.quantity}`
                )
                .join("; "),

            order.total,
            order.paymentMethod,
            order.status

        ]);

        // Convert values into CSV format
        const csvEscape = value =>
            '"' + String(value ?? "").replace(/"/g, '""') + '"';

        const csvContent = [
            headers,
            ...rows
        ]
        .map(row => row.map(csvEscape).join(","))
        .join("\n");

        // Create downloadable CSV file
        const blob = new Blob(
            ["\uFEFF" + csvContent],
            { type: "text/csv;charset=utf-8;" }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "SmartMob-Sales-Report.csv";

        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(url);

        alert(
            "Sales report exported successfully!\n" +
            "Total orders: " + orders.length
        );

    });

}
