function giveItem(item, p = player){
	item.possesor = p;
	p.items.push(item);
	item.onGet(p);
}

function killPlayer(p = player){
	
}

function initPlayerHUD(){
	player.initHUD(player);
}

function playerHUD(){
	//HUD functions take a player as a parameter.
	document.getElementById("RightHUD").innerHTML = player.HUD(player);
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

