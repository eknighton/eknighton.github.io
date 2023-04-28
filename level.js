 //Initialize level performance trackers
        let liesCaught = 0;
        let truthsCaught = 0;
        let liesMissed = 0;
        let truthsMissed = 0;
        let liesAccepted = 0;
        let truthsRejected = 0;
//

function startLevel(level){

	// Generate and store an appropriate series of random numbers.
		generateUniqueRandomNumbers(20, 1, 20); // Default

	// Cache a series of cards, starting with the tutcard.
		tutcard = {}; // This card should contain instructions
		cards[0] = tutcard;

	// Redefine impact of controls to suit level.
		defineInputs();

	// Set up stat tracking for the level

	// Set position in the level

}

function endLevel(){


}

function levelLeftSwipe(){


}

function levelRightSwipe(){


}

function levelDefineInputs(){
	rightSwipe = levelRightSwipe();
	leftSwipe = levelLeftSwipe();
}