
let player = {

	//Health
	MaxHP : 100,
	HP : 50,
	Regen : 0,

	//Inventory
	Potions: {},
	Equiped: {},
	Items: {},

	//Abilities

	//Text Display
	txt : ""
}
function writeHUD(){
	player.txt = "❤️"+player.HP+"/"+player.MaxHP
	document.getElementById("RightHUD").innerHTML = player.txt
}


