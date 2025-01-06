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
shield.desc = 'Grants 1 block whenever you start a turn.'
shield.startTurn = () => {
	player.block = player.block+1;
}

let heart = new item();
heart.name = "Indomptable"
heart.sprite = './Art/Items/heart.png'
heart.desc = "If you start a turn with less than 7 health, gain 1 health."
heart.startTurn = () => {
	if (player.health < 7){
		player.health = player.health + 1;
	}
}

let flame = new item();
flame.name = "Inferno"
flame.sprite = './Art/Items/flame.png'
flame.desc = "Deal 1 damage to all enemies at start of turn."
flame.startTurn = () => {
	lvlEnemies.forEach(enemy => {
		enemy.taken = 1;
		enemy.update();
	})
}


let allItems = [];
allItems.push(shield);
allItems.push(heart);
allItems.push(flame);