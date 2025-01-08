// Wait for the entire page to load
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    preloader.style.opacity = "0"; // Fade out effect
    setTimeout(() => {
        preloader.style.display = "none"; // Hide preloader completely
    }, 500); // Matches fade-out duration
});

// Set the target launch date
const launchDate = new Date("2025-02-10T00:00:00").getTime();

// Track previous values to prevent unnecessary animations
let previousValues = {
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
};

// Function to animate number change
const animateNumberChange = (element, newValue, key) => {
    if (previousValues[key] !== newValue) { // Only animate if the value changes
        element.classList.add("animate");
        setTimeout(() => {
            element.textContent = newValue;
            element.classList.remove("animate");
        }, 300); // Duration matches CSS animation
        previousValues[key] = newValue; // Update the stored value
    }
};

// Countdown function
const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update numbers with animation only when value changes
        animateNumberChange(document.getElementById("days"), days, "days");
        animateNumberChange(document.getElementById("hours"), hours.toString().padStart(2, "0"), "hours");
        animateNumberChange(document.getElementById("minutes"), minutes.toString().padStart(2, "0"), "minutes");
        animateNumberChange(document.getElementById("seconds"), seconds.toString().padStart(2, "0"), "seconds");
    } else {
        document.getElementById("countdown-timer").innerHTML = "<p>The wait is over! 🎉</p>";
    }
};

// Update countdown every second
setInterval(updateCountdown, 1000);
