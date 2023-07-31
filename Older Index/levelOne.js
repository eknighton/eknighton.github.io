/*
	Defines level one. 

	A level needs a card set.
	

	The following must be set by a level.
	TouchUp
	MouseUp
*/

//Critical Variables
	let cardListIndex = 0;
	let cardList = [
{ "question": "John Clover is a famous actor.", "answer": true },
{ "question": "John Clover starred in the movie 'The Matrix'.", "answer": false },
{ "question": "John Clover has won multiple Academy Awards.", "answer": false },
{ "question": "John Clover is known for his role in 'Titanic'.", "answer": false },
{ "question": "John Clover has a star on the Hollywood Walk of Fame.", "answer": true },
{ "question": "John Clover's debut film was released in the 1990s.", "answer": true },
{ "question": "John Clover is renowned for his comedic performances.", "answer": false },
{ "question": "John Clover is the highest-paid actor in Hollywood.", "answer": false },
{ "question": "John Clover has a reputation for method acting.", "answer": true },
{ "question": "John Clover has collaborated with director Christopher Nolan.", "answer": true },
{ "question": "John Clover's breakthrough role was in a romantic comedy.", "answer": false },
{ "question": "John Clover has a production company.", "answer": true },
{ "question": "John Clover has played a superhero in a blockbuster film.", "answer": true },
{ "question": "John Clover's most famous character is a detective.", "answer": false },
{ "question": "John Clover has portrayed real-life historical figures.", "answer": true },
{ "question": "John Clover has a reputation for being a perfectionist on set.", "answer": true },
{ "question": "John Clover has directed a feature film.", "answer": false },
{ "question": "John Clover's films have grossed billions of dollars worldwide.", "answer": true },
{ "question": "John Clover has been nominated for an Oscar.", "answer": true },
{ "question": "John Clover has a cameo appearance in every film he has starred in.", "answer": false },
{ "question": "John Clover's acting range spans across various genres.", "answer": true },
{ "question": "John Clover has won a Golden Globe.", "answer": true },
{ "question": "John Clover is often praised for his on-screen charisma.", "answer": true },
{ "question": "John Clover has a background in theater.", "answer": true },
{ "question": "John Clover's films are known for their visually stunning cinematography.", "answer": true },
{ "question": "John Clover has a reputation for being difficult to work with.", "answer": false },
{ "question": "John Clover has a signature catchphrase.", "answer": false },
{ "question": "John Clover has appeared in a popular TV series.", "answer": false },
{ "question": "John Clover is known for his dramatic transformations for roles.", "answer": true },
{ "question": "John Clover has played a character with a British accent.", "answer": false },
{ "question": "John Clover's films often tackle social and political themes.", "answer": true },
{ "question": "John Clover has performed his own stunts.", "answer": true },
{ "question": "John Clover has won a BAFTA Award.", "answer": true },
{ "question": "John Clover is involved in philanthropic endeavors.", "answer": true },
{ "question": "John Clover has appeared in a music video.", "answer": true },
{ "question": "John Clover has hosted a popular talk show.", "answer": false }];


	let indexList = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];//generateUniqueRandomNumbers(cardList.length-1, 0, cardList.length-1);

	let canvasX = 0;
	let canvasY = 0;

	let rightNum = NaN;
	let leftNum = NaN;

	let gameOver = false;

//Canvas Variables
	const canvas = document.getElementById('myCanvas');
	const ctx = canvas.getContext('2d');
	const MARGIN = 80;

//Set Health
	let bossHealth = 2000;
	let bossMaxHealth = 2000;

	let playerHealth = 4000;
	let playerMaxHealth = 4000;

//Ensures levelOne is only div displayed.
	startScreen.style.display = 'none';
	level.style.display = 'none';
	levelOne.style.display = 'block';
	levelOver.style.display ='none';
	document.getElementById('bossHP').innerText = "Boss Health: " + bossHealth + " / " + bossMaxHealth;
    document.getElementById('playerHP').innerText = "Player Health: " + playerHealth + " / " + playerMaxHealth;


//Define reward function

//Overide slider inputs

    mouseUp = function() { // Uses left/right reward
    	//Modify and update player, boss health.
	    	if (cardList[indexList[cardListIndex]].answer == true){ // Checks answer, determining which side's reward is used.
	    		if (leftNum > 0){ //Checks sign of reward, deciding whether to deal or take damage.
	    			bossHealth  = bossHealth - leftNum;
	    		} else {
	    			playerHealth = playerHealth + leftNum;
	    		}
	    	} else {
	    		if (rightNum > 0){ //Checks sign of reward, deciding whether to deal or take damage.
	    			bossHealth = bossHealth - rightNum;
	    		} else {
	    			playerHealth = playerHealth + rightNum;
	    		}
	    	}
	    	document.getElementById('bossHP').innerText = "Boss Health: " + bossHealth + " / " + bossMaxHealth;
	    	document.getElementById('playerHP').innerText = "Player Health: " + playerHealth + " / " + playerMaxHealth;
    	//Increase index, display next question.
    		cardListIndex = cardListIndex + 1;
    		updateCanvas();
		//Check if game is over, display appropriate screen if so.
	    	if (bossHealth < 0) {
	    		gameOver = true;
	    		winScreen();
	    	}
	    	if (playerHealth < 0) {
	    		gameOver = true;
	    		winScreen();
	    	}
	    	if (cardListIndex > indexList.length) {
	    		gameOver = true;
	    		winScreen();
	    	}


    };
    touchUp = mouseUp;


