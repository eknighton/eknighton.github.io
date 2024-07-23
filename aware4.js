document.addEventListener('DOMContentLoaded', function() {
    const K = 10; // Total number of trials
    let currentTrial = 0;
    let score = 0;
    const S = 200; // Delay time in milliseconds before showing the target
    const gridSize = 200; // Total squares in the grid
    let trialStartTime = 0;
    let totalTime = 0;

    let flag = true;

    alert('Press SPACE to be tested on the current grid. If the shown pink square was in the grid you studied, press A. Otherwise, press D.');

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
        flag = true
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === ' ' && flag) {
            const currentTime = Date.now();
            totalTime += currentTime - trialStartTime;
            const grid = document.querySelectorAll('#grid div');
            grid.forEach(square => square.classList.remove('grey'));

            setTimeout(() => {
                const targetIndex = Math.floor(Math.random() * gridSize);
                grid[targetIndex].classList.add('grey');
                grid[targetIndex].dataset.isTarget = 'true';
            }, S);
            flag = false
        } else if (event.key === 'a' || event.key === 'd') {
            const target = document.querySelector('[data-is-target="true"]');
            if (target) {
                const wasGrey = target.dataset.wasGrey === 'true';
                const correctKey = (wasGrey && event.key === 'a') || (!wasGrey && event.key === 'd');
                target.dataset.isTarget = 'false'; // Reset target state
                if (correctKey) {
                    score++;
                    alert('Correct!');
                } else {
                    alert('Incorrect!');
                }
                //document.getElementById('score').textContent = score;
                if (currentTrial < K) {
                    startTrial();
                } else {
                    const percentage = (score / K) * 100;
                    const averageTime = Math.trunc(totalTime / K);
                    const performance = Math.trunc(((score - (K/2)) / (totalTime/(1000*K)))*100)
                    alert(`Test completed. You got ${percentage}% correct. Average study time: ${averageTime.toFixed(2)} ms. Score: ${performance}`);
                    location.reload();
                }
            }
        }
    });

    setupGrid();
    startTrial();
});
