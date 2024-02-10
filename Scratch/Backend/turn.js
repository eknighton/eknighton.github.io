let actions = 0;


function moveSelected(e){
    if (!selectedItem.actions || !isDragging) return; // Check the condition here

    hideToolTip();
    let x = e.clientX;
    let y = e.clientY;
    selectedItem.style.left = `${x - startingX}px`;
    selectedItem.style.top = `${y - startingY}px`;
    checkCollisions(selectedItem);
}

function select(e){
    e.target.style.zIndex = 900;
    if (!selectedItem.actions) return; // Check the condition here
    isDragging = true;
    startingX = e.clientX; //- selectedItem.getBoundingClientRect().left;
    startingY = e.clientY; //- selectedItem.getBoundingClientRect().top; 
}

function deselect(e){

}

function performScratch(e, canvas) {

    if (canvas == null || gameState.phase != 'scratching'){
        return;
    }
    let ctx = canvas.getContext('2d');
    let rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let test = getRevealedPercentage(ctx, canvas.width, canvas.height);

    if (spacebarDown) { 
        doScratch(e, canvas, x, y, true);
    } else if (test < revealThreshold) {
        const scratchCards = document.querySelectorAll('.scratch-card');
        scratchCards.forEach(cardCanvas => {
             let ctx = cardCanvas.getContext('2d');
             let revealedPercentage = getRevealedPercentage(ctx, cardCanvas.width, cardCanvas.height);
                if (revealedPercentage < canvas.symbol.getMaxReveal()) {
                    doScratch(e, cardCanvas, x, y, true);
                }
               
        });
        test = getRevealedPercentage(ctx, canvas.width, canvas.height);
        updateScratchBar(Math.min(Math.floor(100*(test/revealThreshold)), 100));
    } else {
        revealSlot(canvas);
    }

}

function doScratch(e, canvas, x, y, safe) {

    if (gameState.revealed.length >= revealMax){
        return;
    }

    let ctx = canvas.getContext('2d');
    let revealedPercentage = getRevealedPercentage(ctx, canvas.width, canvas.height);

    if (safe && revealedPercentage >= canvas.symbol.getMaxReveal()){
        isDrawing = false;
        isDragging = false;
        interactType = null;
        selectedItem = null;
        return;
    }

    let rect = canvas.getBoundingClientRect();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.arc(x, y, 15, 0, Math.PI * 2, false);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y);

    revealedPercentage = getRevealedPercentage(ctx, canvas.width, canvas.height);

    //Update Fingernail
    fingerNail = fingerNail + canvas.lastRevealPercent - revealedPercentage;
    canvas.lastRevealPercent = revealedPercentage;
    document.getElementById('finger-nail').innerText = fingerNail;
    console.log(fingerNail);

    if (safe && revealedPercentage >= canvas.symbol.getMaxReveal()){
        isDrawing = false;
        isDragging = false;
        interactType = null;
        selectedItem = null;
        return;
    }

    if (revealedPercentage > canvas.symbol.getMaxReveal()) {
        if (canvas.revealed) {

        } else {
            revealSlot(canvas);
        }

    }
}

function updateScratchBar(percentage) {
    const resourceBar = document.querySelector('.scratch-bar');
    const resourcePercentageText = document.querySelector('.scratch-percentage');

    // Adjust width of the bar based on percentage
    resourceBar.style.width = `${percentage}%`;

    // Update the percentage text
    resourcePercentageText.textContent = `${percentage}%`;
}

function revealSlot(canvas){


            /* Flag Check */
            if (canvas.revealed){
                return;
            }

            if (gameState.revealed.length >= revealMax){
                gameState.phase = "action";
                return tryEndTurn();
            } 

            canvas.revealed = true;


            let ctx = canvas.getContext('2d');

            //Manage Symbols
            actions = actions + canvas.symbol.getActions();
            canvas.actions = canvas.symbol.getCanvasActions();
            canvas.symbol.reveal(); //Any effects symbol has when revealed

            //Autoclear Canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.setAttribute('data-tooltip',`<strong>${canvas.symbol.name}</strong><br>${canvas.symbol.desc}`);

            //Add to revealed
            gameState.revealed.push([canvas.id, canvas.style.backgroundImage])

            //Manage Fingernail
            canvas.lastRevealPercent = 100;

            //Check scratch phase complete
            if (gameState.revealed.length >= revealMax){
                gameState.phase = "action";
                tryEndTurn();
            }

            showToolTip(canvas);

            isDrawing = false;
            isDragging = false;
            interactType = null;
            selectedItem = null;
            return;
}

function disableSlot(canvas){
    canvas.setAttribute('data-tooltip',`${"This item can no longer be used."}`);
}

function setupPhase() {

    gameState.turn = 'player';
    updateScratchBar(0);

    document.querySelectorAll('.scratch-card').forEach(canvas => {
        const ctx = canvas.getContext('2d');
        canvas.revealed = false;
        canvas.revealedPercentage = 0;
        canvas.actions = 0;
        canvas.lastRevealPercent = canvas.revealedPercentage;

        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        canvas.symbol = getRandomSymbol();
        canvas.style.backgroundImage = `url(${canvas.symbol.sprite})`;

        ctx.fillStyle = "#333333";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        canvas.setAttribute('data-tooltip','');
        showToolTip(canvas);

    });

    player.startTurn();

    //Update Fingernail Display
    document.getElementById('finger-nail').innerText = fingerNail;
    //document.getElementById('scratches').innerText = scratches;

    //Say it is ur turn
    document.getElementById('fight-info').style.color = '#33FF33';   
    document.getElementById('fight-info').innerText = "Your Turn!";

    //Allow Scratching
    gameState.phase = 'scratching';
}

function tryEndTurn(){
    if (actions < 1 && gameState.phase != 'scratching') {
        endPhase();
    } else {
        //console.log("Failed to end turn: Actions: "+ actions + " Phase: " + gameState.phase);
    }
}

function endPhase() {
    selectedItem = null;
    isDrawing = false;
    isDragging = false;
    gameState.revealed = [];
    actions = 0;

    enemyTurn();
}

function endFight(){
    selectedItem = null;
    isDrawing = false;
    isDragging = false;
    gameState.revealed = [];
    actions = 0;
}


function enemyTurn(){

    let hasEnemies = 0;

    lvlEnemies.forEach(enemy => {
            enemy.update();
    });

    if (lvlEnemiesAlive > 0) {
        document.getElementById('fight-info').innerText = "Enemy Turn";
        document.getElementById('fight-info').style.color = 'red';   

        setTimeout(function() {
            gameState.turn = 'enemy';
            lvlEnemies.forEach(enemy => {
                attacker = enemy;
                enemy.doTurn();
                player.update();
                enemy.endTurn();
            });
            setupPhase()
        }, 1000);
    }
}


