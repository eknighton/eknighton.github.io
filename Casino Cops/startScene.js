
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


	var startButton = document.createElement('div');
	startButton.innerHTML = "Start Game";
	thisScene.appendChild(startButton);

	document.addEventListener('keydown', function(event){
		if (event.key == ' '){
			document.getElementById("startScene").innerText = "Bye";
		}
	});
};

startScene.update = (dt) => {

}


