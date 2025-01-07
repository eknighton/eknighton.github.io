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

let helm = new item();
helm.name = "Helmet"
helm.sprite = './Art/Items/helmet.png'
helm.desc = 'Grants 1 block whenever you start a turn.'
helm.startTurn = () => {
	player.block = player.block+1;
}

let heart = new item();
heart.name = "Indomptable"
heart.sprite = './Art/Items/heart.png'
heart.desc = "If you start a turn with less than 12 health, gain 1 health."
heart.startTurn = () => {
	if (player.health < 12){
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

let shield = new item();
shield.name = "Shield"
shield.sprite = './Art/Items/shield.png'
shield.desc = 'Shields give 1 more block.'
//Awarded by counting

let tower = new item();
tower.name = "Fortress"
tower.sprite = './Art/Items/tower.png'
tower.desc = 'Gain 5 block at the start of each combat.'
//Awarded by counting


let allItems = [];
allItems.push(shield);
allItems.push(heart);
allItems.push(flame);
allItems.push(helm);
allItems.push(tower);