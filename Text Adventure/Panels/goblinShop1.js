panels.push({
    id: "Goblin Shop One",
    imageData: {
      src: "Images/GoblinAndSon.webp",
      size: '100%', // Scale the image
      offsetX: '-50%', // Horizontal offset
      offsetY: '-20%' // Vertical offset
    },
    onLoad: null,
    text: 'Buy anything mate?',
    options: [
      { text: 'Sword 5g', actions: [{ func: 'goPanel', params: ['Goblin Math'] }] },
      { text: 'Bow 5g', actions: [{ func: 'endGame', params: ['1'] }] },
      { text: 'Wand 5g', actions: [{ func: 'endGame', params: ['1'] }] },
      { text: 'Shield 5g', actions: [{ func: 'endGame', params: ['1'] }] },
      { text: 'Leave', actions: [{ func: 'goPanel', params: ['Start'] }] }
    ]
  });