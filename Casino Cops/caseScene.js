
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
    traitsInGame : [{ name: "Circles", values: [1, 2, 3] },{ name: "Squares", values: [1, 2, 3] }],
    cluePools : {},

    newGame: function() {
        this.buttonClicks = 0;
        this.cases = 0;
        this.score = 0;
        this.round = 0;
        document.getElementById("score").innerText = 0;
        this.newLineup(9);
        this.drawSuspects();
    },

    newLineup: function(numSuspects) {
        this.suspectsLeft = numSuspects;
        this.suspects = this.generateSuspects(this.suspectsLeft);
        this.perp = this.suspects[0];
        this.suspects = this.shuffleArray(this.suspects);

        this.buttonClicks += 4;
        document.getElementById("clicks").innerText = "🔍" + this.buttonClicks;

        this.cases += 1;
        document.getElementById("cases").innerText = "Case #" + this.cases;

        this.button1 = new CluePool([new Clue('eyes', 1), new Clue('eyes', 2), new Clue('eyes', 3)]);
        this.button1.filterClues(this.perp);
        this.button2 = new CluePool([new Clue('skin', 1), new Clue('skin', 2), new Clue('skin', 3)]);
        this.button2.filterClues(this.perp);
        this.setupCluePools();
        this.generateButtons();
    },

    setupCluePools: function() {
        this.traitsInGame.forEach(trait => {
            // Assuming trait is an object like { name: "eyes", values: [1, 2, 3] }
            this.cluePools[trait.name] = new CluePool(trait.values.map(value => new Clue(trait.name, value)));
            this.cluePools[trait.name].filterClues(this.perp);
        });
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
            this.score += this.buttonClicks;
            this.buttonClicks = 0;
            document.getElementById("clicks").innerText = "🔍" + this.buttonClicks;
            document.getElementById("score").innerHTML = this.score;

            if (this.round > 9) {
                setTimeout(() => {
                    window.alert("You've completed your career! You earned " + this.score + " medals!\nEnjoy retirement!");
                    this.newGame();
                }, 20);
            } else {
                setTimeout(() => {
                    this.newLineup(9);
                    this.drawSuspects();
                }, 400);
            }
        }
    },

    generateSuspects: function(count) {
        var P = new Person();
        var ret = [P];
        var temp;
        while (ret.length < count) {
            temp = new Person();
            if (!temp.equalTo(P)) {
                ret.push(temp);
            } else {
                console.log("Excluded " + temp);
            }
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
                personDiv.textContent = " ";
            }
            grid.appendChild(personDiv);
        });
    },

    drawSuspects: function() {
        this.updateGrid();
    },

    shuffleArray: function(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array; // This is optional, as the array is modified in place
    },

    buttonDown: function(button) {
    	var clue = null;
    	if (button.usable(this.suspects)){
    		clue = button.getClue();
    		this.applyClue(clue);
    		this.drawSuspects();
    		this.onButtonClick();
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

        this.traitsInGame.forEach((trait, index) => {
            const button = document.createElement('button');
            button.id = `button${index + 1}`;
            button.innerHTML = `Investigate ${trait.name}`;
            button.style.fontSize = '64px';
            button.onclick = () => this.buttonDown(this.cluePools[trait.name]);
            button.style.display = 'block';
            buttonContainer.appendChild(button);
        });
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