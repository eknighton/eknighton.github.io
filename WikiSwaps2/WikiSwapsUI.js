// Define the "Level" object with rounds information
const Level = [
    {
        words: ["The", " ", "quick", " ", "brown", " ", "fox"],
        replacements: [
            [2, "fast"],
            [4, "dark"]
        ]
    },
    {
        words: ["Jumps", " ", "over", " ", "the", " ", "lazy", " ", "dog"],
        replacements: [
            [0, "leaps"],
            [6, "sleepy"]
        ]
    }
];

function startRound(number) {
    const round = Level[number];
    const container = document.getElementById('gameContainer');
    container.innerHTML = ''; // Clear previous contents

    // Create a button for each word
    round.words.forEach((word, index) => {
        const button = document.createElement('button');
        // Check if there is a replacement for this index
        const replacement = round.replacements.find(rep => rep[0] === index);
        button.textContent = replacement ? replacement[1] : word;
        container.appendChild(button);
    });
}

// Optionally, you can load the first round on page load
window.onload = () => {
    startRound(0); // Automatically start the first round
};
