function startCountdown(seconds, elementId, callback) {
    let countdownElement = document.getElementById(elementId) || null;
    if (countdownElement){
        countdownElement.textContent = seconds+"s";
    }

    //!!! Chance that this setting will not succeed! 

    const intervalId = setInterval(() => {
        seconds--;  // Decrease the seconds
        countdownElement = document.getElementById(elementId);
        if (!countdownElement) {
            clearInterval(intervalId);
        } else if (seconds <= 0){
            callback();
            clearInterval(intervalId);
        }

        countdownElement.textContent = seconds+"s";  // Update the display
    }, 1000);  // Update every 1000 milliseconds (1 second)
}