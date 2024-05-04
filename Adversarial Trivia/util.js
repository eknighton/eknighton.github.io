async function fetchQuestions(difficulty) {
    const url = `https://opentdb.com/api.php?amount=10&type=boolean&difficulty=${difficulty}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    }
}

async function loadTriviaQuestions() {
    const difficulties = ['easy', 'medium', 'hard'];
    const triviaQuestions = {};

    for (const difficulty of difficulties) {
        triviaQuestions[difficulty] = await fetchQuestions(difficulty);
    }

    console.log(triviaQuestions);
    return triviaQuestions;
}

// Load the trivia questions when needed
loadTriviaQuestions();
