class Enemy {
    constructor({id, sprite, health}) {
        this.id = id;
        this.name = "Svenyeer";
        this.sprite = sprite;
        this.health = health;
        this.maxHealth = health;
        this.alive = true;
        this.turns = 0;
        this.moves = [];

        //Display Variables
        this.statusElement = document.getElementById('enemy1-statuses');

        //Turn Variables
        this.statuses = [];
        this.intent = "A6";
        this.taken = 0;
        this.block = 0;
    }

    initializeCanvas() {
        console.log ("initalizing " +this.id);
        // Set up the canvas and associate with the enemy object
        this.canvas = document.getElementById(this.id);
        this.canvas.style.display = "flex";
        this.canvas.style.backgroundImage = `url(${this.sprite})`;
        this.canvas.enemy = this; // It's more typical to associate the canvas with its owner

        // Style the canvas
        this.canvas.style.backgroundSize = 'contain';
        this.canvas.style.backgroundRepeat = 'no-repeat';
        this.canvas.style.backgroundPosition = 'center';

 		this.update()
    }
    update() {

    	//Process this.taken
    	this.block = this.block - this.taken;
		if (this.block < 0){
			this.health = this.health + this.block;
			this.block = 0;
		}
    	if (this.health < 1){
            this.canvas.style.display = "none";
    		onEnemyDeath();
    	}
    	this.taken = 0;

        if (this.health > this.maxHealth){
            this.health = this.maxHealth;
        }



        this.canvas.style.backgroundImage = `url(${this.sprite})`;
        const ctx = this.canvas.getContext('2d');

        // Clear the entire canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw Health & Block
        const fontSize = 20;
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = 'red';
        const text = `HP: ${this.health} | B: ${this.block}`;
        const textX = 10;
        const textY = fontSize;
        ctx.fillText(text, textX, textY);

        //Draw Intent
        ctx.fillText(this.intent, this.canvas.width-ctx.measureText(this.intent).width, textY);

        this.displayStatuses();

    }
    doTurn() {
    	if (this.health < 1){
    		return;
    	}
    	this.taken = 0;
    	this.block = 0;
    	player.taken = 6;
        this.update();
    	console.log("Enemy did turn.")
    }
    endTurn(){
        this.turns = this.turns +1;
        this.update();
    }

    displayStatuses(){
        /* Statuses must be interactable */
        this.statusElement.innerHTML = '';
        this.statuses.forEach(status => {
            
            // 1. Create the wrapper div
            const wrapperDiv = document.createElement('div');
            wrapperDiv.className = 'stacked-image';
            
            // 2. Create the img element as you did before
            const imgElement = document.createElement('img');
            imgElement.src = status.sprite;
            imgElement.onclick = status.onClick;
            
            // 3. Create a div to display the stack number
            const stackNumberDiv = document.createElement('div');
            stackNumberDiv.className = 'stack-number';
            stackNumberDiv.innerText = status.stacks;  // assuming status.stacks contains the number

            // 4. Append the img and stack number div to the wrapper
            wrapperDiv.appendChild(imgElement);
            wrapperDiv.appendChild(stackNumberDiv);
            
            // 5. Append the wrapper div to the playerStatuses container
            this.statusElement.appendChild(wrapperDiv);

           
            imgElement.setAttribute('data-tooltip',`<strong>${status.name}</strong><br>${status.desc}`);
            imgElement.addEventListener('mouseenter', (e) =>{
                showToolTip(e.target);
            });
            imgElement.addEventListener('mouseleave', hideToolTip);

        });

        }
}

function onEnemyDeath(){
	console.log("enemy slain!");
	lvlEnemiesAlive = 	lvlEnemiesAlive - 1;
	if (lvlEnemiesAlive < 1){
		//Change Scene
		document.getElementById("fight-scene").style.display = 'none';
		loadDraftScene()
	}
}

class EnemyBoy extends Enemy{ 

    name = "Svenyeer"

    constructor(){
        const presets = {id : "enemy1",
        sprite : "./Art/Enemies/enemy_boy.png",
        health : 13};
        super(presets);
        this.moves = [
        [() => {player.taken = 6; player.update()}, "A6"],
        [() => {this.block += 12;}, "B12"],
        [() => {player.taken = 12; player.update()}, "A1692"],
        [() => {player.taken = 24; player.update()}, "A24"]
        ];
        this.intent = this.moves[0][1];
    }
    doTurn(){
        if (this.health < 1){
            return;
        }
        this.taken = 0;
        this.block = 0;

        this.moves[this.turns][0]();
        this.update();
        
        console.log("Enemy did turn.")
    }
    endTurn(){
        this.turns = (this.turns +1)%this.moves.length;
        console.log(this.id + " turns: " + this.turns);
        this.intent = this.moves[this.turns][1]
        this.update();
    }
};

