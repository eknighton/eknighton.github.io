const emojiSet = ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙"];
let currentLevel = 2;
let currentScore = 0;
let maxScore = 0;
let currentEmojis = [];
let answerEmoji;
let timeout;
let canSkip = false;

const emojiContainer = document.getElementById('emoji-set');
const promptEmoji = document.getElementById('prompt-emoji');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const scoreDisplay = document.getElementById('score-display');

window.alert("Memorize the set of emojis! Tap to skip to test.");

function startLevel() {
    canSkip=false;
    if (currentLevel > 12){
        updateScoreDisplay();
        window.alert("You've finished! Your score was "+currentScore + " our of "+ maxScore);
        return
    }
    currentEmojis = chooseEmojis(currentLevel);
    emojiContainer.textContent = currentEmojis.join(' ');
    setAnswerEmoji();

    promptEmoji.style.display = 'None';
    yesBtn.style.display = 'None';
    noBtn.style.display = 'None';

    // Hide the emojis after a period or on click/tap
    timeout = setTimeout(() => {
        canSkip = false;
        emojiContainer.textContent = '';
        promptEmoji.textContent = answerEmoji;
        promptEmoji.style.display = 'Block';
        yesBtn.style.display = 'Block';
        noBtn.style.display = 'Block';
    }, 1000*currentLevel); // Adjust time as needed
    canSkip = true;

    updateScoreDisplay();
}

function chooseEmojis(number) {
    // First, create a deep copy of the emojiSet array to avoid modifying the original array
    const emojisCopy = [...emojiSet];

    // Shuffle the copy using the Fisher-Yates (Durstenfeld) shuffle algorithm for a more uniform shuffle
    for (let i = emojisCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [emojisCopy[i], emojisCopy[j]] = [emojisCopy[j], emojisCopy[i]]; // ES6 array destructuring syntax to swap elements
    }

    // Slice the first 'number' elements from the shuffled array to get a random subset
    return emojisCopy.slice(0, number);
}

function setAnswerEmoji() {
    const randomNum = Math.random();
    if (randomNum < 0.5) {
        answerEmoji = emojiSet[Math.floor(Math.random() * emojiSet.length)];
    } else {
        answerEmoji = currentEmojis[Math.floor(Math.random() * currentEmojis.length)];
    }
}


function handleResponse(isCorrect) {
    clearTimeout(timeout);
    if ((currentEmojis.includes(answerEmoji) && isCorrect) || (!currentEmojis.includes(answerEmoji) && !isCorrect)) {
        currentScore += currentLevel; // Increment score by the level number
    }
    maxScore += currentLevel; // Always increment max score by the level number
    currentLevel++;
    updateScoreDisplay();
    startLevel(); // Start the next level
}

function updateScoreDisplay() {
    scoreDisplay.textContent = `Points: ${currentScore} out of ${maxScore}`;
}

yesBtn.addEventListener('click', () => handleResponse(true));
noBtn.addEventListener('click', () => handleResponse(false));

const gameContainer = document.getElementById('game-container'); // Make sure this matches the ID of your game container

gameContainer.addEventListener('click', function(event) {
    if (event.target.id === 'yes-btn' || event.target.id === 'no-btn') {
        return;
    } else {
        skipTimeout();
    }
});

function skipTimeout() {
    if (!canSkip){
        return
    }
    clearTimeout(timeout);
    canSkip = false;
    emojiContainer.textContent = '';
    promptEmoji.textContent = answerEmoji;
    promptEmoji.style.display = 'Block';
    yesBtn.style.display = 'Block';
    noBtn.style.display = 'Block';

}

// Rest of your JavaScript code...


// Initialize the game
startLevel();
