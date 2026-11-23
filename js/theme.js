document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("smartmob-theme") || "light";

    document.documentElement.setAttribute("data-theme", savedTheme);

    let themeButton = document.getElementById("theme-toggle");

    // Create the toggle automatically if this page doesn't have one
    if (!themeButton) {
        themeButton = document.createElement("button");
        themeButton.id = "theme-toggle";
        themeButton.type = "button";

        const nav = document.querySelector("header nav");
        const header = document.querySelector("header");

        if (nav) {
            nav.appendChild(themeButton);
        } else if (header) {
            header.appendChild(themeButton);
        }
    }

    if (!themeButton) return;

    function updateButton(theme) {
        if (theme === "dark") {
            themeButton.textContent = "☀️";
            themeButton.setAttribute("aria-label", "Switch to light mode");
            themeButton.title = "Switch to light mode";
        } else {
            themeButton.textContent = "🌙";
            themeButton.setAttribute("aria-label", "Switch to dark mode");
            themeButton.title = "Switch to dark mode";
        }
    }

    updateButton(savedTheme);

    themeButton.addEventListener("click", () => {
        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        const newTheme = currentTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("smartmob-theme", newTheme);

        updateButton(newTheme);
    });
});