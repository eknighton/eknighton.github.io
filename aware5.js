document.addEventListener('DOMContentLoaded', function() {
    const K = 10; // Total number of trials
    let currentTrial = 0;
    let score = 0;
    const S = 400; // Delay time in milliseconds before showing the target
    const gridSize = 192; // Total squares in the grid
    let trialStartTime = 0;
    let totalTime = 0;
    let startX, startY, endX, endY;
    let flag = true;

    alert('Tap to be tested on the current grid. Swipe right if the shown pink square was in the grid you studied, swipe left otherwise.');

    function setupGrid() {
        const grid = document.getElementById('grid');
        grid.innerHTML = '';
        for (let i = 0; i < gridSize; i++) {
            const square = document.createElement('div');
            grid.appendChild(square);
        }
    }

    function startTrial() {
        currentTrial++;
        flag = true;
        document.getElementById('trialNum').textContent = currentTrial;
        setupGrid();

        const grid = document.querySelectorAll('#grid div');
        const greyIndices = new Set();
        while (greyIndices.size < gridSize / 2) {
            greyIndices.add(Math.floor(Math.random() * gridSize));
        }

        grid.forEach((square, index) => {
            if (greyIndices.has(index)) {
                square.classList.add('grey');
                square.dataset.wasGrey = 'true';
            } else {
                square.dataset.wasGrey = 'false';
            }
        });

        trialStartTime = Date.now();
    }

    document.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    }, false);

    document.addEventListener('touchend', function(event) {
        endX = event.changedTouches[0].clientX;
        endY = event.changedTouches[0].clientY;
        handleTouch(startX, startY, endX, endY);
    }, false);

    function handleTouch(startX, startY, endX, endY) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        if (absDeltaX > absDeltaY && !flag) { // Horizontal movement
            if (deltaX > 30) { // Swipe right
                evaluateResponse(true);
            } else if (deltaX < -30) { // Swipe left
                evaluateResponse(false);
            }
        } else { // Vertical movement or tap
            if (absDeltaX < 20 && absDeltaY < 20 && flag) { // Tap
                flag = false;
                revealTarget();
            }
        }
    }

    function revealTarget() {
        const currentTime = Date.now();
        totalTime += currentTime - trialStartTime;
        const grid = document.querySelectorAll('#grid div');
        grid.forEach(square => square.classList.remove('grey'));

        setTimeout(() => {
            const targetIndex = Math.floor(Math.random() * gridSize);
            grid[targetIndex].classList.add('pink'); // Assume 'pink' class is defined
            grid[targetIndex].dataset.isTarget = 'true';
        }, S);
    }

    function evaluateResponse(isRightSwipe) {
        const target = document.querySelector('[data-is-target="true"]');
        if (target) {
            const wasGrey = target.dataset.wasGrey === 'true';
            const correctKey = (wasGrey && isRightSwipe) || (!wasGrey && !isRightSwipe);
            target.dataset.isTarget = 'false'; // Reset target state
            if (correctKey) {
                score++;
                alert('Correct!');
            } else {
                alert('Incorrect!');
            }
            document.getElementById('score').textContent = score;
            if (currentTrial < K) {
                startTrial();
            } else {
                finalizeTest();
            }
        }
    }

    function finalizeTest() {
        const percentage = (score / K) * 100;
        const averageTime = Math.trunc(totalTime / K);
        var performance = Math.trunc(((score - (K/2)) / (totalTime/(1000*K)))*100)
        if (performance < 0) {
            performance = 0;
            alert(`Test completed. You got ${percentage}% correct. Average study time: ${averageTime.toFixed(2)} ms. Your score was below ${performance}, and therefore is not shown.`);
        } else {
             alert(`Test completed. You got ${percentage}% correct. Average study time: ${averageTime.toFixed(2)} ms. Score: ${performance}`);
        }
        location.reload();
    }

    setupGrid();
    startTrial();
});
