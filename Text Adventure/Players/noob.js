function playerNoob() {
	return {

	//Util
	Self: null,
	HUD: defaultPlayerHUD,
	initHUD: defaultPlayerInitHUD,

	//Health
	MaxHP : 100,
	HP : 50,
	Regen : 0,

	//Inventory
	Potions: {},
	Equiped: {},
	Items: {},

	//Abilities

	//Weapons
	wand: 5,
	bow: 5,
	sword: 10,
	shield: 5,

	//Text Display
	txt: ""
	}
}