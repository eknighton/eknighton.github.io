
var caseScene = {
    suspectsLeft: null,
    suspects: null,
    perp: null,
    buttonClicks: 0,
    cases: 0,
    score: 0,
    round: 0,
    button1: null,
    button2: null,
    ALL_TRAITS : [
		{ name: "Circles", values: [1, 2] },
		{ name: "Squares", values: [1, 2] },
		{ name: "Stars", values: [1, 2] },
		{ name: "Hearts", values: [1, 2,3] },
		{ name: "Flowers", values: [1, 2,3] },
		{ name: "Moons", values: [1, 2, 3] },
		{ name: "Diamonds", values: [1, 2, 3] },
		{ name: "Leaves", values: [1, 2, 3] },
		{ name: "Fruits", values: [1, 2, 3] },
		{ name: "Faces", values: [1, 2, 3] },
		{ name: "Animals", values: [1, 2, 3] },
		{ name: "Weather", values: [1, 2, 3] },
        { name: "Teeth", values: [1, 2, 3] },
	],
    EMOJIS: {
            Circles: ['🟢', '🔵', '🟤'],
            Squares: ['🟨', '🟥', '🟫'],
            Teeth: ['🔺', '🔻', '🔸'],
            Stars: ['⭐', '🌟', '✨'], // Representation of stars with different styles
            Hearts: ['❤️', '💛', '💚'], // Representation of hearts in different colors
            Flowers: ['🌸', '🌼', '🌺'], // Different types of flowers
            Moons: ['🌑', '🌓', '🌕'], // Phases of the moon
            Diamonds: ['💎', '🔷', '🔶'], // Diamonds and similar shapes in different colors
            Leaves: ['🍁', '🍃', '🍂'], // Types of leaves, representing different seasons
            Fruits: ['🍎', '🍌', '🍇'], // Various fruits
            Faces: ['😊', '😂', '😍'], // Different facial expressions
            Animals: ['🐶', '🐱', '🐭'], // Various small animals
            Weather: ['☀️', '☁️', '🌧️'], // Weather conditions
    },

    traitsInGame : [],
    cluePools : {},
    allClues : [],

    newGame: function() {
        this.buttonClicks = 0;
        this.cases = 0;
        this.score = 0;
        this.round = 0;
        document.getElementById("score").innerText = 0;
        this.traitsInGame = [{ name: "Circles", values: [1, 2] },{ name: "Squares", values: [1, 2] },{ name: "Stars", values: [1, 2] }];
        this.newLineup(9);
        this.drawSuspects();
    },

    newLineup: function(numSuspects) {
        this.suspectsLeft = numSuspects;
        this.suspects = this.generateSuspects(this.suspectsLeft, this.traitsInGame);
        this.perp = this.suspects[0];
        this.suspects = this.shuffleArray(this.suspects);

        this.setupCluePools();
        this.generateButtons();

        this.buttonClicks += (1+this.traitsInGame.length);
        document.getElementById("clicks").innerText = "🔍" + this.buttonClicks;

        this.cases += 1;
        document.getElementById("cases").innerText = "|  Case #" + this.cases+ "  |";


    },


    setupCluePools: function() {
        var tempAllClues = []
        this.traitsInGame.forEach(trait => {
            trait.values.forEach(value => {
                tempAllClues.push(new Clue(trait.name, value))
            })
        });
        this.allClues = this.shuffleArray(tempAllClues);
    },


    statusCheck: function() {
        var left = 0;
        this.suspects.forEach(item => {
            if (!item.eliminated) {
                left += 1;
            }
        });
        if (left == 1) {
            this.round += 1;
            if (this.buttonClicks > 0) {
                this.score += this.buttonClicks;
            }
            
            this.buttonClicks = 0;
            document.getElementById("clicks").innerText = "🔍" + this.buttonClicks;
            document.getElementById("score").innerHTML = this.score;

            if (this.round > 9) {
                setTimeout(() => {
                    window.alert("You've completed your career! You earned " + this.score + " medals!\nEnjoy retirement!");
                    this.newGame();
                }, 20);
            } else {
                setTimeout(() => { //Generate new lineup
                    //rewardScene.init();
                     this.newLineup(9);
                	this.traitsInGame = this.ALL_TRAITS.slice(0, 3+Math.floor(this.round/2));
                    this.drawSuspects();
                }, 400);
            }
        }
    },

    generateSuspects: function(count, traits) {
        var ret = []; // Start with an empty array
        var attempts = 0; // Track the number of attempts to avoid infinite loops

        // Continue generating suspects until the desired count is reached or a certain number of attempts have been made
        while (ret.length < count && attempts < count * 10) { // Adjust the multiplier as needed to balance performance and the chance of finding unique suspects
            var temp = new Person(traits);
            var isUnique = true; // Assume the new suspect is unique

            // Check the new suspect against all existing suspects in ret
            for (var i = 0; i < ret.length; i++) {
                if (temp.equalTo(ret[i])) {
                    isUnique = false; // The suspect is not unique
                    console.log("Excluded " + temp);
                    break; // No need to check further
                }
            }

            // If the suspect is unique, add it to ret
            if (isUnique) {
                ret.push(temp);
            }

            attempts++; // Increment the number of attempts
        }

        return ret;
    },


    applyClue: function(clue) {
        this.suspects.forEach((item) => {
            if (item.traits[clue.attribute] == clue.value) {
                if (!item.eliminated) {
                    item.eliminated = true;
                    this.suspectsLeft -= 1;
                }
            }
        });
    },

    updateGrid: function() {
        const grid = document.getElementById('personsGrid');
        grid.innerHTML = ''; // Clear existing grid content

        this.suspects.forEach(person => {
            console.log("adding person");
            const personDiv = document.createElement('div');
            personDiv.classList.add('person');
            personDiv.textContent = person.toString(); // Use your method to get text representation
            if (person.eliminated) {
                personDiv.classList.add('fade-out');
            }
            grid.appendChild(personDiv);
        });
    },

    drawSuspects: function() {
        this.updateGrid();
        setupGrid();
        adjustFontSize();
    },

    shuffleArray: function(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array; // This is optional, as the array is modified in place
    },

    buttonDown: function(button, element) {
    	var clue = null;
    	if (button.usable(this.suspects)){
    		clue = button.getClue();
    		this.applyClue(clue);
    		this.drawSuspects();
    		this.onButtonClick();

    	} else {
            element.classList.add("red");
            console.log("Adding Red")
        }
    },

    onButtonClick: function() {
        this.buttonClicks -= 1;
        document.getElementById("clicks").innerText = "🔍" + this.buttonClicks;
        setTimeout(() => this.statusCheck(), 100);
    },

    generateButtons: function() {
        const buttonContainer = document.getElementById('buttonContainer');
        buttonContainer.innerHTML = ''; // Clear existing buttons
        this.cluePools = []

        for (let i = 0; i < this.allClues.length; i += 2) {
            const button = document.createElement('button');
            let group = this.allClues.slice(i, i + 2);
            let temp = new CluePool(group);
            this.cluePools.push(temp);

            button.id = `button${i}`;
            button.style.fontSize = '64px';
            button.style.display = 'block';

            let name = ''
            temp.cluePool.forEach((clue) => {
                name += this.EMOJIS[clue.attribute][clue.value-1]
            });
            button.innerHTML = `Investigate ${name}`;
            temp.filterClues(this.perp);
            button.onclick = () => this.buttonDown(temp, button);


            button.classList.add("investigateButton");
            buttonContainer.appendChild(button);
        }
    }
};

caseScene.init = () => {

	/* Init Constants */
	const thisScene = document.getElementById("caseScene");

	/* Make Scene Presentable */

	/* Monopolize Visibility */
	document.querySelectorAll('.scene').forEach(scene => {
        scene.style.display = 'none';
    });
	thisScene.style.display = "block";

	caseScene.newGame();

};

caseScene.update = (dt) => {

}

caseScene.close = () => {
	
}