function startCountdown(seconds, elementId, callback) {
    let countdownElement = document.getElementById(elementId);
    if (countdownElement !== null){
        countdownElement.textContent = seconds+"s";
    }

    // Beware DOM update delays!

    const intervalId = setInterval(() => {
        seconds--;  // Decrease the seconds
        countdownElement = document.getElementById(elementId);
        if (countdownElement === null) {
            clearInterval(intervalId);
        } else if (seconds <= 0){
            callback();
            clearInterval(intervalId);
        } else {
            countdownElement.textContent = seconds+"s";  // Update the display
        }

    }, 1000);  // Update every 1000 milliseconds (1 second)
}