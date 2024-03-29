
 let questions = [
            { question: 'President _____ was the first President of the United States.', answer: 'George Washington', options: ['John Adams', 'Thomas Jefferson', 'James Madison', 'James Monroe'] },
            { question: 'President _____\'s plantation, Mount Vernon, is located in Virginia.', answer: 'George Washington', options: ['John Adams', 'Thomas Jefferson', 'James Madison', 'James Monroe'] },
            { question: 'President _____ served two terms in office, setting the precedent for future presidents.', answer: 'George Washington', options: ['John Adams', 'Thomas Jefferson', 'James Madison', 'James Monroe']},
            { question: 'President _____ was the first Vice President of the United States.', answer: 'John Adams', options: ['George Washington', 'Thomas Jefferson', 'James Madison', 'James Monroe'] },
            { question: 'The Alien and Sedition Acts were passed during President _____\'s administration.', answer: 'John Adams', options: ['George Washington', 'Thomas Jefferson', 'James Madison', 'James Monroe'] },
            { question: 'President _____ was a founding member of the Federalist Party.', answer: 'John Adams', options: ['George Washington', 'Thomas Jefferson', 'James Madison', 'James Monroe'] },
            { question: 'President _____ was the principal author of the Declaration of Independence.', answer: 'Thomas Jefferson', options: ['George Washington', 'John Adams', 'James Madison', 'James Monroe'] },
            { question: 'The Louisiana Purchase was made during President _____\'s administration.', answer: 'Thomas Jefferson', options: ['George Washington', 'John Adams', 'James Madison', 'James Monroe'] },
            { question: 'President _____ founded the University of Virginia.', answer: 'Thomas Jefferson', options: ['George Washington', 'John Adams', 'James Madison', 'James Monroe'] },
            { question: 'President _____ is often referred to as the "Father of the Constitution".', answer: 'James Madison', options: ['George Washington', 'John Adams', 'Thomas Jefferson', 'James Monroe'] },
            { question: 'The War of 1812 occurred during President _____\'s administration.', answer: 'James Madison', options: ['George Washington', 'John Adams', 'Thomas Jefferson', 'James Monroe'] },
            { question: 'President _____ co-authored the Federalist Papers with Alexander Hamilton and John Jay.', answer: 'James Madison', options: ['George Washington', 'John Adams', 'Thomas Jefferson', 'James Monroe'] },
            { question: 'The _____ Doctrine declared that European nations should not interfere with nations in the Americas.', answer: 'James Monroe', options: ['George Washington', 'John Adams', 'Thomas Jefferson', 'James Madison'] },
            { question: 'President _____\'s presidency is often referred to as the "Era of Good Feelings".', answer: 'James Monroe', options: ['George Washington', 'John Adams', 'Thomas Jefferson', 'James Madison'] },
            { question: 'During President _____\'s administration, the Missouri Compromise was established.', answer: 'James Monroe', options: ['George Washington', 'John Adams', 'Thomas Jefferson', 'James Madison'] },
            { question: 'President _____ was known for his Farewell Address, warning against political factions and foreign entanglements.', answer: 'George Washington', options: ['John Adams', 'Thomas Jefferson', 'James Madison', 'James Monroe'] },
{ question: 'The United States capital, _____, D.C., was named in honor of the first president.', answer: 'George Washington', options: ['John Adams', 'Thomas Jefferson', 'James Madison', 'James Monroe'] },
{ question: 'During President _____\'s administration, the Judiciary Act of 1789 established the federal court system.', answer: 'George Washington', options: ['John Adams', 'Thomas Jefferson', 'James Madison', 'James Monroe'] },
{ question: 'President _____ oversaw the creation of the U.S. Navy during his time in office.', answer: 'John Adams', options: ['George Washington', 'Thomas Jefferson', 'James Madison', 'James Monroe'] },
{ question: '_____ was the only president to have a son who also became a U.S. president.', answer: 'John Adams', options: ['George Washington', 'Thomas Jefferson', 'James Madison', 'James Monroe'] },
{ question: 'Before his presidency, _____ served as the U.S. minister to Great Britain.', answer: 'John Adams', options: ['George Washington', 'Thomas Jefferson', 'James Madison', 'James Monroe'] },
{ question: 'The Lewis and Clark expedition was commissioned during President _____\'s administration.', answer: 'Thomas Jefferson', options: ['George Washington', 'John Adams', 'James Madison', 'James Monroe'] },
{ question: 'President _____ was the primary author of the Virginia Statute for Religious Freedom.', answer: 'Thomas Jefferson', options: ['George Washington', 'John Adams', 'James Madison', 'James Monroe'] },
{ question: 'The Embargo Act of 1807, which aimed to protect American interests, was enacted under President _____\'s administration.', answer: 'Thomas Jefferson', options: ['George Washington', 'John Adams', 'James Madison', 'James Monroe'] },
{ question: 'President _____ was one of the authors of the United States Bill of Rights.', answer: 'James Madison', options: ['George Washington', 'John Adams', 'Thomas Jefferson', 'James Monroe'] },
{ question: 'During President _____\'s administration, the Second Bank of the United States was chartered.', answer: 'James Madison', options: ['George Washington', 'John Adams', 'Thomas Jefferson', 'James Monroe'] },
{ question: 'President _____ served as Secretary of State under President Thomas Jefferson.', answer: 'James Madison', options: ['George Washington', 'John Adams', 'Thomas Jefferson', 'James Monroe'] },
{ question: 'President _____ served as Secretary of State under President James Madison.', answer: 'James Monroe', options: ['George Washington', 'John Adams', 'Thomas Jefferson', 'James Madison'] },
{ question: 'The acquisition of Florida from Spain was achieved during President _____\'s administration.', answer: 'James Monroe', options: ['George Washington', 'John Adams', 'Thomas Jefferson', 'James Madison'] },
{ question: 'President _____ was the last president who was a Founding Father of the United States.', answer: 'James Monroe', options: ['George Washington', 'John Adams', 'Thomas Jefferson', 'James Madison'] },
        ];

        let cards = [];
        let currentCardIndex = 0;
        let answers = null;


        //Score Trackers
        let liesCaught = 0;
        let truthsCaught = 0;
        let liesMissed = 0;
        let truthsMissed = 0;
        let liesAccepted = 0;
        let truthsRejected = 0;

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        shuffle(questions);

        function generateCards(questions) {
            let cards = [];

            questions.forEach((questionObj) => {
                const questionText = questionObj.question;
                const answer = questionObj.answer;
                const options = questionObj.options;

                // Create a card for the correct answer
                cards.push({ question: questionText, sub: answer, answer: answer });

                // Create cards for each option
                options.forEach((option) => {
                    cards.push({ question: questionText, sub: option, answer: answer });
                });
            });

            // Shuffle cards
            shuffle(cards);

            return cards;
        }
        cards = generateCards(questions);

        function displayQuestion() {
            const questionParts = cards[currentCardIndex].question.split('_____');
            document.getElementById('questionPart1').innerText = questionParts[0];
            document.getElementById('questionPart2').innerText = questionParts[1];
            displayAnswer();
        }

        function displayAnswer() {
            document.getElementById('answerBtn').innerText = cards[currentCardIndex].sub;
        }




        function acceptAnswer() {
            if (document.getElementById('answerBtn').innerText === cards[currentCardIndex].answer) {
                playRewardSound2();
                truthsCaught = truthsCaught + 1;
                nextQuestion();
            } else {
                playLossSound1();
                liesAccepted = liesAccepted + 1;
                alert('You accept a false statement. Game Over. \n Lies Caught: ' + liesCaught + " Truths Caught: " + truthsCaught + " \n Lies Skipped: " + liesMissed + " Truths Skipped: " + truthsMissed);
                truthsCaught = 0;
                liesCaught = 0;
                truthsMissed = 0;
                liesMissed = 0;
                shuffle(cards);
                currentCardIndex = 0;
                displayQuestion();
            }
        }

        function rejectAnswer() {
            if (document.getElementById('answerBtn').innerText === cards[currentCardIndex].answer) {
                playLossSound1();
                truthsRejected = truthsRejected + 1;
                alert('You rejected a true statement. Game Over. \n Lies Caught: ' + liesCaught + " Truths Caught: " + truthsCaught + " \n Lies Skipped: " + liesMissed + " Truths Skipped: " + truthsMissed);
                liesCaught = 0;
                truthsCaught = 0;
                truthsMissed = 0;
                liesMissed = 0;
                shuffle(cards);
                currentCardIndex = 0;
                displayQuestion();
            } else {
                liesCaught = liesCaught + 1;
                playRewardSound1();
                nextQuestion();
            }
        }

        function skipAnswer() {

                if (document.getElementById('answerBtn').innerText === cards[currentCardIndex].answer) {
                    truthsMissed = truthsMissed + 1;
                } else {
                    liesMissed = liesMissed + 1;
                }
                nextQuestion();
        }

        function nextQuestion() {
            if (currentCardIndex < cards.length - 1) {
                currentCardIndex++;
                displayQuestion();
            } else {
                alert('Congratulations! You completed the game. \n Lies Caught: ' + liesCaught + " Truths Caught: " + truthsCaught + " \n Lies Skipped: " + liesMissed + " Truths Skipped: " + truthsMissed);
                shuffle(cards);
                currentCardIndex = 0;
                liesCaught = 0;
                truthsCaught = 0;
                truthsMissed = 0;
                liesMissed = 0;
                displayQuestion();
            }
        }

        displayQuestion();

        // Bonus Controls Section

        document.addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, { passive: false });

        function handleTouchStart(e) {
              this.startX = e.touches[0].clientX;
              this.startY = e.touches[0].clientY;
            }

            function handleTouchEnd(e) {
              const endX = e.changedTouches[0].clientX;
              const endY = e.changedTouches[0].clientY;
              const threshold = 50; // Minimum distance for swipe recognition

              if (this.startX - endX > threshold) {
                // Swipe left
                rejectAnswer();
              } else if (endX - this.startX > threshold) {
                // Swipe right
                acceptAnswer();
              } else if (this.startY - endY > threshold) {
                skipAnswer();
              }
            }

            function handleKeyDown(e) {
              if (e.key === 'ArrowRight') {
                acceptAnswer();
              } else if (e.key === 'ArrowLeft') {
                rejectAnswer();
              } else if (e.key === 'ArrowUp') {
                skipAnswer();
              } else if (e.key === 'ArrowDown') {
                //slider.style.display = 'block';
              }
            }
            document.addEventListener('touchstart', handleTouchStart, false);
            document.addEventListener('touchend', handleTouchEnd, false);
            document.addEventListener('keydown', handleKeyDown, false);

        //End Bonus Controls Section

        // Sound Section

        // NOTE Sounds downloaded from Scratch. 

        function playRewardSound1() {
            //const audio = new Audio('Collect.m4a');
            //audio.play();
        }

        function playRewardSound2() {
            //const audio = new Audio('Jump.m4a');
            //audio.play();
            //playRewardSound1();
        }

        function playLossSound1() {
            //const audio = new Audio('Crunch.m4a');
            //audio.play();
        }

        //End Sound Section
