let questions = [
 {
"prompt": "Which location was not mentioned in MLK's dream speech?",
"options": ["New York", "Mississippi", "Georgia", "Alabama", "Tennessee", "South Carolina", "California", "Louisiana", "Virginia"],
"answer": 6
},

{
"prompt": "Which historical figure did not attend MLK's dream speech?",
"options": ["Rosa Parks", "Jesse Jackson", "Malcolm X", "John F. Kennedy", "Lyndon B. Johnson", "Ralph Abernathy", "Andrew Young", "Mahatma Gandhi", "Medgar Evers"],
"answer": 7
},

{
"prompt": "Which broadcaster did not broadcast MLK's dream speech?",
"options": ["CBS", "NBC", "ABC", "BBC", "PBS", "CNN", "Fox News", "MSNBC", "NPR"],
"answer": 6
},

{
"prompt": "Which city did Martin Luther King never reside in?",
"options": ["Atlanta", "Montgomery", "Birmingham", "Memphis", "Selma", "Chicago", "Washington D.C.", "New York City", "Los Angeles"],
"answer": 6
},

{
"prompt": "Which is not a speech by Martin Luther King?",
"options": ["I Have a Dream", "I've Been to the Mountaintop", "Letter from Birmingham Jail", "Beyond Vietnam", "Stride Toward Freedom", "The Strength to Love", "Where Do We Go from Here: Chaos or Community?", "The Ballot or the Bullet", "A Knock at Midnight"],
"answer": 8
},

{
"prompt": "Which idea did MLK never endorse?",
"options": ["Nonviolence", "Civil Disobedience", "Racial Segregation", "Equality", "Love and Compassion", "Peaceful Protests", "Voting Rights", "Integration", "Social Justice"],
"answer": 2
},

{
"prompt": "Which expression is not attributed to Martin Luther King?",
"options": ["I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character.", "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.", "Injustice anywhere is a threat to justice everywhere.", "We shall overcome because the arc of the moral universe is long, but it bends toward justice.", "I may not get there with you, but I want you to know tonight that we as a people will get to the Promised Land.", "The ultimate measure of a man is not where he stands in moments of comfort and convenience, but where he stands at times of challenge and controversy.", "Life's most persistent and urgent question is, 'What are you doing for others?'", "Our lives begin to end the day we become silent about things that matter.", "If you can't fly, then run. If you can't run, then walk. If you can't walk, then crawl. But whatever you do, you have to keep moving forward."],
"answer": 8
},

{
"prompt": "Which is not a job held by an immediate family member of Martin Luther King?",
"options": ["Minister/Pastor", "Civil Rights Activist", "Lawyer", "Physician/Doctor", "Teacher/Educator", "Musician", "Athlete", "Author/Writer", "Business Executive"],
"answer": 6
},

{
"prompt": "Which is not a place Martin Luther King took his family on vacation?",
"options": ["Bahamas", "Jamaica", "Hawaii", "Caribbean Islands", "Mexico", "Florida", "Europe", "Africa", "Australia"],
"answer": 7
},

{
"prompt": "Which is not an honor awarded to Martin Luther King?",
"options": ["Nobel Peace Prize", "Presidential Medal of Freedom", "Congressional Gold Medal", "Time Person of the Year", "Pulitzer Prize", "Gandhi Peace Prize", "United Nations Prize in the Field of Human Rights", "NAACP Spingarn Medal", "Medal of Honor"],
"answer": 8
},

{
"prompt": "Which is not an accusation made against Martin Luther King?",
"options": ["Communist Sympathizer", "Plagiarism", "Tax Evasion", "Adultery", "Domestic Abuse", "Promoting Violence", "Radical Extremism", "Anti-Americanism", "Antisemitism"],
"answer": 4
}
];

let currentQuestion = -1;
let firstTwoOptionsDisplayed = false;
let optionsDisplayed = false;
let questionAnswered = false;

let timerInterval; // Variable to hold the timer


// Player Stats
let correct = 0;
let skipped = 0;
let bungled = 0;
let totalTime = 0;
let pickingTime = 0;
let optionsRevealed = 0;

nextQuestion();

/*window.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
         if (!firstTwoOptionsDisplayed) {
            displayFirstTwoOptions();
            firstTwoOptionsDisplayed = true;
        } else if (!optionsDisplayed) {
            displayRemainingOptions();
            optionsDisplayed = true;
        }
    }
});*/


function nextQuestion() {
    firstTwoOptionsDisplayed = false;
    optionsDisplayed = false;
    questionAnswered = false;
    let options = document.getElementsByClassName('option');
    for (let i = 0; i < options.length; i++) {
        options[i].style.display = 'none';
    }
    currentQuestion = (currentQuestion + 1) % questions.length;
    document.getElementById('prompt').textContent = questions[currentQuestion].prompt;
    displayFirstTwoOptions();
    displayRemainingOptions();
}

function displayFirstTwoOptions() {
    let options = document.getElementsByClassName('option');
    let currentOptions = questions[currentQuestion].options;
    for (let i = 0; i < 2; i++) { // only display first two options
        options[i].textContent = currentOptions[i];
        options[i].style.display = 'block';
        options[i].onclick = function() {
            checkAnswer(i);
        };
    }
}

function displayRemainingOptions() {
    let options = document.getElementsByClassName('option');
    let currentOptions = questions[currentQuestion].options;
    for (let i = 2; i < currentOptions.length; i++) { // only display remaining options
        options[i].textContent = currentOptions[i];
        options[i].style.display = 'block';
        options[i].onclick = function() {
            checkAnswer(i);
            this.blur();
        };
    }
}

function displayOptions() {
    let options = document.getElementsByClassName('option');
    let currentOptions = questions[currentQuestion].options;
    for (let i = 0; i < options.length; i++) {
        if (i < currentOptions.length) {
            options[i].textContent = currentOptions[i]; // Set the option's display text to the current question's options
            options[i].style.display = 'block'; // Show the option button HTML elements
            options[i].onclick = function() {
                checkAnswer(i);
                let text = this.textContent; // save the current text
                this.textContent = ''; // empty the button
                this.textContent = text; // restore the text
                this.blur()
            };
        } else {
            options[i].style.display = 'none'; // Hide extra buttons
        }
    }
}

function checkAnswer(index) {
    if (index === questions[currentQuestion].answer) {
        questionAnswered = true;
        correct = correct+1;
        document.getElementById("correct").textContent = correct;
        nextQuestion();
    } else {
        bungled = bungled+1;
        document.getElementById("bungled").textContent = bungled;
        alert("Wrong answer. Try again");
    }
}