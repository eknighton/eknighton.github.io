let panels = {}
let panelMakes = {}

panelMakes["Start"] = MakeStartPanel;
function MakeStartPanel(){
    return {
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
          {
                text: 'Play Game',
                action: (thisPanel) => {
                    console.log(thisPanel.id);
                    goPanel("Goblin Math"); 

                }
          },
          {
                text: 'Fuck This',
                action: (thisPanel) => { 
                    panels = {};
                    goPanel("Goblin Punch");
                    queuePanel("Start", 1000);
                }
          }
        ]
    };
}

