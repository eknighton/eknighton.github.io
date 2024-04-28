panels.push({
    id: "Goblin Shop One",
    imageData: {
      src: "Images/GoblinAndSon.webp",
      size: '100%', // Scale the image
      offsetX: '-50%', // Horizontal offset
      offsetY: '-20%' // Vertical offset
    },
    data: {"Stock 1" : 1},
    onLoad: null,
    text: 'Buy anything mate?',
    options: [
            {
                text: 'Sword 5g',
                action: () => {tryBuy(5, "Goblin Shop One", 'Stock 1')}
            },
            {
                text: 'Bow 5g',
                action: () => endGame('1')
            },
            {
                text: 'Wand 5g',
                action: () => endGame('1')
            },
            {
                text: 'Shield 5g',
                action: () => endGame('1')
            },
            {
                text: 'Leave',
                action: () => goPanel('Start')
            }
    ]
  });