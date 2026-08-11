const bakeryItems = [
    "Country Sourdough",
    "Whole Grain Hearth Bread",
    "Soft Sandwich Loaf",
    "Weekend Pastry Box",
    "Celebration Cake"
];

const bakeryMessages = {
    "Country Sourdough": "A great choice for customers who enjoy traditional artisan bread.",
    "Whole Grain Hearth Bread": "A hearty favorite made with grains and seeds.",
    "Soft Sandwich Loaf": "A family-friendly choice for sandwiches and everyday meals.",
    "Weekend Pastry Box": "Perfect for sharing with family, friends, or coworkers.",
    "Celebration Cake": "A great choice for birthdays, showers, and special events."
};

function displayFavorite(item) {
    const favoriteMessage = document.getElementById("favorite-message");

    if (!favoriteMessage) {
        return;
    }

    favoriteMessage.textContent =
        "Your favorite is " + item + ". " + bakeryMessages[item];
}

function saveFavorite() {
    const select = document.getElementById("favorite-item");

    if (!select || select.value === "") {
        return;
    }

    const selectedItem = select.value;

    localStorage.setItem("northStarFavorite", selectedItem);
    displayFavorite(selectedItem);
}

function loadFavorite() {
    const savedFavorite = localStorage.getItem("northStarFavorite");
    const select = document.getElementById("favorite-item");

    if (savedFavorite && select && bakeryItems.includes(savedFavorite)) {
        select.value = savedFavorite;
        displayFavorite(savedFavorite);
    }
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + "-error");

    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrors() {
    const errors = document.querySelectorAll(".error-message");

    errors.forEach(function(error) {
        error.textContent = "";
    });
}

function validateForm(event) {
    const form = document.getElementById("preorder-form");

    if (!form) {
        return;
    }

    clearErrors();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const itemDetails = document.getElementById("item-details");

    let isValid = true;

    if (name.value.trim().length < 2) {
        showError("name", "Please enter at least 2 characters for your name.");
        isValid = false;
    }


    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email.value.trim())) {
    showError("email", "Please enter a valid email address.");
    isValid = false;
}

    if (itemDetails.value.trim().length < 5) {
        showError(
            "item-details",
            "Please provide at least 5 characters describing your request."
        );
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    loadFavorite();

    const favoriteButton = document.getElementById("save-favorite");

    if (favoriteButton) {
        favoriteButton.addEventListener("click", saveFavorite);
    }

    const form = document.getElementById("preorder-form");

    if (form) {
        form.addEventListener("submit", validateForm);
    }
});