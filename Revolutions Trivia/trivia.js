let questionsPool = [];
let selectedQuestions = []; // Store selected questions globally


window.alert("A 3+ player trivia game.\nGet a notepad to keep score.\nPlay on one device, pass device at end of turn.\nPlayers can only make one answer attempt each round.");
async function fetchQuestions() {
    const response = await fetch('https://opentdb.com/api.php?amount=100&type=multiple&difficulty=easy');
    const data = await response.json();
    questionsPool = data.results.map(question => ({
        question: decodeHtml(question.question),
        answer: question.correct_answer
    }));
}

function drawQuestions() {
    if (questionsPool.length < 4) {
        alert("Not enough questions left!");
        return;
    }

    selectedQuestions = []; // Reset for new draw
    for (let i = 0; i < 4; i++) {
        const index = Math.floor(Math.random() * questionsPool.length);
        selectedQuestions.push(questionsPool.splice(index, 1)[0]);
    }

    // Display only the questions on buttons
    document.getElementById("question1").textContent = selectedQuestions[0].question;
    document.getElementById("question2").textContent = selectedQuestions[1].question;
    document.getElementById("question3").textContent = selectedQuestions[2].question;
    document.getElementById("question4").textContent = selectedQuestions[3].question;
    document.getElementById("question-area").style.display = "block";
    document.getElementById("draw-button").style.display = "none";
    document.getElementById("end-turn-button").style.display = "block";
    document.getElementById("prompt").innerText = "Pick a question to ask the others. You get a point if at least one of them gets it right, but beware- whichever one gets it right will also get a point!";

}

function selectQuestion(selectedIndex) {
    // Display the selected question with its answer and hide others
    const selectedQuestion = selectedQuestions[selectedIndex - 1];
    const selectedButton = document.getElementById(`question${selectedIndex}`);
    selectedButton.textContent = `${selectedQuestion.question} (Answer: ${selectedQuestion.answer})`;

    // Hide all buttons except the selected one
    for (let i = 1; i <= 4; i++) {
        if (i !== selectedIndex) {
            document.getElementById(`question${i}`).style.display = "none";
        }
    }
    document.getElementById("prompt").innerText = "Ask the question! The first other player to get it right receives 1 point. You get a point if anyone else gets it right.";

}

function endTurn() {
    // Reset for the next player
    document.getElementById("question-area").style.display = "none";
    document.getElementById("end-turn-button").style.display = "none";
    document.getElementById("draw-button").style.display = "block";
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`question${i}`).style.display = "block";
    }
    document.getElementById("prompt").innerText = "Pass the device, or start a turn.";
}

function decodeHtml(html) {
    // Converts HTML entities to their corresponding characters
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

window.onload = fetchQuestions;
