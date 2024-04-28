let panels = [
  {
    id: 'Start',
    imageData: {
      src: "Images/GoblinAndSon.webp",
      size: '100%', // Scale the image
      offsetX: '-50%', // Horizontal offset
      offsetY: '-40%' // Vertical offset
    },
    timer: -1,
    text: 'Welcome to the game!',
    options: [
      { text: 'Play Game', actions: [{ func: 'goPanel', params: ['Goblin Math'] }] },
      { text: 'F u!', actions: [{ func: 'endGame', params: [] }] }
    ]
  },
  {
    id: 'Goblin Math',
    imageData: {
      src: "Images/Goblin.jpg",
      size: '100%', // Scale the image
      offsetX: '-50%', // Horizontal offset
      offsetY: '-50%' // Vertical offset
    },
    timer: -1,
    text: "Quick, what's 27 x 12?",
    options: [
      { text: 'An equation', actions: [
            { func: 'takeDamage', params: [5] },
            { func: 'goPanel', params: ['Start'] }
        ] 
      },
      { text: '324', actions: [
            { func: 'gainGold', params: [324] },
            { func: 'goPanel', params: ['Start'] },
        ] 
      }
    ]
  }
];