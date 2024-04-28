//Core

function idle(){

}

function goPanel(panelId) {
    displayPanel(panelId); 
}

function queuePanel(panelId, delay) {
    setTimeout(() => {
        goPanel(panelId);
    }, delay);
}

function resetPanel(panelId){
    
}



//Modify Player Values

function takeDamage(amount) {
    console.log('Took ' + amount + ' Damage!')
    //Nothing yet!
}

function gainGold(amount) {
    console.log('Gained ' + amount +' Gold!')
    //Nothing yet!
}

//Transactions

function tryBuy(cost, stocked) {
    return
}