class EnemyTwo extends Enemy{ 

    name = "Io"; //"Itchygo";

    constructor(myID){
        const presets = {id : myID,
        sprite : "./Art/Enemies/io.png",
        health : 12};
        super(presets);
        this.block = 7;
        this.moves = [
        [() => {player.taken = 12; player.update(); this.block += 7;}, "A12 B7"],
        [() => {this.block += 12; }, "B12"],
        [() => {player.taken = 12; player.update(); this.block += 7;}, "A6 B7"],
        [() => {player.taken = 12; player.update()}, "A12"]
        ];
        this.intent = this.moves[0][1];
    }
    doTurn(){
        if (this.health < 1){
            return;
        }
        this.taken = 0;
        this.block = 0;

        this.moves[this.turns][0]();
        this.update();
        
        console.log("Enemy did turn.")
    }
    endTurn(){
        this.turns = (this.turns +1)%this.moves.length;
        console.log(this.id + " turns: " + this.turns);
        this.intent = this.moves[this.turns][1]
        this.update();
    }
};

class EnemyThree extends Enemy{ 

    name = "Flea";

    constructor(myID){
        const presets = {id : myID,
        sprite : "./Art/Enemies/flea.png",
        health : 25};
        super(presets);
        this.moves = [
        [() => {player.taken = 12; player.update()}, "A12"],
        [() => {this.block += 12;}, "B12"],
        [() => {player.taken = 12; player.update()}, "A12"],
        [() => {this.block += 12;}, "B12"],
        [() => {player.taken = 12; player.update()}, "A12"],
        [() => {this.block += 12;}, "B12"],
        [() => {player.taken = 12; player.update()}, "A12"]
        ];
        this.intent = this.moves[0][1];
    }
    doTurn(){
        if (this.health < 1){
            return;
        }
        this.taken = 0;
        this.block = 0;

        this.moves[this.turns][0]();
        this.update();
        
        console.log("Enemy did turn.")
    }
    endTurn(){
        this.turns = (this.turns +1)%this.moves.length;
        console.log(this.id + " turns: " + this.turns);
        this.intent = this.moves[this.turns][1]
        this.update();
    }
};

class EnemyFour extends Enemy{ 

    name = "Chi-Ken";

    constructor(myID){
        const presets = {id : myID,
        sprite : "./Art/Enemies/chi-ken.png",
        health : 32};
        super(presets);
        this.moves = [
        [() => {player.taken = 6; player.update(); this.block += 6;}, "A6 B6"],
        [() => {player.taken = 12; player.update(); this.block += 6;}, "A12 B6"],
        [() => {player.taken = 6; player.update(); this.block += 12;}, "A6 B12"],
        [() => {player.taken = 12; player.update(); this.block += 0;}, "A12"],
        [() => {player.taken = 12; player.update(); this.block += 12;}, "A12 B12"],

        ];
        this.intent = this.moves[0][1];
    }
    doTurn(){
        if (this.health < 1){
            return;
        }
        this.taken = 0;
        this.block = 0;

        this.moves[this.turns][0]();
        this.update();
        
        console.log("Enemy did turn.")
    }
    endTurn(){
        this.turns = (this.turns +1)%this.moves.length;
        console.log(this.id + " turns: " + this.turns);
        this.intent = this.moves[this.turns][1]
        this.update();
    }
};

class EnemyFive extends Enemy{ 

    name = "Ba'Ak";

    constructor(myID){
        const presets = {id : myID,
        sprite : "./Art/Enemies/back.png",
        health : 32};
        super(presets);
        this.moves = [
        [() => {player.taken = 6; player.update(); this.block += 6; this.health += 3}, "A6 B6 H3"],
        [() => {player.taken = 12; player.update(); this.block += 6; this.health += 3}, "A12 B6 H3"],
        [() => {player.taken = 6; player.update(); this.block += 12; this.health += 3}, "A6 B12 H3"],
        [() => {player.taken = 12; player.update(); this.block += 0; this.health += 3}, "A12 H3"],
        [() => {player.taken = 12; player.update(); this.block += 0; this.health += 3}, "A12 B12 H3"],

        ];
        this.intent = this.moves[0][1];
    }
    doTurn(){
        if (this.health < 1){
            return;
        }
        this.taken = 0;
        this.block = 0;

        this.moves[this.turns][0]();
        this.update();
        
        console.log("Enemy did turn.")
    }
    endTurn(){
        this.turns = (this.turns +1)%this.moves.length;
        console.log(this.id + " turns: " + this.turns);
        this.intent = this.moves[this.turns][1]
        this.update();
    }
};

