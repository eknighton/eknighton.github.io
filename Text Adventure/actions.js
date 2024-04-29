//Core

function idle(){

}

function goPanel(panel) {
    displayPanel(panel); 
}

function queuePanel(panel, delay) {

    setTimeout(() => {
        goPanel(panel);
    }, delay);
   
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