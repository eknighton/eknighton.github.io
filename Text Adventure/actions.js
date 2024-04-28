function greet() {
    displayPanel('Next'); 
}

function goPanel(paramOne) {
    displayPanel(paramOne); 
}

function queuePanel(panelId, delay) {
    setTimeout(() => {
        goPanel(panelId);
    }, delay);
}

function takeDamage(paramOne) {
    console.log('Took ' + paramOne + ' Damage!')
    //Nothing yet!
}

function gainGold(paramOne) {
    console.log('Gained ' + paramOne +' Gold!')
    //Nothing yet!
}