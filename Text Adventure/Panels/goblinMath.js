
class GoblinMath {
    constructor() {
        this.make = this.constructor
        this.self = this;
        this.mediaData = {
            src: "Images/Goblin.jpg",
            size: '100%',
            offsetX: '-50%',
            offsetY: '-50%'
        };
        this.onLoad = () => {
            startCountdown(7, "timer", () => {
                panels = {};
                let temp = new GoblinPunch();
                temp.text = "Too slow!";
                goPanel(temp);
                queuePanel(Start, 2000);
            });
        };
        this.text = "Quick, what's 27 x 12? <div id='timer' style = 'color: red;'>10s</div>";
        this.options = [
            {
                text: "An equation",
                action: () => {
                    setTimeout(() => {takeDamage(50)}, 1500);
                    goPanel(GoblinPunch);
                },
            },
            {
                text: '324',
                action: () => {
                    gainGold(324);
                    goPanel(GoblinGold);
                    queuePanel(GoblinShopOne, 1800);
                }
            }
        ];
    }
}

class GoblinPunch {
    constructor() {
        this.make = this.constructor;
        this.self = this;
        this.mediaData = {
            src: "Images/KnightSlays.gif",
            size: '100%',
            offsetX: '-50%',
            offsetY: '-50%'
        };
        this.onLoad = null;
        this.text = "No! It's an expression! <b>There's no equals sign!</b>";
        this.options = [];
    }
}

class GoblinGold {
    constructor() {
        this.make = this.constructor;
        this.self = this;
        this.mediaData = {
            src: "Images/GoldAdobe.jpeg",
            size: '100%',
            offsetX: '-50%',
            offsetY: '-40%'
        };
        this.onLoad = null;
        this.text = "The goblin gives you 324 gold...";
        this.options = [];
    }
}