function loadItemScene(){
	document.getElementById('item-scene').style.display ='flex';
}

function itemSkipFunction(){

	//Call hook

	//Close Scene
	closeItemScene();
}

function handleItem1Click(){
	console.log("If this worked, you'd be getting items!");
	closeItemScene();
}
function handleItem2Click(){
	console.log("If this worked, you'd be getting items!");
	closeItemScene();
}
function handleItem3Click(){
	console.log("If this worked, you'd be getting items!");
	closeItemScene();
}



function closeItemScene(){
	//Close the draft scene
	document.getElementById('item-scene').style.display = 'none';

	//Open next scene
	loadLvlSelect();
}