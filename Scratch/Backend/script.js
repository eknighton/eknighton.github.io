let isMouseDown = false;

document.addEventListener('mousedown', (e) => {
    isMouseDown = true;
});

document.addEventListener('mouseup', (e) => {

    isMouseDown = false;

    isDrawing = false;
    isDragging = false;
    interactType = null;

    if (selectedItem != null){
        console.log(selectedItem.type);
        resetPosition(selectedItem)
        selectedItem.style.zIndex = 'auto';
    }
    selectedItem = null;

});

document.addEventListener('mousemove', (e) => {
    switch (interactType) {
        case 'drawing':
            performScratch(e, selectedItem);
        break;
        case 'action':
            moveSelected(e);
        break;
        default:
            return;
        break;
    }
    
});
 document.querySelectorAll('.scratch-card').forEach(canvas => {
        const ctx = canvas.getContext('2d');
        canvas.revealed = false;

        canvas.style.position = 'relative';
            canvas.originalPosition = {
            left: canvas.style.left || '0px',
            top: canvas.style.top || '0px'
        };
        
        // Size canvas to match its display size
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        ctx.fillStyle = "#333333";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        canvas.addEventListener('mousedown', function(e) {
            selectedItem = this;
            console.log(canvas.id + " selected, revealed: " + canvas.revealed);

            if (e.shiftKey){
                    revealSlot(canvas);
                    return;
            }

            if (canvas.revealed){
                interactType = "action";
                if (canvas.actions > 0){
                    if (canvas.symbol.use()){
                        selectedItem = null;
                        canvas.actions = canvas.actions - 1;
                        actions = actions - 1;
                        tryEndTurn();
                    } else {
                        select(e);
                    }
                }
                if (canvas.actions <= 0){
                    disableSlot(canvas);
                    showToolTip(e.target);
                }
            } else {
                interactType = "drawing";
                isDrawing = true;
                const revealedPercentage = getRevealedPercentage(ctx, canvas.width, canvas.height);
                if (revealedPercentage < canvas.symbol.getMaxReveal()){
                    scratches = scratches - 1;
                    performScratch(e, selectedItem);
                    //document.getElementById('scratches').innerText = scratches;
                } else {
                    revealSlot(canvas);
                }
            }


        });
    canvas.addEventListener('mouseenter', (e) => {
        if (canvas.revealed && !isDragging && !isMouseDown){
            showToolTip(e.target);
        }
    });
    canvas.addEventListener('mousemove', (e) => {
         if (canvas.actions <= 0 && canvas.revealed && !isDragging && !isMouseDown){
                disableSlot(canvas);
                showToolTip(e.target);
         }else if (canvas.revealed && !isDragging && !isMouseDown){
                showToolTip(e.target);
         }
    });
    canvas.addEventListener('mouseleave', (e) => {
        if (canvas.revealed && !isMouseDown){
            hideToolTip();
        }
    });


});


let spacebarDown = false;

document.addEventListener('keydown', function(event) {
    if (event.key === ' ' || event.key === 'Spacebar') {
        spacebarDown = true;
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === ' ' || event.key === 'Spacebar') {
        spacebarDown = false;
    }
});