function startCountdown(seconds, elementId, callback) {
    let countdownElement = null;

    const intervalId = setInterval(() => {
        seconds--;  // Decrease the seconds
        countdownElement = document.getElementById(elementId);
        if (seconds <= 0 || !countdownElement) {
            clearInterval(intervalId);  // Stop the countdown
            callback();
        }
        countdownElement.textContent = seconds+"s";  // Update the display
    }, 1000);  // Update every 1000 milliseconds (1 second)
}