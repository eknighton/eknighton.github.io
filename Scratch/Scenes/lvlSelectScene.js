let lvlIndex = 0;

function loadLvlSelect(){
	selectLevel();
	loadFightScene();
}

function selectLevel(){
	lvlIndex = lvlIndex +1;
	level = allLevels[lvlIndex];
}