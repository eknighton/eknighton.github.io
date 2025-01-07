class Symbol {

	name = "Untitled";
    desc = "Does nothing."

    constructor({ sprite, id }) {
        this.sprite = sprite;
        this.id = id;

    }

    try(target) {
        return false;
    }

    use() {
        return false;
    }

    reveal() {
        return false;
    }
    getActions(){
    	return 1;
    }
    getCanvasActions(){
    	return 1;
    }
    getMaxReveal(){
    	return 8; //Origionally 16
    }
}

class SwordSymbol extends Symbol {

	name = "Sword";
    desc = "Drag to deal 6."

    try(target) {
        console.log("trying");
        if (target.classList.contains("enemy")) {
            console.log("touching enemy");
            target.enemy.taken = 6
            target.enemy.update();
            return true;
        }
        return false;
    }
}

class ShieldSymbol extends Symbol {

    name = "Shield";
    desc = "Tap to gain 5 Block."

    use() {
        let bonus = 0;
        player.items.forEach(item => {
            if (item.name === "Shield") {
                bonus += 1;
            }
        });

        player.block += 5 + bonus;
        player.update();
        return true;
    }

    // If you intended to have a "reveal" method for ShieldSymbol, 
    // you would define it here. Your provided code was missing the 
    // implementation for `reveal` in `shieldSymbol`.
}

class StaffSymbol extends Symbol {

	name = "Spell Staff";
    desc = "Drag to deal 5, or give a square +3 Magic."

    try(target) {
        console.log("trying");
        return false;
    }
    getActions(){
    	return 0;
    }
    getCanvasActions(){
    	return 0;
    }
}

class BarSymbol extends Symbol {

    name = "Warstaff";
    desc = "Drag to deal 4 and gain 4 block."

    try(target) {
        console.log("trying");
        if (target.classList.contains("enemy")) {
            console.log("touching enemy");
            player.block += 4;
            player.update();
            target.enemy.taken = 4
            target.enemy.update();
            return true;
        }
        return false;
    }
}

class TonfaSymbol extends Symbol {

    name = "Tonfa";
    desc = "Drag to deal 5 and gain 4 block."

    try(target) {
        console.log("trying");
        if (target.classList.contains("enemy")) {
            console.log("touching enemy");
            player.block += 4;
            player.update();
            target.enemy.taken = 5;
            target.enemy.update();
            return true;
        }
        return false;
    }
}

class OrcswordSymbol extends Symbol {

    name = "Orc Sword";
    desc = "Drag to deal 4, 10 if target is below 50% hp."

    try(target) {
        console.log("trying");
        if (target.classList.contains("enemy")) {
            console.log("touching enemy");
            if (target.enemy.health < target.enemy.maxHealth/2){
                target.enemy.taken = 10;
            } else {
                target.enemy.taken = 4;
            }
            target.enemy.update();
            return true;
        }
        return false;
    }
}

class CutlassSymbol extends Symbol {

    name = "Cutlass";
    desc = "Drag to deal 4, 9 if target has no block."

    try(target) {
        console.log("trying");
        if (target.classList.contains("enemy")) {
            console.log("touching enemy");
            if (target.enemy.block <= 0){
                target.enemy.taken = 9;
            } else {
                target.enemy.taken = 4;
            }
            target.enemy.update();
            return true;
        }
        return false;
    }
}

class DaggerSymbol extends Symbol {

    name = "Dagger";
    desc = "Drag to deal 4, 13 if target has full health."

    try(target) {
        console.log("trying");
        if (target.classList.contains("enemy")) {
            console.log("touching enemy");
            if (target.enemy.health >= target.enemy.maxHealth){
                target.enemy.taken = 13;
            } else {
                target.enemy.taken = 4;
            }
            target.enemy.update();
            return true;
        }
        return false;
    }
}

class BackwardTonfaSymbol extends Symbol {

    name = "Backward Tonfa";
    desc = "Drag to deal 3 and gain 8 block."

    try(target) {
        console.log("trying");
        if (target.classList.contains("enemy")) {
            console.log("touching enemy");
            target.enemy.taken = 3;
            target.enemy.update();
            player.block = player.block + 8;
            player.update();
            return true;
        }
        return false;
    }
}

class ScytheSymbol extends Symbol {

    name = "Scythe";
    desc = "Drag to deal 4. Ignores All Defenses.";

    try(target) {
        console.log("trying");
        if (target.classList.contains("enemy")) {
            console.log("touching enemy");
            target.enemy.health = target.enemy.health - 4;
            target.enemy.update();
            return true;
        }
        return false;
    }
}

class DisrespecterSymbol extends Symbol {

    name = "Mancatcher";
    desc = "Drag to deal 5. If this breaks target's block, deal 7 more.";

