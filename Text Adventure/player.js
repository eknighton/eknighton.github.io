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
	"❤️"+ref.HP+"/"+ref.MaxHP + "\n"+
	"🪄"+ref.wand+"\n"+
	"🏹"+ref.bow+"\n"+
	"⚔"+ref.sword+"\n"+
	"🛡"+ref.shield+"\n";
	return ref.txt
}

function defaultPlayerInitHUD(ref){
	return
}
