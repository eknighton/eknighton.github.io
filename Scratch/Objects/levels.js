class Level{
	enemies = [];
	constructor(enemies){
		this.enemies = enemies;
	}
	load(){
		lvlEnemies = this.enemies;
		document.getElementById('fight-title').innerText = player.name + " Vs " + lvlEnemies[0].name;
	}
	reward = () => {}
}

let lvl1 = new Level([new EnemyBoy()]);
lvl1.reward = () => {loadItemScene()};

let lvl2 = new Level([new EnemyTwo("enemy1")]);
lvl2.reward = () => {loadDraftScene()};

let lvl3 = new Level([new EnemyThree("enemy1")]);
lvl3.reward = () => {loadItemScene()};

let lvl4 = new Level([new EnemyFour("enemy1")]);
lvl4.reward = () => {loadDraftScene()};

let lvl5 = new Level([new EnemyFive("enemy1")]);
lvl5.reward = () => {loadItemScene()};

let lvl6 = new Level([new EnemySix("enemy1")]);
lvl6.reward = () => {loadDraftScene()};

let lvl7 = new Level([new EnemySeven("enemy1")]);
lvl7.reward = () => {loadItemScene()};

let lvl8 = new Level([new EnemyEight("enemy1")]);
lvl8.reward = () => {loadDraftScene()};

let lvl9 = new Level([new EnemyBoy("enemy1")]);


let lvl10 = new Level([new EnemyFive("enemy1")]);


let lvl11 = new Level([new EnemyThree("enemy1")]);


let lvl12 = new Level([new EnemyFour("enemy1")]);


let lvl13 = new Level([new EnemyTwo("enemy1")]);


let lvl14 = new Level([new EnemyThree("enemy1")]);





class DemoEnd extends Level{
	constructor(){
		enemies = []
	}
	load(){

	}
}


const allLevels = [
	lvl1,
	lvl2,
	lvl3,
	lvl4,
	lvl5,
	lvl6,
	lvl7,
	lvl8
];
/*
	
	lvl9,
	lvl10,
	lvl11,
	lvl12,
	lvl13,
	lvl14
*/