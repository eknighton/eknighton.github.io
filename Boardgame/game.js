const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const winScreen = document.getElementById('win-screen');
const gameGrid = document.getElementById('game-grid');
const scoreDisplay = document.getElementById('score-display');
const dateDisplay = document.getElementById('date-display');
const finalScore = document.getElementById('final-score');

let score = 0;

function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

function startGame() {
  score = 0;
  updateScore();
  dateDisplay.textContent = 'Date: ' + getTodayDate();
  generateGrid();
  showScreen(gameScreen);
}

function updateScore() {
  scoreDisplay.textContent = 'Score: ' + score;
}

function makeTappableSquare(cell) {
  let touched = false;

  cell.addEventListener('touchstart', () => {
    touched = true;
  });

  cell.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const rect = cell.getBoundingClientRect();
    if (
      touch.clientX < rect.left ||
      touch.clientX > rect.right ||
      touch.clientY < rect.top ||
      touch.clientY > rect.bottom
    ) {
      touched = false;
    }
  });

  cell.addEventListener('touchend', () => {
    if (touched) {
      cell.click(); // treat as tap
    }
  });
}

function generateGrid() {
  gameGrid.innerHTML = '';
  for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.className = 'square tap-available';

    cell.addEventListener('click', () => {
      if (!cell.classList.contains('tap-available')) return;
      cell.classList.remove('tap-available');
      cell.style.background = '#81c784'; // green when clicked
      score++;
      updateScore();
      if (score === 25) winGame();
    });

    makeTappableSquare(cell);
    gameGrid.appendChild(cell);
  }
}

function winGame() {
  finalScore.textContent = 'Score: ' + score;
  showScreen(winScreen);
}

document.getElementById('start-button').addEventListener('click', startGame);

// Prevent page drag/scroll on touch
document.body.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
