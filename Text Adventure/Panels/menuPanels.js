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
        text: 'Welcome to town!',
        options: [
          {
                text: 'Enter',
                action: (thisPanel) => {
                    console.log(thisPanel.id);
                    goPanel("Goblin Math"); 

                }
          },
          {
                text: 'Attack this dude',
                action: (thisPanel) => { 
                    panels = {};
                    let temp = GoblinPunch()
                    temp.text = "You are slain by the goblin"
                    goPanel(temp);
                    queuePanel("Start", 1000);
                }
          }
        ]
    };
}

