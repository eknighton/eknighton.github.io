let panels = [
  {
    id: 'Start',
    imageData: {
      src: "Images/GoblinAndSon.webp",
      size: '100%', // Scale the image
      offsetX: '-50%', // Horizontal offset
      offsetY: '-40%' // Vertical offset
    },
    onLoad: null, //[{ func: 'goPanel', params: ['Goblin Math'] }],
    text: 'Welcome to the game!',
    options: [
      { text: 'Play Game', actions: [{ func: 'goPanel', params: ['Goblin Math'] }] },
      { text: 'F u!', actions: [{ func: 'endGame', params: ['1'] }] }
    ]
  }
]