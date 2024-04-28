const storyElement = document.getElementById('story');
let currentState = 0;

function displayPanel(p) {
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
        const img = document.getElementById('panelImage');
        img.src = panel.imageData.src;
        img.style.width = panel.imageData.size;
        img.style.transform = `translate(${panel.imageData.offsetX}, ${panel.imageData.offsetY})`;
        
        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = ''; // Clear previous options
        panel.options.forEach(option => {
            const button = document.createElement('button');
            button.innerHTML = option.text;
            button.onclick = () => {option.action(panel)};
            optionsContainer.appendChild(button);
        });

        // Check if there is an onLoad action and execute it
        if (panel.onLoad) {
            panel.onLoad(panel);
        }
    } else {
        console.error('Panel not found:', panelId);
    }
}

function importPanelIfNeeded(panelId) {
    // Check if the panelId is not present in 'panels'
    if (!(panelId in panels)) {
        // Check if the panelId exists in 'panelArchive'
        if (panelId in panelMakes) {
            // Import the panel definition from 'panelArchive' to 'panels'
            panels[panelId] = panelMakes[panelId]();
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