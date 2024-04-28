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
      { text: 'Play Game', actions: [{ func: 'startGame', params: [] }] },
      { text: 'F u!', actions: [{ func: 'endGame', params: [] }] }
    ]
  },
  {
    id: 'Goblin Math',
    imageData: {
      src: "Images/Goblin.jpeg",
      size: '120%', // Scale the image
      offsetX: '-10%', // Horizontal offset
      offsetY: '5%' // Vertical offset
    },
    timer: -1,
    text: "Quick, what's 27 x 12?",
    options: [
      { text: 'An equation', actions: [{ func: 'wrongAnswer', params: [] }] },
      { text: '324', actions: [{ func: 'correctAnswer', params: [] }] }
    ]
  }
];