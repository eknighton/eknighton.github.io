
var startScene = {}

startScene.init = () => {

	/* Init Constants */
	const thisScene = document.getElementById("startScene");

	/* Make Scene Presentable */

	thisScene.innerHTML = "";

	/* Monopolize Visibility */
	document.querySelectorAll('.scene').forEach(scene => {
        scene.style.display = 'none';
    });
	document.getElementById("startScene").style.display = "block";

	/* Add Buttons */
	var startButton = document.createElement('button');
	startButton.innerHTML = "Start Game";
	startButton.classList.add("startMenuButton");
	startButton.onclick = function() {
		caseScene.init();
	};
	thisScene.appendChild(startButton);

	/* Add Listeners */
	document.addEventListener('keydown', function(event){
		if (event.key == ' '){
			document.getElementById("startScene").innerHTML = "You presed space. Whoops";
		}
	});
};

startScene.update = (dt) => {

}


startScene.close = () => {
	
}


