panelMakes["Start"] = MakeStartPanel;
function MakeStartPanel(){
    return {
        id: 'Start',
        mediaData: {
          src: "Images/GoblinAndSon.webp",
          size: '100%', // Scale the image
          offsetX: '-50%', // Negative is LEFT
          offsetY: '-40%' // Negative is UP
        },
        onLoad: (thisPanel) => {
            player.HP = 50;

        },
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
                    player.HP = 0;
                    temp.mediaData.src = "Images/Float%20Jump%20Float.MP4"
                    temp.mediaData.size = "150%"
                    temp.text = "You are slain by the goblin"
                    goPanel(temp);
                    queuePanel("Start", 5000);
                }
          }
        ]
    };
}

