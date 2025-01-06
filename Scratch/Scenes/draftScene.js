let options = [];

function loadDraftScene(){
	document.getElementById('draft-scene').style.display = 'none';
	//Pick what cards to offer

	//Set card div fields

	//Set draft-scene display to flex

	options = [];

	let sym = null

	sym = getRandomItem(allSymbols); //later on this can be character-estricted, weighted, etc

	document.getElementById('card1-img').src = sym.sprite;
	document.getElementById('card1-title').innerText = sym.name;
	document.getElementById('card1-desc').innerText = sym.desc;
	options.push(sym);

	while(options.includes(sym)){
		sym = getRandomItem(allSymbols); //later on this can be character-estricted, weighted, etc
	}
	document.getElementById('card2-img').src = sym.sprite;
	document.getElementById('card2-title').innerText = sym.name;
	document.getElementById('card2-desc').innerText = sym.desc;
	options.push(sym);

	while(options.includes(sym)){
		sym = getRandomItem(allSymbols); //later on this can be character-estricted, weighted, etc
	}
	document.getElementById('card3-img').src = sym.sprite
	document.getElementById('card3-title').innerText = sym.name;
	document.getElementById('card3-desc').innerText = sym.desc;
	options.push(sym);

	player.displayDeckDraft();
	document.getElementById('draft-scene').style.display = 'flex';


}




function cardSkipFunction(){

	//Call hook

	//Close Scene
	closeDraftScene();
}


function handleCard1Click(){
	console.log(options[0].title);
	symbols.push(options[0]);
	closeDraftScene();
}
function handleCard2Click(){
	console.log(options[1].title);
	symbols.push(options[1]);
	closeDraftScene();
}
function handleCard3Click(){
	console.log(options[2].title);
	symbols.push(options[2]);
	closeDraftScene();
}

function closeDraftScene(){
	//Close the draft scene
	document.getElementById('draft-scene').style.display = 'none';
	console.log(symbols);

	//Open next scene
	loadLvlSelect();
}