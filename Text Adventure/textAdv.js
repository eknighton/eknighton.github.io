const storyElement = document.getElementById('story');


let currPanel = null;
let panels = {};
let panelMakes = {};

let player = null;
let players = {};

let countdowns = [];

window.onload = () => {
    startGame();
};

function startGame(){
    //Set initial player
    player = new PlayerNoob();

    player.initHUD();

    displayPanel(Start);
}

function displayPanel(p, funcs = true) {

    /*
        Check if P is a PanelID, constructor, or a Panel
        We only want to load panels when necessary
    */
        let panel = {}
        if (p.make){
            //If it has a make, it is a panel
            panel = p;  
        } else if (p.length) { 
            //If P has a length, it is a string/ID
            panel = panels[p];
        } else {
            //If has neither, it is a constructor
            panel = importPanelIfNeeded(p);
           
        }

    if (panel) {
        if (panel.preLoad && funcs) {
            panel.preLoad(panel);
        }
        currPanel = panel;
        document.getElementById('story').innerHTML = panel.text;

    /*
        Set Media Element
    */
        const mediaSrc = panel.mediaData.src;
        const fileExtension = mediaSrc.split('.').pop().toLowerCase();
        const mediaContainer = document.getElementById('mediaContainer');

        /*
            Deletes previous media element
        */
        const element = document.getElementById('panelMedia');
        if (element) {
            element.remove();
        }

        /*
            Interprets file type, 
            adds new "panelMedia" element of appropriate type.
        */
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension)) {
            const img = document.createElement('img');
            img.src = panel.mediaData.src;
            img.id = "panelMedia";
            img.style.width = panel.mediaData.size;
            img.style.transform = `translate(${panel.mediaData.offsetX}, ${panel.mediaData.offsetY})`;
            mediaContainer.appendChild(img);
        } else if (['mp4', 'webm', 'ogg'].includes(fileExtension)){
            const video = document.createElement('video');
            video.src = mediaSrc;
            video.id = "panelMedia";
            video.style.width = panel.mediaData.size;
            video.controls = false;
            video.autoplay = true;
            video.style.transform = `translate(${panel.mediaData.offsetX}, ${panel.mediaData.offsetY})`;
            video.load();  // To ensure the video updates with the new source
            mediaContainer.appendChild(video);
        } else {
            window.alert("Game Error: Panel.mediaData.src has File type not included in textAdv.js > displayPanel > media setter")
        }

    /*
        Create Buttons
    */
        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = ''; // Clear previous options
        panel.options.forEach(option => {
            const button = document.createElement('button');
            button.innerHTML = option.text;
            button.onclick = () => {option.action(panel)};
            optionsContainer.appendChild(button);
        });

    /*
        Call onLoad
    */
        if (panel.onLoad && funcs) {
            panel.onLoad(panel);
        }
    } else {
        console.error('Panel not found:', p);
    }
    playerHUD();
}

function importPanelIfNeeded(conName) {

    // Check if the constructor's panelId is not present in 'panels'
    if (!(conName.name in panels)) {
        panels[conName.name] = new conName()
        return panels[conName.name]
    } else {
        console.log(`Panel ID ${conName.name} already exists in 'panels'.`);
        return panels[conName.name]
    }
}