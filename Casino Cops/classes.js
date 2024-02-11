/* Case Scene */

class Person {
    constructor() {
        this.eliminated = false;
        this.traits = {
            eyes: Math.ceil(Math.random() * 3),
            skin: Math.ceil(Math.random() * 3),
        };
    }

    setTrait(trait, value) {
        this.traits[trait] = value;
    }

    equalTo(suspect) {
        for (let trait in this.traits) {
            if (this.traits[trait] !== suspect.traits[trait]) {
                return false;
            }
        }
        return true;
    }

    toString() {
        const representations = {
            eyes: ['🟢', '🔵', '🟤'],
            skin: ['🟨', '🟥', '🟫']
        };

        return Object.keys(this.traits).reduce((acc, trait) => {
            const index = this.traits[trait] - 1;
            const rep = representations[trait] ? representations[trait][index] : '?';
            return acc + rep;
        }, '');
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
			console.log(item.attribute + " : " + excludedIndividual.traits[item.attribute] + " compared to " + item.value)
			if (excludedIndividual.traits[item.attribute] != item.value){
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
					if (sus.traits[clue.attribute] == clue.value && sus.eliminated == false){
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
