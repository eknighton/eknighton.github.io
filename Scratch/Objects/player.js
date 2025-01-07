class Player{
	constructor(){
		this.id = "player";
		this.name = "Ba'mit";

		this.sprite = "./Art/Characters/Demo-Hero/player_barb2.png";
		this.health = 25;
		this.maxHealth = 25;
		this.maxNail = 70;
		this.maxScratches = 12;


		//Run Variables
		this.items = [helm];

		//Turn variablles
		this.statuses = [];
		this.taken = 0;
		this.block = 0;


		this.aura = 0; // Requires tracking which enemy damaged you.
		this.turn = 0;

	}
	/*constructor({character, mods}){
		this.character = character;
		this.sprite = character.sprite;
		this.health = character.health;
		this.maxHealth = character.maxHealth;
	}*/
    initializeCanvas() {
        this.canvas = document.getElementById(this.id);
        this.canvas.style.backgroundSize = 'contain';
        this.canvas.style.backgroundRepeat = 'no-repeat';
        this.canvas.style.backgroundPosition = 'center';
        this.canvas.player = this;

        this.turn = 0;
        this.statuses = [];
        this.update();
    }
	update() {

		//Process this.taken
		this.block -= this.taken;
		if (this.block < 0){

			let temp = this.aura;
			this.aura += this.block;
			temp = temp-Math.max(this.aura,0);

			if (attacker != null){
				console.log("Giving enemy " + temp + "Block!")
				attacker.block+=temp;
			}

			if (this.aura < 0){
				this.health = this.health + this.aura;
				this.block = 0;
				this.aura = 0;
			}
			this.block = 0;
		}
    	if (this.health <= 0){
 			this.onDeath();
    	}

    	this.taken = 0;



        this.canvas.style.backgroundImage = `url(${this.sprite})`;

        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const fontSize = 20;
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = 'red';
        const text = `HP: ${this.health} | B: ${this.block}`; //  | AU: ${this.aura}
        const textX = 10;
        const textY = fontSize;
        ctx.fillText(text, textX, textY);

        /* Eventually, call updateDisplay() instead. */
        this.displayStatuses();
        this.displayDeck();
        this.displayItems();
    }
    startTurn(){
    	fingerNail = this.maxNail;
    	scratches = this.maxScratches;
    	this.block = 0;
    	this.aura = 0;
    	this.taken = 0;
    	this.turn+=1;

    	this.items.forEach(item => {
    		item.startTurn();
    	});

    	if (this.turn == 1) {
    		player.items.forEach(item => {
	            if (item.name == "Fortress") {
	                this.block += 5;
	            }
        	});
        }

    	this.update();
    }

    displayItems(){
    	/* Items must be interactable */
    	console.log("Displaying Items");
    	playerItemsUI.innerHTML = '';
    	this.items.forEach(item => {
    		const imgElement = document.createElement('img');
		    imgElement.src = item.sprite;
		    imgElement.style.marginRight = '1vh';
		    imgElement.onclick = item.onClick;
		    playerItemsUI.appendChild(imgElement);

	     	imgElement.setAttribute('data-tooltip',`<strong>${item.name}</strong><br>${item.desc}`);
	     	imgElement.addEventListener('mouseenter', (e) =>{
	     		showToolTip(e.target);
	     	});
		    playerItemsUI.addEventListener('mouseleave', hideToolTip);
    	});
    	console.log("That's all your items!");
		




    }
    displayStatuses(){
    	/* Statuses must be interactable */
    	console.log("Displaying Statuses")
    	playerStatuses.innerHTML = '';
		this.statuses.forEach(status => {
		    console.log(status.name);
		    
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
		    playerStatuses.appendChild(wrapperDiv);
		   
		    imgElement.setAttribute('data-tooltip',`<strong>${status.name}</strong><br>${status.desc}`);
	     	imgElement.addEventListener('mouseenter', (e) =>{
	     		showToolTip(e.target);
	     	});
		    imgElement.addEventListener('mouseleave', hideToolTip);


		});
    	console.log("That's all your statuses!");

    }

    displayDeck(){
    	console.log("Displaying Deck")
    	playerDeck.innerHTML = '';
    	symbols.forEach(symbol => {
    		// 1. Create the wrapper div
		    const wrapperDiv = document.createElement('div');
		    wrapperDiv.className = 'stacked-image';
		    
		    // 2. Create the img element as you did before
		    const imgElement = document.createElement('img');
		    imgElement.src = symbol.sprite;

		    // 3. Create a div to display the stack number
		    const stackNumberDiv = document.createElement('div');
		    stackNumberDiv.className = 'stack-number';
		    stackNumberDiv.innerText = -1;  //Figure out way to count cards in deck


		    // 4. Append the img and stack number div to the wrapper
		    wrapperDiv.appendChild(imgElement);
		  // wrapperDiv.appendChild(stackNumberDiv);
		    
		    // 5. Append the wrapper div to the playerStatuses container
		    playerDeck.appendChild(wrapperDiv);
		   
		    imgElement.setAttribute('data-tooltip',`<strong>${symbol.name}</strong><br>${symbol.desc}`);
	     	imgElement.addEventListener('mouseenter', (e) =>{
	     		showToolTipHigher(e.target);
	     	});
		  
    	})
    	playerDeck.addEventListener('mouseleave', hideToolTip);

    }

    onDeath(){
    	   	console.log("You Died!");
    		document.getElementById("fight-scene").style.display = "none";
    		document.getElementById("loss-scene").style.display = "block";
    }
}

