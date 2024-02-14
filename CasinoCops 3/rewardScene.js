
var rewardScene = {}

rewardScene.init = () => {

	/* Init Constants */
	const thisScene = document.getElementById("rewardScene");

	/* Make Scene Presentable */

	/* Monopolize Visibility */
	document.querySelectorAll('.scene').forEach(scene => {
        scene.style.display = 'none';
    });
	document.getElementById("rewardScene").style.display = "block";

	/* Add Buttons */
	

	/* Add Listeners */
	document.addEventListener('keydown', function(event){
		if (event.key == ' '){
			document.getElementById("rewardScene").innerHTML = "You presed space. Whoops";
		}
	});
};

rewardScene.update = (dt) => {

}


rewardScene.close = () => {
	
}


