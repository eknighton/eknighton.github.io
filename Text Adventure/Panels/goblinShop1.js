 panelMakes["Goblin Shop One"] = GoblinShopOne;

 function GoblinShopOne() {
    return {
      id: "Goblin Shop One",
    mediaData: {
      src: "Images/GoblinAndSon.webp",
      size: '100%', // Scale the image
      offsetX: '-50%', // Horizontal offset
      offsetY: '-50%' // Vertical offset
    },
    data: {"Stock 1" : 1},
    onLoad: (thisPanel) => { 
      if (thisPanel.options.length > 1){
        thisPanel.text = "Buy anything mate?"
      } else {
        thisPanel.text = "Sweet gear dude, where'd you get it?"
      }
    },
    text: 'Buy anything mate?',
    options: [
            {
                text: 'Sword 5g',
                id: 'Sword 5g',
                action: (thisPanel) => {
                  tryBuy(5, "Goblin Shop One", 'Stock 1');
                  thisPanel.text = "You have a sword now. Trust me m8."
                  thisPanel.data["Stock 1"] = 0
                  thisPanel.options = thisPanel.options.filter(item => item.id !== "Sword 5g");
                  goPanel(thisPanel.id)
                }
            },
            {
                text: 'Bow 5g',
                id: 'Bow 5g',
                action: (thisPanel) => {
                  tryBuy(5, "Goblin Shop One", 'Stock 1');
                  thisPanel.text = "Nice bow, bro."
                  thisPanel.data["Stock 2"] = 0
                  thisPanel.options = thisPanel.options.filter(item => item.id !== "Bow 5g");
                  goPanel(thisPanel.id)
                }
            },
            {
                text: 'Wand 5g',
                id: 'Wand 5g',
                action: (thisPanel) => {
                  tryBuy(5, "Goblin Shop One", 'Stock 1');
                  thisPanel.text = "Nice wand fam."
                  thisPanel.data["Stock 3"] = 0
                  thisPanel.options = thisPanel.options.filter(item => item.id !== "Wand 5g");
                  goPanel(thisPanel.id)
                }
            },
            {
                text: 'Shield 5g',
                id: 'Shield 5g',
                action: (thisPanel) => {
                  tryBuy(5, "Goblin Shop One", 'Stock 1');
                  thisPanel.text = "Woo, boi got a shield."
                  thisPanel.data["Stock 4"] = 0
                  thisPanel.options = thisPanel.options.filter(item => item.id !== "Shield 5g");
                  goPanel(thisPanel.id)
                }
            },
            {
                text: 'Leave',
                action: (thisPanel) => goPanel('Start')
            }
    ]
  }
};