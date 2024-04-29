function giveItem(item, p = player){
	item.possesor = p;
	p.items.push(item);
	item.onGet(p);
}

function dead(p = player){
	goPanel(Dead);
}

function respawnPlayer(p = player){
	player = new p.type();
	panels = {};
	initPlayerHUD(player);
	playerHUD(player);
}

function initPlayerHUD(p = player){
	player.initHUD(p);
}

function playerHUD(p = player){
	//HUD functions take a player as a parameter.
	document.getElementById("RightHUD").innerHTML = player.HUD(p);
}

/*
	This function will become more complex
*/
function defaultPlayerHUD(ref) {
	ref.txt = 
	"❤️"+ref.HP+"/"+ref.maxHP + "\n"+concatItems(ref)
	return ref.txt
}

function defaultPlayerInitHUD(ref){
	return
}

