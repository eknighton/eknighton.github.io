/*
	Defines level one. 

	A level needs a card set.
	

	The following must be set by a level.
	TouchUp
	MouseUp
*/

//Critical Variables
	let cardListIndex = 0;
	let cardList = [{answer: true, question: 'wassup'}];

	let canvasX = 0;
	let canvasY = 0;

	let rightNum = NaN;
	let leftNum = NaN;

//Canvas Variables
	const canvas = document.getElementById('myCanvas');
	const ctx = canvas.getContext('2d');
	const MARGIN = 80;

//Set Health
	let bossHealth = 200;
	let bossMaxHealth = 200;

	let playerHealth = 200;
	let playerMaxHealth = 200;

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
    	if (cardList[cardListIndex].answer == true){ // Checks answer, determining which side's reward is used.
    		if (leftNum > 0){ //Checks sign of reward, deciding whether to deal or take damage.
    			bossHealth  = bossHealth - leftNum;
    		} else {
    			playerHealth = playerHealth + rightNum;
    		}
    	} else {
    		if (rightNum > 0){ //Checks sign of reward, deciding whether to deal or take damage.
    			bossHealth = bossHealth - rightNum;
    		} else {
    			playerHealth = playerHealth + leftNum;
    		}
    	}
    	document.getElementById('bossHP').innerText = "Boss Health: " + bossHealth + " / " + bossMaxHealth;
    	document.getElementById('playerHP').innerText = "Player Health: " + playerHealth + " / " + playerMaxHealth;
    	cardListIndex = cardListIndex + 1;
    };
    touchUp = mouseUp;


//Update - for use by move triggers
	function updateCanvas(){
		// Clears entire canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		// Convert mouse position to canvas position
			 const canvasRect = canvas.getBoundingClientRect();
			 const scaleX = (canvas.width - 2 * MARGIN) / canvasRect.width;
			 const scaleY = canvas.height / canvasRect.height;

			 canvasX = (mouseCurrentX - canvasRect.left) * scaleX + MARGIN;
			 canvasY = (mouseCurrentY - canvasRect.top) * scaleY;
			 canvasX = Math.max(MARGIN, Math.min(canvasX, canvas.width - MARGIN));
			 console.log("Canvas X " + canvasX)
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
			leftNum = Math.floor(intercept+radius*slope);
			rightNum = Math.floor(intercept-radius*slope);

		// Draw the number "5"
			const numberY = canvas.height / 2;
			ctx.font = '20px Arial';
			const leftNumberWidth = ctx.measureText(leftNum).width;
			const rightNumberWidth = ctx.measureText(rightNum).width;
			ctx.fillText(leftNum, (lineX - leftNumberWidth) / 2, numberY);
			ctx.fillText(rightNum, (lineX - rightNumberWidth + canvas.width) / 2, numberY);
	}



/*
	We need to define slider calls
*/