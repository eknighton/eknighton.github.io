document.addEventListener('DOMContentLoaded', function() {
    const K = 10; // Total number of trials
    let currentTrial = 0;
    let score = 0;
    const N = 5000; // Display time in milliseconds for the grid
    const S = 200; // Delay time in milliseconds before showing the target
    const gridSize = 200; // Total squares in the grid

    alert('Click OK to start the test.');

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
        document.getElementById('trialNum').textContent = currentTrial;
        const grid = document.querySelectorAll('#grid div');
        const greyIndices = new Set();
        while (greyIndices.size < gridSize / 2) { // Randomly select 20% of the grid to be grey
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

        setTimeout(() => {
            grid.forEach(square => square.classList.remove('grey')); // All squares become black

            setTimeout(() => {
                const targetIndex = Math.floor(Math.random() * gridSize);
                grid[targetIndex].classList.add('grey');
                grid[targetIndex].dataset.isTarget = 'true';
            }, S);
        }, N);
    }

    function evaluateResponse(wasGrey, correctKey) {
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
            const percentage = (score / K) * 100;
            const ratio = (percentage) / 50
            alert(`Test completed. Your score: ${percentage}%. Your multiplier ${ratio}x`);
        }
    }

    document.addEventListener('keydown', function(event) {
        const target = document.querySelector('[data-is-target="true"]');
        if (target && (event.key === 'a' || event.key === 'd')) {
            const wasGrey = target.dataset.wasGrey === 'true';
            const correctKey = (wasGrey && event.key === 'a') || (!wasGrey && event.key === 'd');
            target.dataset.isTarget = 'false'; // Reset target state
            evaluateResponse(wasGrey, correctKey);
        }
    });

    setupGrid();
    startTrial();
});


