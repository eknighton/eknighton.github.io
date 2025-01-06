

//Replace this with the generic random function
function getRandomSymbol() { 
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
}

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}


function getRevealedPercentage(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height).data;
    let transparentCount = 0;

    for (let i = 0; i < imageData.length; i += 4) {
        if (imageData[i + 3] === 0) { // Check alpha channel value
            transparentCount++;
        }
    }

    return Math.ceil(((transparentCount / (width * height)) *100)/4)*4;
}

function isColliding(elem1, elem2) {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();

    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

function resetPosition(canvas) {
    canvas.style.left = canvas.originalPosition.left;
    canvas.style.top = canvas.originalPosition.top;
}

function checkCollisions(currentCanvas) {
    let allCanvases = document.querySelectorAll('canvas'); // Assuming all your canvases are directly <canvas> elements.
    for(let canvas of allCanvases) {
        if(canvas !== currentCanvas && isColliding(currentCanvas, canvas)) {
            console.log(`Canvas ${currentCanvas.id} is colliding with ${canvas.id}`);
            if (currentCanvas.symbol.try(canvas)){
                isDrawing = false;
                isDragging = false;
                interactType = null;
                if (selectedItem != null){
                    console.log(selectedItem.type);
                    selectedItem.style.zIndex = 'auto';
                    resetPosition(selectedItem)
                }
                selectedItem = null;
                currentCanvas.actions = currentCanvas.actions - 1;
                actions = actions-1;
                tryEndTurn();
            }
        }
    }
}

function showToolTip(element){
    tooltip.style.display = 'block';
    tooltip.style.opacity = '1';
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.bottom + window.scrollY) + 'px';
    tooltip.innerHTML = element.getAttribute('data-tooltip');
}
function hideToolTip(){
    tooltip.style.opacity = '0';
    // Using a timeout to remove the tooltip after the transition
    setTimeout(() => {
        tooltip.style.display = 'none';
    }, 50);
}

function showToolTipHigher(element) {
    tooltip.style.display = 'block';
    tooltip.style.opacity = '1';
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px'; 
    tooltip.style.top = (rect.top + window.scrollY - 80) + 'px'; 
    tooltip.innerHTML = element.getAttribute('data-tooltip');
}




