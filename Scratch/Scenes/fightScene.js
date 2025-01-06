

//Load new enemies, call player and enemy inits, ... ? what else


// We need to declare a new player and a new enemy, then call init for each


function loadFightScene(){

    endFight();

    if (level == null){
        loadWinScene();
        return;
    }
    
    level.load()
    lvlEnemies.forEach(enemy => {
        enemy.initializeCanvas();
        //initializeEnemy(enemy);
    });
    lvlEnemiesAlive = lvlEnemies.length;


    player.initializeCanvas();

    document.getElementById('fight-scene').style.display = 'flex';
    setupPhase();
}