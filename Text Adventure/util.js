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
            countdowns = countdowns.filter(item => item !== intervalId);
        } else if (seconds <= 0){
            clearInterval(intervalId);
            callback();
            countdowns = countdowns.filter(item => item !== intervalId);
        } else {
            countdownElement.textContent = seconds+"s";  // Update the display
        }

    }, 1000);  // Update every 1000 milliseconds (1 second)

    countdowns.push(intervalId);
}

function requestAudio(req){
    // Format for req {src,slot, priorty, loop}
    if (req.slot == "Panel"){
        console.log("Function requestAudio is not implemented yet.") 
    } else {
        console.log("Function requestAudio is not implemented yet.")
    }
}

function concatItems(player){
    let text = ""
    player.items.forEach(item => {
        text = text + item.html;
    }
    );
    return text;
}