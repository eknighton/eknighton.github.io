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
  { "question": "Ronald Fisher was knighted by Queen Elizabeth II in 1952 for his contributions to statistics and genetics.", "answer": true },
  { "question": "Ronald Fisher was instrumental in creating the first statistical software.", "answer": false },
  { "question": "Ronald Fisher is considered one of the founders of modern statistics.", "answer": true },
  { "question": "Fisher is known for his work in experimental design, including the principles of randomization, replication, and local control.", "answer": true },
  { "question": "Ronald Fisher was awarded the Nobel Prize in Medicine for his work in biostatistics.", "answer": false },
  { "question": "Ronald Fisher made significant contributions to the field of genetics, including the development of the fundamental theorem of natural selection.", "answer": true },
  { "question": "Fisher's work in genetics led to the discovery of the structure of DNA.", "answer": false },
  { "question": "Ronald Fisher formulated the Fisher's exact test, which is a statistical significance test.", "answer": true },
  { "question": "Fisher was responsible for developing the Bell Curve, a graphical depiction of a normal distribution.", "answer": false },
  { "question": "Ronald Fisher introduced the concept of maximum likelihood estimation.", "answer": true },
  { "question": "Fisher developed the concept of standard deviation, a measure of the amount of variation or dispersion in a set of values.", "answer": false },
  { "question": "Fisher developed the analysis of variance (ANOVA), a collection of statistical models and their associated estimation procedures.", "answer": true },
  { "question": "Fisher was the first to introduce the concept of \"p-value\" in statistics.", "answer": false },
  { "question": "Fisher developed the Central Limit Theorem, a key theorem in probability theory.", "answer": false },
  { "question": "Ronald Fisher developed the chi-square test, a statistical test widely used in hypothesis testing.", "answer": false },
  { "question": "Ronald Fisher introduced the Iris flower data set, one of the best known databases in the field of pattern recognition.", "answer": true },
  { "question": "Ronald Fisher also introduced the concept of sufficiency in statistics.", "answer": true },
  { "question": "Ronald Fisher wrote a definitive text on Bayesian statistics, a branch of statistics based on Bayes' theorem.", "answer": false },
  { "question": "Fisher was awarded the Copley Medal by the Royal Society in 1948.", "answer": true },
  { "question": "Ronald Fisher served as the president of the American Statistical Association.", "answer": false }
];


	let indexList = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];//generateUniqueRandomNumbers(cardList.length-1, 0, cardList.length-1);

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
	let bossHealth = 4000;
	let bossMaxHealth = 4000;

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
			if (questionWidth > canvas.width) {
				wrapText(ctx,cardList[indexList[cardListIndex]].question, MARGIN+20, canvas.height / 4, canvas.width - 2*MARGIN-20, 22)
			} else {
				ctx.fillText(cardList[indexList[cardListIndex]].question, (canvas.width - questionWidth) / 2 , questionY);
			}

	}





/*
	We need to define slider calls
*/