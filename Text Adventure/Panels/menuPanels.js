class Start {
    constructor() {
        this.type = this.constructor.name;
        this.self = this;
        this.mediaData = {
            src: "Images/GoblinAndSon.webp",
            size: '100%',
            offsetX: '-50%',
            offsetY: '-40%'
        };
        this.onLoad = () => {
            player.HP = 50;
            requestAudio({src: "none", slot: "Panel", priority: "1", loop: false});
        };
        this.preLoad = () => {
            // Empty as in the original function
        };
        this.text = 'Welcome to town!';
        this.options = [
            {
                text: 'Enter',
                action: () => {
                    console.log(this.id);
                    goPanel(GoblinMath);
                }
            },
            {
                text: 'Attack this dude',
                action: () => {
                    panels = {};
                    let temp = new GoblinPunch();  // Assuming GoblinPunch is a class as refactored previously
                    player.HP = 0;
                    temp.mediaData.src = "Images/Float%20Jump%20Float.MP4";
                    temp.mediaData.size = "150%";
                    temp.text = "You are slain by the goblin";
                    goPanel(temp);
                    queuePanel(Start, 5000);
                }
            }
        ];
    }
}