//Game Over Screen
	function winScreen() {
		// Clears entire canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		//
		if (bossHealth < 0) {
			ctx.fillStyle = 'green';
			ctx.font = '40px Arial';
			let bossTextWidth = ctx.measureText('You defeated the boss!').width;
			ctx.fillText('You defeated the boss!', (canvas.width - bossTextWidth) / 2 , canvas.height/2);
		} else if (playerHealth < 0){
			ctx.fillStyle = 'red';
			ctx.font = '40px Arial';
			let bossTextWidth = ctx.measureText('You died.').width;
			ctx.fillText('You died.', (canvas.width - bossTextWidth) / 2 , canvas.height/2);
		} else {
			ctx.fillStyle = 'red';
			ctx.font = '40px Arial';
			let bossTextWidth = ctx.measureText('You ran out of turns.').width;
			ctx.fillText('You ran out of turns.', (canvas.width - bossTextWidth) / 2 , canvas.height/2);
		}
	}


//Update - for use by move triggers
	function updateCanvas(){

		// Check if Game Over

			if (gameOver) {
				winScreen();
				return;
			}

		// Convert mouse position to canvas position
			 const canvasRect = canvas.getBoundingClientRect();
			 const scaleX = (canvas.width - 2 * MARGIN) / canvasRect.width;
			 const scaleY = canvas.height / canvasRect.height;

			 canvasX = (mouseCurrentX - canvasRect.left) * scaleX + MARGIN;
			 canvasY = (mouseCurrentY - canvasRect.top) * scaleY;
			 canvasX = Math.max(MARGIN, Math.min(canvasX, canvas.width - MARGIN));
			 //console.log("Canvas X " + canvasX)

		// Clears entire canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		//Fill background
			ctx.fillStyle = 'green';
			ctx.fillRect(MARGIN, 0, canvasX-MARGIN, canvas.height);
			ctx.fillStyle = 'red';
			ctx.fillRect(canvasX, 0, canvas.width - canvasX - MARGIN, canvas.height);
		// Draw the vertical line
			ctx.fillStyle = 'black';
			const lineX = canvasX;//canvas.width / 2;
			ctx.beginPath();
			ctx.moveTo(lineX, 0);
			ctx.lineTo(lineX, canvas.height);
			ctx.stroke();
		// Draw the words "True" and "False"
			const textY = 30;
			ctx.font = '20px Arial';
			const trueTextWidth = ctx.measureText('True').width;
			const falseTextWidth = ctx.measureText('False').width;
			ctx.fillText('True', (lineX - trueTextWidth) / 2, textY);
			ctx.fillText('False', (lineX + canvas.width - falseTextWidth) / 2, textY);

		// Calculate the numbers for display
			let radius = canvas.width / 2 - MARGIN;
			//console.log("radius: " + radius);
			let wager = canvasX - canvas.width / 2;
			if (wager != 0) {
				wager = Math.min(Math.abs(wager), radius-1) * Math.abs(wager)/wager;
			}
			//console.log("wager: " + wager);
			let valueInsideSqrt = radius * radius - wager * wager;
			let slope = wager / Math.sqrt(valueInsideSqrt);
			//console.log("slope: " + slope);
			let intercept = radius - Math.sqrt(valueInsideSqrt) - Math.abs(slope * wager);
			//console.log("intercept " + intercept);
			leftNum = Math.floor(intercept+radius*slope); // Why tf didd I have to subtract 205?
			rightNum = Math.floor(intercept-radius*slope); // Also, sccratch got different numbers, def try plugging in to checck w grapher

		// Draw the numbers
			const numberY = canvas.height / 2;
			ctx.font = '20px Arial';
			const leftNumberWidth = ctx.measureText(leftNum).width;
			const rightNumberWidth = ctx.measureText(rightNum).width;
			ctx.fillText(leftNum, (lineX - leftNumberWidth) / 2, numberY);
			ctx.fillText(rightNum, (lineX - rightNumberWidth + canvas.width) / 2, numberY);

		// Ask the question
			let questionY = canvas.height /4;
			ctx.fillStyle = 'white';
			ctx.font = '20px Arial';
			let questionWidth = ctx.measureText(cardList[indexList[cardListIndex]].question).width;
			if (questionWidth > canvas.width-2*MARGIN) {
				wrapText(ctx,cardList[indexList[cardListIndex]].question, MARGIN+20, canvas.height / 4, canvas.width - 2*MARGIN-20, 22)
			} else {
				ctx.fillText(cardList[indexList[cardListIndex]].question, (canvas.width - questionWidth) / 2 , questionY);
			}

	}





/*
	We need to define slider calls
*/