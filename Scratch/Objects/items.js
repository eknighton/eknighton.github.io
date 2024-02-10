class item {

	name = "Error: Null item. Report this."
	sprite = "./Art/error.png";
	desc = "Seeing this description is a bug, report it."
	onClick = () => {
		console.log("Error: onclick not defined for this item. Please Report.")
	}

	constructor(){
		return;
	}
	startTurn = () => {
		return;
	}

}

let shield = new item();
shield.name = "Shield"
shield.sprite = './Art/Items/shield.png'
shield.desc = 'Grants 1 error whenever you start a turn.'
shield.startTurn = () => {
	player.statuses.push(lol);
}