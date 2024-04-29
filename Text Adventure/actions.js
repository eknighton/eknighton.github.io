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

function takeDamage(amount, p = player) {
    p.HP = p.HP - amount;
    playerHUD(p);
    if (p.HP <= 0){
        dead(p);
    }
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