players['PlayerNoob'] = PlayerNoob;
var PlayerNoob = function make() {
  return {
		//Util

		get self(){ // This is blackmagicfuckery that gives obj a self PROPERTY, not a function.
			return this;
		},
		id: make.name,
		maker: make,
		HUD: defaultPlayerHUD, //Function that updates HUD
		initHUD: defaultPlayerInitHUD, //Function that inits HUD elements as children of rightHUD

		//Health
		maxHP : 100,
		HP : 50,
		regen : 0,

		//Inventory
		potions: [],
		equiped: {},
		items: [],

		//Abilities

		//Weapons
		wand: 5,
		bow: 5,
		sword: 10,
		shield: 5,

		//Text Display
		txt: ""
	};
}