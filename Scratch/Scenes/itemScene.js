let itemOptions = [];

function loadItemScene(){
	document.getElementById('item-scene').style.display = 'none';
	//Pick what cards to offer

	//Set card div fields

	//Set draft-scene display to flex

	itemOptions = [];

	let sym = null

	sym = getRandomItem(allItems); //later on this can be character-estricted, weighted, etc

	document.getElementById('item1-img').src = sym.sprite;
	document.getElementById('item1-title').innerText = sym.name;
	document.getElementById('item1-desc').innerText = sym.desc;
	itemOptions.push(sym);

	while(itemOptions.includes(sym)){
		sym = getRandomItem(allItems); //later on this can be character-estricted, weighted, etc
	}
	document.getElementById('item2-img').src = sym.sprite;
	document.getElementById('item2-title').innerText = sym.name;
	document.getElementById('item2-desc').innerText = sym.desc;
	itemOptions.push(sym);

	while(itemOptions.includes(sym)){
		sym = getRandomItem(allItems); //later on this can be character-estricted, weighted, etc
	}
	document.getElementById('item3-img').src = sym.sprite
	document.getElementById('item3-title').innerText = sym.name;
	document.getElementById('item3-desc').innerText = sym.desc;
	itemOptions.push(sym);

	document.getElementById('item-scene').style.display = 'flex';


}

function itemSkipFunction(){

	//Call hook

	//Close Scene
	closeItemScene();
}


function handleItem1Click(){
	player.items.push(itemOptions[0]);
	closeItemScene();
}
function handleItem2Click(){
	player.items.push(itemOptions[1]);
	closeItemScene();
}
function handleItem3Click(){
	player.items.push(itemOptions[2]);
	closeItemScene();
}



function closeItemScene(){
	//Close the draft scene
	document.getElementById('item-scene').style.display = 'none';

	//Open next scene
	loadLvlSelect();
}