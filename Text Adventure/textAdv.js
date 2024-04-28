const storyElement = document.getElementById('story');
let currentState = 0;
let panels = {}
let panelMakes = {}

function displayPanel(p) {

    /*
        Check if P is a PanelID or a Panel
    */
        let panel = {}
        if (p.id){
            //If it has an id, it is a panel
            panel = p;  
        } else {
            //If it doesn't, it is an ID
            importPanelIfNeeded(p);
            panel = panels[p];
        }
        if (panel) {
            document.getElementById('story').innerHTML = panel.text;

    /*
        Set Media Element
    */
        const mediaSrc = panel.mediaData.src;
        const fileExtension = mediaSrc.split('.').pop().toLowerCase();
        const mediaContainer = document.getElementById('mediaContainer');
         if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension)) {
            const img = document.createElement('img');
            img.src = panel.mediaData.src;
            img.id = "panelMedia";
            img.style.width = panel.mediaData.size;
            img.style.transform = `translate(${panel.mediaData.offsetX}, ${panel.mediaData.offsetY})`;
            mediaContainer.appendChild(img);
        } else if (['mp4', 'webm', 'ogg'].includes(fileExtension)){
            const video = document.getElementById('panelMedia');
            video.src = mediaSrc;
            video.id = "panelMedia";
            video.style.width = panel.mediaData.size;
            video.controls = true;
            video.style.transform = `translate(${panel.mediaData.offsetX}, ${panel.mediaData.offsetY})`;
            mediaContainer.appendChild(video);
            video.load();  // To ensure the video updates with the new source
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
        if (panel.onLoad) {
            panel.onLoad(panel);
        }
    } else {
        console.error('Panel not found:', panelId);
    }
    writeHUD();
}

function importPanelIfNeeded(panelId) {
    // Check if the panelId is not present in 'panels'
    if (!(panelId in panels)) {
        // Check if the panelId exists in 'panelArchive'
        if (panelId in panelMakes) {
            // Import the panel definition from 'panelArchive' to 'panels'
            panels[panelId] = panelMakes[panelId]();
            panels[panelId].me = panels[panelId];
            console.log(`New Panel of ID ${panelId} created.`);
        } else {
            console.log(`Initializer for Panel ID ${panelId} not found.`);
        }
    } else {
        console.log(`Panel ID ${panelId} already exists in 'panels'.`);
    }
}

// Initial setup to display the start panel
window.onload = () => {
    displayPanel('Start');
};