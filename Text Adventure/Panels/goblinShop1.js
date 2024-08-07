class GoblinShopOne {
    constructor() {
        this.make = this.constructor;
        this.self = this;
        this.mediaData = {
            src: "Images/GoblinAndSon.webp",
            size: '100%',
            offsetX: '-50%',
            offsetY: '-50%'
        };
        this.data = {"Stock 1": 1};
        this.onLoad = () => { 
            if (this.options.length > 1) {
                this.text = "Buy anything mate?";
            } else {
                this.text = "Sweet gear dude, where'd you get it?";
            }
        };
        this.text = 'Buy anything mate?';
        this.options = [
            {
                text: 'Sword 5g',
                id: 'Sword 5g',
                action: () => {
                  tryBuy(5, this.id, 'Stock 1');
                  this.text = "You have a sword now. Trust me m8."
                  this.data["Stock 1"] = 0
                  this.options = this.options.filter(item => item.id !== "Sword 5g");
                  giveItem(new Sword());
                  displayPanel(this.constructor, false)
                }
            },
            {
                text: 'Bow 5g',
                id: 'Bow 5g',
                action: () => {
                  tryBuy(5, this.id, 'Stock 1');
                  this.text = "Nice bow, bro."
                  this.data["Stock 2"] = 0
                  this.options = this.options.filter(item => item.id !== "Bow 5g");
                  giveItem(new Bow());
                  displayPanel(this.constructor, false)
                }
            },
            {
                text: 'Wand 5g',
                id: 'Wand 5g',
                action: () => {
                  tryBuy(5, this.id, 'Stock 1');
                  this.text = "Nice wand fam."
                  this.data["Stock 3"] = 0
                  this.options = this.options.filter(item => item.id !== "Wand 5g");
                  giveItem(new Wand());
                  displayPanel(this.constructor, false)
                }
            },
            {
                text: 'Shield 5g',
                id: 'Shield 5g',
                action: () => {
                  tryBuy(5, this.id, 'Stock 1');
                  this.text = "Woo, boi got a shield."
                  this.data["Stock 4"] = 0
                  this.options = this.options.filter(item => item.id !== "Shield 5g");
                  giveItem(new Shield());
                  displayPanel(this.constructor, false)
                }
            },
            {
                text: 'Leave',
                action: () => goPanel(Start)
            }
        ];
    }
}