
var caseScene = {}

caseScene.init = () => {

	/* Init Constants */
	const thisScene = document.getElementById("caseScene");

	/* Make Scene Presentable */

	thisScene.innerHTML = "";

	/* Monopolize Visibility */
	document.querySelectorAll('.scene').forEach(scene => {
        scene.style.display = 'none';
    });
	thisScene.style.display = "block";

	/* Add Buttons */
	var startButton = document.createElement('button');
	startButton.innerHTML = "Do Game";
	startButton.classList.add("startMenuButton");
	startButton.onclick = function() {
		thisScene.innerHTML = "Game Unable to Start";
	};
	thisScene.appendChild(startButton);

	/* Add Listeners */
	document.addEventListener('keydown', function(event){
		if (event.key == ' '){
			thisScene.innerHTML = "You presed space. Whoops";
		}
	});
};

caseScene.update = (dt) => {

}

startScene.close = () => {
	
}
