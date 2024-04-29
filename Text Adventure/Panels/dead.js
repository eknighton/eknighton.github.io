class Dead {
    constructor() {
        this.make = this.constructor;
        this.self = this;
        this.mediaData = {
            src: "Images/GoblinAndSon.webp",
            size: '100%',
            offsetX: '-50%',
            offsetY: '-40%'
        };
        this.onLoad = () => {
            requestAudio({src: "none", slot: "Panel", priority: "1", loop: false});
        };
        this.preLoad = () => {
            // Empty as in the original function
        };
        this.text = "You're dead m8.";
        this.options = [
            {
                text: 'Live',
                action: () => {
                    console.log(this.id);
                    goPanel(Start);
                    respawnPlayer();
                }
            }
        ];
    }
}