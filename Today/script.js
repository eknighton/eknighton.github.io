
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
        "What's something difficult you did today?",
        "What's a mistake you made today?",
        "What's something selfish you did today?",
        "What did you do today that you are proud of?",
        "When did you surprise yourself today?",
        "What was it like outside today?",
        "What's a problem you solved today?",
        "What kind of person were you today?",
        "What's a disagreement you had today?",
        "What couldn't you figure out today?",
        "What information did you seek out today?",
        "How did you spend your time today?",
        "What did you put off doing today?",
        "What did you plan to do today, but didn't?",
        "Was there anything today you told yourself you'd do next time?",
        "What was something beautiful you saw today?",
        "What's something you imagined today?",
        "What's something you fantasized about today?",
        "What's something you imagined having that you don't have?",
        "Today, was there anything you considered but decided wasn't worth doing?",
        "Did you talk to any friends today?",
        "What wasted your time today?",
        "What's something unusual you did today?",
        "What's something weird you did today?",
        "What's something possibly unethical you did today?",
        "What's something you questioned today?",
        "What's something you experimented with today?",
        "What's something you practiced today?",
        "What's something you studied today?",
        "What's something you made today?",
        "What's somethign you designed today?",
        "What's something you fixed today?",
        "What today was dangerous?",
        "What opportunities did you have to make new friends?",
        "How did you benefit today from humanity's collected knowledge?",
        "When were you graceful today?",
        "What did you do today that you're proud of?",
        "What did you get exactly right today?",
        "What talents did you use today?",
        "What did you do masterfully today?",
        "What were you confident of today?",
        "What didn't bother you today?",
        "When today did you take a step forward, when you should have taken a step back?",
        "When did you feel love today?",
        "What inconvenienced you today?",
        "What did you criticize today?",


        //Acheivement Pack

        //People Pack
        "What people did you see today?",

        //Learning Pack

        //Feelings Pack
        "What made you laugh today?",
        "When were you inspired today?",

        //Family Pack
        "What did the people you care about do today?",
        "What brought your loved ones joy today?",

        //Nature Pack
        "What animals did you see today?",
        "What bugs did you see today?",
        "What clouds did you see today?"

        //We can use a 2D array with followup questions?
        //We create question packs

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
