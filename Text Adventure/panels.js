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
            { func: 'goPanel', params: ['Goblin Punch'] },
            { func: 'queuePanel', params: ['Start', 1800] }
        ] 
      },
      { text: '324', actions: [
            { func: 'gainGold', params: [324] },
            { func: 'goPanel', params: ['Goblin Gold'] },
            { func: 'queuePanel', params: ['Start', 1800] }
        ] 
      }
    ]
  },
  {
    id: 'Goblin Punch',
    imageData: {
      src: "Images/KnightSlays.gif",
      size: '100%', // Scale the image
      offsetX: '-50%', // Horizontal offset
      offsetY: '-50%' // Vertical offset
    },
    timer: -1,
    text: "No! It's an expression! There's no equals sign!",
    options: [
    ]
  },
  {
    id: 'Goblin Gold',
    imageData: {
      src: "Images/GoldAdobe.jpeg",
      size: '100%', // Scale the image
      offsetX: '-50%', // Horizontal offset
      offsetY: '-40%' // Vertical offset
    },
    timer: -1,
    text: "The goblin gives you 324 gold...",
    options: [
    ]
  }
];