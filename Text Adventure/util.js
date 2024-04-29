function startCountdown(seconds, elementId, callback, update) {
    let countdownElement = document.getElementById(elementId);
    if (countdownElement !== null){
        countdownElement.textContent = seconds+"s";
    }

    // Beware DOM update delays!

    const intervalId = setInterval(() => {
        seconds--;  // Decrease the seconds
        if (update != null){
            update();
        }
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

function requestAudio(req){
    // Format for req {src,slot, priorty, loop}
    if (req.slot == "Panel"){
        console.log("Function requestAudio is not implemented yet.") 
    } else {
        console.log("Function requestAudio is not implemented yet.")
    }
}