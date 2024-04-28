  panels.push({
    id: 'Goblin Math',
    imageData: {
      src: "Images/Goblin.jpg",
      size: '100%', // Scale the image
      offsetX: '-50%', // Horizontal offset
      offsetY: '-50%' // Vertical offset
    },
    onLoad: null,
    text: "Quick, what's 27 x 12?",
    options: [
      {
            text: 'An equation',
            action: () => {
              takeDamage(5)
              goPanel("Goblin Punch")
              queuePanel('Start', 1800)
            }
      },
      {
            text: '324',
            action: () => {
              gainGold(324)
              goPanel("Goblin Gold")
              queuePanel('Goblin Shop One', 1800)
            }
      }
    ]
  });
  panels.push({
    id: 'Goblin Punch',
    imageData: {
      src: "Images/KnightSlays.gif",
      size: '100%', // Scale the image
      offsetX: '-50%', // Horizontal offset
      offsetY: '-50%' // Vertical offset
    },
    onLoad: null,
    text: "No! It's an expression! <b>There's no equals sign!</b>",
    options: [
    ]
  });
  panels.push({
    id: 'Goblin Gold',
    imageData: {
      src: "Images/GoldAdobe.jpeg",
      size: '100%', // Scale the image
      offsetX: '-50%', // Negative is left
      offsetY: '-40%' // Negative is up
    },
    onLoad: null,
    text: "The goblin gives you 324 gold...",
    options: [
    ]
  });