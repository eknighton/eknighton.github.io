function startCountdown() {
    let seconds = 10;  // Duration of the countdown in seconds
    const countdownElement = document.getElementById('countdown');

    const intervalId = setInterval(() => {
        seconds--;  // Decrease the seconds
        countdownElement.textContent = seconds;  // Update the display

        if (seconds <= 0) {
            clearInterval(intervalId);  // Stop the countdown
            countdownElement.textContent = "Time's up!";  // Display final message
            // You can add any action you want to perform after the countdown ends
        }
    }, 1000);  // Update every 1000 milliseconds (1 second)
}