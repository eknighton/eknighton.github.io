/*

Map Madventures Pseudocode

1. A function that determines which road to use given the nodes you selected
2. A function that updates the hud visualization after you move


2D array of letter codes representing colors in the possibility table


*/




var firstTable = [["g", "b","r"],["b","g","g"]];

var colors = {
	"g" : "green",
	"r" : "red",
	"b" : "blue"
};

drawFirstTable();


var nodesList = ["a","b","c","d"];

var nodeInfos = {
	"a" : [["g"],["g"]],
	"b" : [["g"],["g"]]
}

var roadLookup = {
	"a" : {"b": "red", "c": "red", "d": "red"},
	"b" : {"b": "red", "c": "red", "d": "red"}
};

var roadValidity = {
	"red" : true,
	"blue" : false
}

var playerCurrNode = "a";

function nodeChosen(node) {
	if (roadValidity[ roadLookup[playerCurrNode][node] ]){
		playerCurrNode = node;
		return true
	} else {
		console.log("Invalid Road")
		window.alert("You Died")
		return false
	}
}

function drawFirstTable(){

	const gridContainer = document.getElementById('grid');
    gridContainer.style.gridTemplateColumns = `repeat(${firstTable[0].length}, 50px)`; // Adjusts grid column count based on array

    firstTable.forEach(row => {
        row.forEach(cell => {
            const gridCell = document.createElement('div');
            gridCell.className = 'cell';
            gridCell.style.backgroundColor = colors[cell];
            gridContainer.appendChild(gridCell);
        });
    });
}

function updateFirstTable(){
	// We look at all the entries relating to the used road, and update them
	// All possibilities with a road being impassable get removed.
	// How do we manage the true table?
}

function nodeGetInfo(node){
	//Updates firstTable-replacing any cells with higher priority value in the table stored in nodeInfos.
}

function roadGetInfo(road){
	//Updates firstTable to remove known conflicts with known status of road
}

