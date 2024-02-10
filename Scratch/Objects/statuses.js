class status {
	name = "Error: Report Seeing This";
	desc = "Seeing this description is an error. Please report it.";
	sprite = "./Art/error.png";
	stacks = 1;
	onClick = () => {
		console.log("Item onClick not specified. Please report this.");
	};
	constructor(){

	}
}


lol = new status();

Aura = new status();
Aura.stacks = 0;
