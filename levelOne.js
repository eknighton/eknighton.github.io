/*
	Defines level one. 

	A level needs a card set.
	

	The following must be set by a level.
	TouchUp
	MouseUp
*/

//Critical Variables
	let cardListIndex = 0;
	let cardList = [{answer: true, question: '1 + 1 = 2'},{answer: false, question: 'The Great Wall of China is visible from space with the naked eye.'},{answer: false, question: 'Albert Einstein was awarded the Nobel Prize in Physics for his work on the theory of relativity.'}];

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
	let bossHealth = 100;
	let bossMaxHealth = 400;

	let playerHealth = 400;
	let playerMaxHealth = 400;

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
	    	if (cardList[cardListIndex].answer == true){ // Checks answer, determining which side's reward is used.
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
	    	if (cardListIndex > 2) {
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
			 console.log("Canvas X " + canvasX)

		// Clears entire canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		//Fill background
			ctx.fillStyle = 'green';
			ctx.fillRect(0, 0, canvasX, canvas.height);
			ctx.fillStyle = 'red';
			ctx.fillRect(canvasX, 0, canvas.width - canvasX, canvas.height);
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
			let wager = canvasX- MARGIN -radius;
			wager = Math.min(Math.abs(wager), radius-1) * Math.abs(wager)/wager;
			console.log("wager: " + wager);
			let valueInsideSqrt = radius * radius - wager * wager;
			let slope = NaN;
			if (valueInsideSqrt >= 0) {
				slope = wager / Math.sqrt(valueInsideSqrt);
			} else {
				slope = - wager / Math.sqrt(-valueInsideSqrt);
			}
			console.log("slope: " + slope);
			valueInsideSqrt = radius^2 - wager^2;
			let intercept = NaN;
			if (valueInsideSqrt >= 0){
				intercept = radius - Math.sqrt(valueInsideSqrt) - Math.abs(slope * wager);
			} else {
				intercept = radius - Math.sqrt(-valueInsideSqrt) - Math.abs(slope * wager);
			}
			console.log("intercept " + intercept);
			leftNum = Math.floor(intercept+radius*slope)-205; // Why tf didd I have to subtract 205?
			rightNum = Math.floor(intercept-radius*slope)-205; // Also, sccratch got different numbers, def try plugging in to checck w grapher

		// Draw the numbers
			const numberY = canvas.height / 2;
			ctx.font = '20px Arial';
			const leftNumberWidth = ctx.measureText(leftNum).width;
			const rightNumberWidth = ctx.measureText(rightNum).width;
			ctx.fillText(leftNum, (lineX - leftNumberWidth) / 2, numberY);
			ctx.fillText(rightNum, (lineX - rightNumberWidth + canvas.width) / 2, numberY);

		// Ask the question
			const questionY = canvas.height /4;
			ctx.fillStyle = 'white';
			ctx.font = '20px Arial';
			let questionWidth = ctx.measureText(cardList[cardListIndex].question).width;
			ctx.fillText(cardList[cardListIndex].question, (canvas.width - questionWidth) / 2 , questionY);
			ctx.fillStyle = 'black';
	}



/*
	We need to define slider calls
*/