class EnemySix extends Enemy{ 

    name = "Ba'Ahalls";

    constructor(myID){
        const presets = {id : myID,
        sprite : "./Art/Enemies/sack.png",
        health : 30};
        super(presets);
        this.block = 12;
        this.moves = [
        [() => {player.taken = 6; player.update(); this.block += 12; this.health += 0}, "A6 B12"],
        [() => {player.taken = 6; player.update(); this.block += 12; this.health += 0}, "A6 B12"],
        [() => {player.taken = 6; player.update(); this.block += 12; this.health += 0}, "A6 B12"],
        [() => {player.taken = 0; player.update(); this.block += 0; this.health += 18}, "H18"],
        [() => {player.taken = 18; player.update(); this.block += 0; this.health += 0}, "A18"]
        ];
        this.intent = this.moves[0][1];
    }
    doTurn(){
        if (this.health < 1){
            return;
        }
        this.taken = 0;
        this.block = 0;

        this.moves[this.turns][0]();
        this.update();
        
        console.log("Enemy did turn.")
    }
    endTurn(){
        this.turns = (this.turns +1)%this.moves.length;
        console.log(this.id + " turns: " + this.turns);
        this.intent = this.moves[this.turns][1]
        this.update();
    }
};

class EnemySeven extends Enemy{ 

    name = "Bastet";

    constructor(myID){
        const presets = {id : myID,
        sprite : "./Art/Enemies/bastet.png",
        health : 24};
        super(presets);
        this.block = 6;
        this.moves = [
        [() => {player.taken = 18; player.update(); this.block += 24; this.health += 0}, "A18 B24"],
        [() => {player.taken = 15; player.update(); this.block += 0; this.health += 0}, "A15"],
        [() => {player.taken = 10; player.update(); this.block += 24; this.health += 0}, "A10 B24"],
        [() => {player.taken = 10; player.update(); this.block += 0; this.health += 12}, "A10 H12"],
        [() => {player.taken = 0; player.update(); this.block += 0; this.health += 24}, "H24"],
        ];
        this.intent = this.moves[0][1];
    }
    doTurn(){
        if (this.health < 1){
            return;
        }
        this.taken = 0;
        this.block = 0;

        this.moves[this.turns][0]();
        this.update();
        
        console.log("Enemy did turn.")
    }
    endTurn(){
        this.turns = (this.turns +1)%this.moves.length;
        console.log(this.id + " turns: " + this.turns);
        this.intent = this.moves[this.turns][1]
        this.update();
    }
};

class EnemyEight extends Enemy{ 

    name = "Ivy";

    constructor(myID){
        const presets = {id : myID,
        sprite : "./Art/Enemies/ivy.png",
        health : 19};
        super(presets);
        this.block = 6;
        this.moves = [
        [() => {player.taken = 15; player.update(); this.block += 20; this.health += 0}, "A15 B20"],
        [() => {player.taken = 0; player.update(); this.block += 6; this.health += 6}, "B6 H6"],
        [() => {player.taken = 15; player.update(); this.block += 20; this.health += 0}, "A15 B20"],
        [() => {player.taken = 0; player.update(); this.block += 6; this.health += 6}, "B6 H6"],
        [() => {player.taken = 15; player.update(); this.block += 20; this.health += 0}, "A15 B20"],
        [() => {player.taken = 0; player.update(); this.block += 6; this.health += 6}, "B6 H6"],
        [() => {player.taken = 15; player.update(); this.block += 20; this.health += 0}, "A15 B20"],
        [() => {player.taken = 0; player.update(); this.block += 6; this.health += 20}, "B6 H6"],
        [() => {player.taken = 30; player.update(); this.block += 0; this.health += 0}, "A30"],
        ];
        this.intent = this.moves[0][1];
    }
    doTurn(){
        if (this.health < 1){
            return;
        }
        this.taken = 0;
        this.block = 0;

        this.moves[this.turns][0]();
        this.update();
        
        console.log("Enemy did turn.")
    }
    endTurn(){
        this.turns = (this.turns +1)%this.moves.length;
        console.log(this.id + " turns: " + this.turns);
        this.intent = this.moves[this.turns][1]
        this.update();
    }
};


