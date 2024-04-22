
document.addEventListener("DOMContentLoaded", function() {
    const quotes = [
        "What did you eat today?",
        "What surprised you today?",
        "What improbable thing happened to you today?",
        "What's the first thing you said today?",
        "What's something you learned today?",
        "What's something interesting you read or watched today?",
        "What's something you decided today?",
        "What's something you finished today?",
        "What's something you started today?",
        "What memories did you revisted today?",
        "Did you meet anyone new today? What were they like?",
        "Did you try something new today?",
        "How are you feeling today?"

    ];

    // Shuffle quotes
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // swap elements
        }
    }

    shuffleArray(quotes);
    let currentQuote = 0;

    const quoteContainer = document.getElementById('quoteContainer');

    function displayNextQuote() {
        quoteContainer.textContent = quotes[currentQuote];
        currentQuote = (currentQuote + 1) % quotes.length;
    }

    document.body.addEventListener('click', displayNextQuote);

    // Initial quote display
    displayNextQuote();
});
