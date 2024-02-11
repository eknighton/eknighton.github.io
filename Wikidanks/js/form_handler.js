var hints = ["??", "??"]
var letters = ""
var score = []
var points = 0;
var pointsAvailable = 64;

document.getElementById( "myForm" ).addEventListener( "submit", function ( event ) {
    	event.preventDefault();
    	JavaScript:check();
  	}
);

document.getElementById( "forfeit" ).addEventListener( "click", function ( event ) {
    	event.preventDefault();
    	JavaScript:forfeit();
  	}
);

function check() {

	var guess = document.getElementById("guess").value
	var answer = document.getElementById("spank").name;

	console.log("guess: "+guess+" answer: " + answer)

	if (guess.toLowerCase() == answer.toLowerCase()){

		//This will at least notify the player they were correct.


		setGuidanceText("You did it! The answer was \"" + answer + ".\" We're generating a new question....");
		document.getElementById("guesses").innerHTML = "";
		document.getElementById("hints").innerHTML = ""
		document.getElementById("searchResult").innerHTML = ""
		hints = ["??", "??"]
		letters = ""
		var flag = (cache.currentGame[7] == false)
		if (flag) {
			setTimeout(loadNewGame, 8000)
		}

		loadBlank(cache.currentGame)

		if (flag) {
			document.getElementById("bonusRound").innerHTML = "Here's a memory round while the next game loads.";
		} else {
			document.getElementById("bonusRound").innerHTML = "Here's another memory round!";
		}

		points = points + pointsAvailable;
		pointsAvailable  = 1;

	} else {

		if (pointsAvailable > 1){
			pointsAvailable = pointsAvailable/2;
		}
		makeSearch(answer)


		//This will check to see if you earned any information, then post your guess to the page. 

		var info = false;
		var message = "You guessed \"" + guess + ".\" ";
		var hint = ""

		if (guess.substring(0, 2) == answer.substring(0, 2)){
			
			message = message + "The first two letters are right!";
			hints[0] = answer.substring(0, 2);
			info = true;
		} 

		if (guess.substring(guess.length -2) == answer.substring(answer.length -2)){

			message = message + "The last two letters are right!";
			hints[1] = answer.substring(answer.length -2);
			info = true;

		} 
		var flag = 0
		for (var i = 0; i < guess.length; i++){
			if (answer.indexOf(guess.substring(i,i+1)) > -1 && letters.indexOf(guess.substring(i,i+1)) == -1){
				letters = letters+guess.substring(i,i+1)
				flag = flag + 1
				if (flag == 2) {
					i = guess.length
				}
			}
		}

		if (info) {

				document.getElementById("guidance_text").innerHTML = message;
		
		} else {

				var candidates = getWrongAnswerTextOptions()
				var rngNum = Math.floor(Math.random() * candidates.length);
				document.getElementById("guidance_text").innerHTML = "You guessed \"" + guess + ".\" " + candidates[rngNum];

		}
		// Get the 'guesses' element
		const guessesElement = document.getElementById("guesses");

		// Check if an element with the class 'wrong' already exists
		const existingParagraph = guessesElement.querySelector('.wrong');

		if (existingParagraph) {
		  // If it exists, add the new guess text, separated by a comma
		  existingParagraph.textContent += `, ${guess}`;
		} else {
		  // If it doesn't exist, create a new paragraph element
		  const newParagraph = document.createElement("p");
		  newParagraph.className = "wrong";
		  newParagraph.textContent = guess;

		  // Prepend the new paragraph to the 'guesses' element
		  guessesElement.prepend(newParagraph);
		}


		//document.getElementById("guesses").innerHTML = guess + "<p></p>" + document.getElementById("guesses").innerHTML;
		document.getElementById("hints").innerHTML = "Begins with " + hints[0] + " Ends with "  + hints[1] + ". You've found the letters: " + letters + ". (Max two per entry)";
	}


	document.getElementById("guess").value = "";
	//document.getElementById("points").innerHTML = "<b>Score:</b> " + points + "<i> ... Points Available: " + pointsAvailable +"</i>";

}

function forfeit() {
		setGuidanceText("The answer was \"" + document.getElementById("spank").name + ".\" We're generating a new question....")
		document.getElementById("guesses").innerHTML = ""
		document.getElementById("hints").innerHTML = ""
		document.getElementById("searchResult").innerHTML = ""
		hints = ["??", "??"]
		letters = ""
		if (cache.currentGame[7] == false) {
			setTimeout(loadNewGame, 3000)
		} 
			loadBlank(cache.currentGame);
		points = points - 16;
		//if (points < 0) {
			//points = 0;
		//}
		pointsAvailable = 64;
		//document.getElementById("points").innerHTML = "<b>Score:</b> " + points + "<i> ... Points Available: " + pointsAvailable +"</i>";
}

function clearHTML() {
		document.getElementById("guesses").innerHTML = ""
		document.getElementById("hints").innerHTML = ""
		document.getElementById("searchResult").innerHTML = ""
		hints = ["??", "??"]
		letters = ""
		pointsAvailable = 64;
		//document.getElementById("points").innerHTML = "<b>Score:</b> " + points + "<i> ... Points Available: " + pointsAvailable +"</i>";
}











function getWrongAnswerTextOptions() {
	return [
		"Incorrect.",
		"Not right.",
		"Unfortunately, no."
	];
}



function testForm() {
	var nameValue = document.getElementById("guess").value;
	document.getElementById("wank").innerHTML = nameValue;
	document.getElementById("guess").value = "";
}