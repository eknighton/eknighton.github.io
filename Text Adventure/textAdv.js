const storyElement = document.getElementById('story');
let currentState = 0;

function displayPanel(panelId) {
    const panel = panels.find(p => p.id === panelId);
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

// Initial setup to display the start panel
window.onload = () => {
    displayPanel('Start');
};