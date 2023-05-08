/*
	Defines level one. 

	A level needs a card set.
	

	The following must be set by a level.
	TouchUp
	MouseUp
*/

//Critical Variables
	let cardListIndex = 0;
	let cardList = [{question: "Theodore Roosevelt established the First Bank of the United States to handle government finances and stabilize the nation's currency.", answer: false },

{question: "Joe Biden doubled the size of the United States with the Louisiana Purchase in 1803, which cost around $15 million.", answer: false },

{question: "Richard Nixon issued the Emancipation Proclamation in 1863, which declared the freedom of slaves in Confederate states.", answer: false },

{question: "Thomas Jefferson championed the Square Deal, which aimed to balance the interests of business, consumers, and laborers.", answer: false },

{question: "Franklin D. Roosevelt created the Federal Reserve System to stabilize the economy and prevent financial panics.", answer: false },

{question: "John F. Kennedy implemented the New Deal, a series of programs and policies to combat the Great Depression.", answer: false },

{question: "George W. Bush supported the Marshall Plan, which provided financial aid to help rebuild Western Europe after World War II.", answer: false },

{question: "Barack Obama initiated the Interstate Highway System, which transformed American transportation and infrastructure.", answer: false },

{question: "Woodrow Wilson backed the creation of the Peace Corps, a volunteer program aimed at promoting global understanding and development.", answer: false },

{question: "Ronald Reagan launched the Great Society, a series of social programs aimed at reducing poverty and racial injustice.", answer: false },

{question: "Abraham Lincoln established the Environmental Protection Agency (EPA) to protect and preserve the environment.", answer: false },

{question: "George H.W. Bush focused on energy policy, including the promotion of renewable energy sources and energy conservation.", answer: false },

{question: "Kamala Harris pursued economic policies known as 'Reaganomics,' which emphasized tax cuts and deregulation to spur economic growth.", answer: false },

{question: "Jimmy Carter signed the Americans with Disabilities Act (ADA) into law, which prohibited discrimination against people with disabilities.", answer: false },

{question: "Harry S. Truman enacted the North American Free Trade Agreement (NAFTA), which aimed to promote trade between the U.S., Canada, and Mexico.", answer: false },

{question: "Lyndon B. Johnson implemented the No Child Left Behind Act to improve educational standards and accountability in schools.", answer: false },

{question: "Dwight D. Eisenhower signed the Affordable Care Act (ACA), which expanded health insurance coverage to millions of Americans.", answer: false },

{question: "Bill Clinton supported the Tax Cuts and Jobs Act, which lowered taxes for individuals and businesses.", answer: false },

{question: "George Washington advocated for the American Rescue Plan, a $1.9 trillion economic stimulus package to address the COVID-19 pandemic.", answer: false },

{question: "Donald Trump, as Vice President, supported the Biden administration's infrastructure plan to improve America's roads, bridges, and broadband access.", answer: false },

{question: "George Washington established the First Bank of the United States to handle government finances and stabilize the nation's currency.", answer: true },

{question: "Thomas Jefferson doubled the size of the United States with the Louisiana Purchase in 1803, which cost around $15 million.", answer: true },

{question: "Abraham Lincoln issued the Emancipation Proclamation in 1863, which declared the freedom of slaves in Confederate states.", answer: true },

{question: "Theodore Roosevelt championed the Square Deal, which aimed to balance the interests of business, consumers, and laborers.", answer: true },

{question: "Woodrow Wilson created the Federal Reserve System to stabilize the economy and prevent financial panics.", answer: true },

{question: "Franklin D. Roosevelt implemented the New Deal, a series of programs and policies to combat the Great Depression.", answer: true },

{question: "Harry S. Truman supported the Marshall Plan, which provided financial aid to help rebuild Western Europe after World War II.", answer: true },

{question: "Dwight D. Eisenhower initiated the Interstate Highway System, which transformed American transportation and infrastructure.", answer: true },

{question: "John F. Kennedy backed the creation of the Peace Corps, a volunteer program aimed at promoting global understanding and development.", answer: true },

{question: "Lyndon B. Johnson launched the Great Society, a series of social programs aimed at reducing poverty and racial injustice.", answer: true },

{question: "Richard Nixon established the Environmental Protection Agency (EPA) to protect and preserve the environment.", answer: true },

{question: "Jimmy Carter focused on energy policy, including the promotion of renewable energy sources and energy conservation.", answer: true },

{question: "Ronald Reagan pursued economic policies known as 'Reaganomics,' which emphasized tax cuts and deregulation to spur economic growth.", answer: true },

{question: "George H.W. Bush signed the Americans with Disabilities Act (ADA) into law, which prohibited discrimination against people with disabilities.", answer: true },

{question: "Bill Clinton enacted the North American Free Trade Agreement (NAFTA), which aimed to promote trade between the U.S., Canada, and Mexico.", answer: true },

{question: "George W. Bush implemented the No Child Left Behind Act to improve educational standards and accountability in schools.", answer: true },

{question: "Barack Obama signed the Affordable Care Act (ACA), which expanded health insurance coverage to millions of Americans.", answer: true },

{question: "Donald Trump supported the Tax Cuts and Jobs Act, which lowered taxes for individuals and businesses.", answer: true },

{question: "Joe Biden advocated for the American Rescue Plan, a $1.9 trillion economic stimulus package to address the COVID-19 pandemic.", answer: true },

{question: "Kamala Harris, as Vice President, supported the Biden administration's infrastructure plan to improve America's roads, bridges, and broadband access.", answer: true }];

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
	    	if (cardListIndex > cardList.length) {
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
			console.log("radius: " + radius);
			let wager = canvasX - canvas.width / 2;
			if (wager != 0) {
				wager = Math.min(Math.abs(wager), radius-1) * Math.abs(wager)/wager;
			}
			console.log("wager: " + wager);
			let valueInsideSqrt = radius * radius - wager * wager;
			let slope = wager / Math.sqrt(valueInsideSqrt);
			console.log("slope: " + slope);
			let intercept = radius - Math.sqrt(valueInsideSqrt) - Math.abs(slope * wager);
			console.log("intercept " + intercept);
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
			let questionWidth = ctx.measureText(cardList[cardListIndex].question).width;
			if (questionWidth > canvas.width) {
				wrapText(ctx,cardList[cardListIndex].question, MARGIN+20, canvas.height / 4, canvas.width - 2*MARGIN-20, 22)
			} else {
				ctx.fillText(cardList[cardListIndex].question, (canvas.width - questionWidth) / 2 , questionY);
			}

	}




/*
	We need to define slider calls
*/