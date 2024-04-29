class PlayerNoob {
    constructor() {
        // Utility
        this.type = this.constructor;

        // Presuming defaultPlayerHUD and defaultPlayerInitHUD are defined somewhere in your scope
        this.HUD = defaultPlayerHUD; // Function that updates HUD
        this.initHUD = defaultPlayerInitHUD; // Function that inits HUD elements as children of rightHUD

        // Health
        this.maxHP = 100;
        this.HP = 50;
        this.regen = 0;

        // Inventory
        this.potions = [];
        this.equiped = {};
        this.items = [];

        // Abilities (left empty as in the original function)

        // Weapons
        this.wand = 5;
        this.bow = 5;
        this.sword = 10;
        this.shield = 5;

        // Text Display
        this.txt = "";
    }
}

/* players['PlayerNoob'] = PlayerNoob;
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
}*/