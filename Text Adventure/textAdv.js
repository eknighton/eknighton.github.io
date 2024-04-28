const storyElement = document.getElementById('story');
let currentState = 0;

function processActions(actions) {
    actions.forEach(action => {
        if (action && typeof window[action.func] === 'function') {
            window[action.func](...action.params);
        } else {
            console.error('No function found for action:', action.func);
        }
    });
}

function displayPanel(panelId) {
    const panel = panels.find(p => p.id === panelId);
    if (panel) {
        document.getElementById('story').innerText = panel.text;
        const img = document.getElementById('panelImage');
        img.src = panel.imageData.src;
        img.style.width = panel.imageData.size;
        img.style.transform = `translate(${panel.imageData.offsetX}, ${panel.imageData.offsetY})`;
        
        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = ''; // Clear previous options
        panel.options.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.onclick = () => processActions(option.actions);
            optionsContainer.appendChild(button);
        });
    } else {
        console.error('Panel not found:', panelId);
    }
}

// Initial setup to display the start panel
window.onload = () => {
    displayPanel('Start');
};