    try(target) {
        if (target.classList.contains("enemy")) {
            if (target.enemy.block > 0){
                target.enemy.taken = 5;
                target.enemy.update();
                if (target.enemy.block <= 0){
                    target.enemy.taken = 6;
                    target.enemy.update();
                }
            } else {
                target.enemy.taken = 5;
                target.enemy.update();
            }
            return true;
        }
        return false;
    }
}

class PolehookSymbol extends Symbol {

    name = "Polehook";
    desc = "Drag to steal 6 defense."

    try(target) {
        if (target.classList.contains("enemy")) {
            let temp = target.enemy.block;
            if (temp > 6) {
                temp = 6;
            }
            target.enemy.block -= temp;
            target.enemy.update();
            player.block += temp;
            player.update();
            return true;
        }
        return false;
    }
}

class GreatswordSymbol extends Symbol {

    name = "Greatsword";
    desc = "Drag to remove 6 Block then deal 5.";

    try(target) {
        console.log("trying");
        if (target.classList.contains("enemy")) {
            console.log("touching enemy");
            target.enemy.block = target.enemy.block - 6;
            if (target.enemy.block < 0){
                target.enemy.block = 0;
            }
            target.enemy.taken = 5;
            target.enemy.update();
            return true;
        }
        return false;
    }
}

class AuraSymbol extends Symbol {

    name = "Aura";
    desc = "Tap to gain 4 Block, and 9 aura."

    use() {
        player.block +=4;
        player.aura +=9;
        player.update();
        return true;
    }

    // If you intended to have a "reveal" method for ShieldSymbol, 
    // you would define it here. Your provided code was missing the 
    // implementation for `reveal` in `shieldSymbol`.
}

class HuhSymbol extends Symbol {

    name = "???";
    desc = "... Scales with your block somehow";

    try(target) {
        console.log("trying");
        if (target.classList.contains("enemy")) {
            console.log("touching enemy");
            target.enemy.block = target.enemy.block - 4;
            if (target.enemy.block < 0){
                target.enemy.block = 0;
            }
            target.enemy.taken = 5;
            target.enemy.update();
            return true;
        }
        return false;
    }
}


class CoinSymbol extends Symbol {

	name = "Coin";
    desc = "Does nothing. Remove for $$$."

    try(target) {
        console.log("trying");
        return false;
    }
     getActions(){
    	return 0;
    }
    getCanvasActions(){
    	return 0;
    }
}

// Create instances:
const swordSymbol = new SwordSymbol({ sprite: "./Art/Symbols-Blue/sword.png", id: "1" });
const shieldSymbol = new ShieldSymbol({ sprite: "./Art/Symbols-Blue/shield.png", id: "2" });
//const coinSymbol = new CoinSymbol({ sprite: "./Art/Symbols-Blue/coin.png", id: "3" });
const staffSymbol = new StaffSymbol({ sprite: "./Art/Symbols-Blue/staff.png", id: "4" });
const barSymbol = new BarSymbol({ sprite: "./Art/Symbols-Blue/lowBar.png", id: "5" });
const tonfaSymbol = new TonfaSymbol({ sprite: "./Art/Symbols-Blue/tonfa.png", id: "6" });
const orcswordSymbol = new OrcswordSymbol({ sprite: "./Art/Symbols-Blue/orcsword.png", id: "7" });
const cutlassSymbol = new CutlassSymbol({ sprite: "./Art/Symbols-Blue/cutlass.png", id: "8" });
const daggerSymbol = new DaggerSymbol({ sprite: "./Art/Symbols-Blue/dagger.png", id: "9" });
const backwardTonfaSymbol = new BackwardTonfaSymbol({ sprite: "./Art/Symbols-Blue/ramshield.png", id: "10" });
const scytheSymbol = new ScytheSymbol({ sprite: "./Art/Symbols-Blue/scythe.png", id: "11" });
const polehookSymbol = new PolehookSymbol({ sprite: "./Art/Symbols-Blue/polehook.png", id: "12" });
const disrespecterSymbol = new DisrespecterSymbol({ sprite: "./Art/Symbols-Blue/mancatcher.png", id: "13" });
const greatswordSymbol = new GreatswordSymbol({ sprite: "./Art/Symbols-Blue/greatsword.png", id: "14" });
//const auraSymbol = new AuraSymbol({ sprite: "./Art/Symbols-Blue/aura.png", id: "15" });

//Add all symbols to a list
let allSymbols = [];
allSymbols.push(swordSymbol);
allSymbols.push(shieldSymbol);
allSymbols.push(tonfaSymbol);
allSymbols.push(barSymbol);
//allSymbols.push(coinSymbol);
//allSymbols.push(staffSymbol);
allSymbols.push(orcswordSymbol);
allSymbols.push(cutlassSymbol);
allSymbols.push(daggerSymbol);
allSymbols.push(backwardTonfaSymbol);
allSymbols.push(scytheSymbol);
allSymbols.push(polehookSymbol);
allSymbols.push(disrespecterSymbol);
allSymbols.push(greatswordSymbol);
//allSymbols.push(auraSymbol);



