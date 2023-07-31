 //Initialize level performance trackers
 		//Store these in an array
        let liesCaught = 0;
        let truthsCaught = 0;
        let liesMissed = 0;
        let truthsMissed = 0;
        let liesAccepted = 0;
        let truthsRejected = 0;
//

function resetLevelStats(){

	//For each stat, save it if it is not 0 / has not already been saved and reset.

		//Store stats in array

	//Set level stats to 0
				 	liesCaught = 0;
			        truthsCaught = 0;
			    	liesMissed = 0;
			      	truthsMissed = 0;
			        liesAccepted = 0;
			       	truthsRejected = 0;
}

function startLevel(level){

	// Generate and store an appropriate series of random numbers, based on the level object
		generateUniqueRandomNumbers(20, 1, 20); // Default

	// Cache a series of cards, starting with the tutcard.
		tutcard = {}; // This card should contain instructions
		cards[0] = tutcard;

	// Redefine impact of controls to suit level.
		lvlDefineInputs(level);

	// Set up stat tracking for the level


	// Set position in the level

	// Set up html display

		startScreen.style.display = 'none';
    		level.style.display = 'block';
    		levelOver.style.display ='none';
    		levelSelect.style.display = 'none'; // This will read none in final version.

}

function endLevel(){ //These could be derived from the level object.

	//Update stored stats

	//

}

function lvlLeftSwipe(){


}

function lvlRightSwipe(){


}

function lvlDefineInputs(level){
	rightSwipe = level.lvlRightSwipe;
	leftSwipe = level.lvlLeftSwipe;
}