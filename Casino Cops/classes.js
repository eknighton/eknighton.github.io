/* Case Scene */

class Person{
	eliminated = false;
	skin = -1;
	eyes = -1;
	hair = -1;
	shirt = -1;

	constructor(){
		this.eliminated = false;
		this.eyes = Math.ceil(Math.random()*3);
		this.skin = Math.ceil(Math.random()*3);
	}

	equalTo(suspect){
		return (
			(this.eyes == suspect.eyes) && (this.skin == suspect.skin)
		);
	}

	toString() {
        let eyeRep = ['🟢', '🔵', '🟤'][this.eyes - 1];
        let skinRep = ['🟨 ', '🟥', '🟫'][this.skin - 1];
        // Map other traits similarly
        return `${eyeRep}${skinRep}`
    }
}

class CluePool{
	cluePool = [];
	htmlement = null;
	constructor(Clues){
		this.cluePool = Clues;
		//Shuffle cluePool


		///!!!!!!!
	}
	getClue(){

		if (this.cluePool.length > 0){
			return this.cluePool.pop();
		}
		return null;
	}
	filterClues(excludedIndividual){
		var temp = [];
		this.cluePool.forEach((item) => {
			console.log(item.attribute + " : " + excludedIndividual[item.attribute] + " compared to " + item.value)
			if (excludedIndividual[item.attribute] != item.value){
				temp.push(item);
			}
		});
		this.cluePool = temp;
	}
	usable(suspectPool){

			var temp = [];
			this.cluePool.forEach((clue) => {
				var keep = false;
				suspectPool.forEach((sus) => {
					if (sus[clue.attribute] == clue.value && sus.eliminated == false){
						keep = true;
					}
				});
				if (keep){
					temp.push(clue);
				} else {
					console.log ("Removed a redundant clue!");
				}
			});
			this.cluePool = temp;
			
		return this.cluePool.length > 0;
	}
}

class Clue{
	attribute = null;
	value = null;
	constructor(att, val){
		this.attribute = att;
		this.value = val;
	}
	equalTo(otherClue){
		return this.value == otherClue[this.attribute];
	}
}
