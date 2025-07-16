const startScreen = document.getElementById('start-screen');

const gameScreen = document.getElementById('game-screen');
const gameGrid = document.getElementById('game-grid');
const scoreDisplay = document.getElementById('score-display');
const dateDisplay = document.getElementById('date-display');

const winScreen = document.getElementById('win-screen');
const finalScore = document.getElementById('final-score');
const finalMoves = document.getElementById('final-moves');
const finalTime = document.getElementById('final-time');
const finalSeed = document.getElementById('final-seed');

const seedScreen = document.getElementById('seed-screen');
const seedInput = document.getElementById('seed-input');

const musicStart = new Audio('');
const musicGame = new Audio('audio/medieval2.wav');
const musicWin = new Audio('audio/DanceEnergetic.wav');
const musicSeed = new Audio('audio/DanceEnergetic.wav');

const sfxBomb= new Audio('audio/pew2.wav');
const sfxClock= new Audio('audio/MagicSpell.wav');
const sfxBoing= new Audio('audio/BigBoing.wav');
const sfxIce= new Audio('audio/Plunge.wav');
const sfxJump= new Audio('audio/Jump.wav');
const sfxCrank= new Audio('audio/Crank.wav');

[musicStart, musicGame, musicWin, musicSeed].forEach(music => {
  music.loop = true;
  music.volume = 0.4; // adjust as needed
});

// Map screen elements to their music
const screenMusicMap = new Map([
  [document.getElementById('start-screen'), musicStart],
  [document.getElementById('game-screen'), musicGame],
  [document.getElementById('win-screen'), musicWin],
  [document.getElementById('seed-screen'), musicSeed],
]);




let movementDirection = null;
let isLocked = false;

let time = 0;
let moves = 0;
let tickTimer = null;
let seed = null;


let hasWonDaily = false;

let isDaily = false;
let currentDate = null;
let currentMusic = null;

const TileBehaviors = {
  Loop: {
    onPlayerEnter() {
      if (!this.conquered) {
        this.conquered = true;
      }

      //playSoundEffect(sfxCrank, .5);

      const neighbors = getClockwiseNeighbors(this.x, this.y);
      const contents = neighbors.map(n => n.cell);

      // Build deep clones of each cell’s content
      const clones = contents.map(original => ({
        type: original.type,
        conquered: original.conquered,
        stepCount: original.stepCount ?? 0,
        direction: original.direction ?? null,
        onPlayerEnter: original.onPlayerEnter,
        showValidMoves: original.showValidMoves,
      }));

      // Rotate clone data one step clockwise
      const rotated = [clones.at(-1), ...clones.slice(0, -1)];

      // Copy rotated content back into original cell objects
      for (let i = 0; i < contents.length; i++) {
        Object.assign(contents[i], rotated[i]);
      }
    },

    showValidMoves() {
      showCardinalMoves(this.x, this.y);
    }
  },
  Shield: {
    onPlayerEnter(cell) {
      this.stepCount = (this.stepCount || 0) + 1;
      if (this.stepCount === 2 && !this.conquered) {
        this.conquered = true;
      }
    },
    showValidMoves(cell) {
      showCardinalMoves(this.x, this.y);
    }
  },
  Back: {
    onPlayerEnter() {
      if (!this.conquered) {
        this.conquered = true;
      }

      isLocked = true;
      //playSoundEffect(sfxBoing, .2)

      setTimeout(() => {
        playerPos = { ...lastMovePos };
        movementDirection = null; // Clear mvmnt dir
        const destination = boardState[playerPos.y][playerPos.x];
        destination.onPlayerEnter(); 

        updateAllCells();
        updateScore();
        isLocked = false;

        if (checkWinCondition()) winGame();
      }, 100);
    },

    showValidMoves() {
      showCardinalMoves(this.x, this.y);
    }
  },
  Clock: {
    onPlayerEnter(cell) {
      if (!this.conquered) {
        this.conquered = true;
      }
      time = Math.max(0, time - 1); // Reduce time
      playSoundEffect(sfxClock);
    },
    showValidMoves(cell) {
      showCardinalMoves(this.x, this.y);
    }
  },
  Wingshoe: {
    onPlayerEnter(cell) {
      if (!this.conquered) {
        this.conquered = true;
      }
    },
    showValidMoves(cell) {
      for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
          if (x !== this.x || y !== this.y) {
            boardState[y][x].dom.classList.add("tappable");
          }
        }
      }
    }
  },
  Bomb: {
    onPlayerEnter(cell) {
      if (!this.conquered) {
        this.conquered = true;
      }
      let flag = false;
      const adjacent = [
        [this.x + 1, this.y],
        [this.x - 1, this.y],
        [this.x, this.y + 1],
        [this.x, this.y - 1],
        [this.x + 1, this.y + 1],
        [this.x - 1, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y + 1],
      ];
      for (const [x, y] of adjacent) {
        if (x >= 0 && x < 5 && y >= 0 && y < 5) {
          const t = boardState[y][x];
          if (t.conquered) continue;
          flag = true;
          if (t.type === "Shield") {
            t.stepCount = (t.stepCount || 0) + 1;
            if (t.stepCount >= 2) {
              t.conquered = true;
            }
          } else {
            t.conquered = true;
          }
        }
      }
      if (flag) {
        playSoundEffect(sfxBomb, .5);
      }
    },
  showValidMoves(cell) {
      showCardinalMoves(this.x, this.y);
    }
  },
  Bishop: {
    onPlayerEnter(cell) {
      if (!this.conquered) {
        this.conquered = true;
      }
    },
    showValidMoves(cell) {
      showSlidingMoves(this.x, this.y, [[1, 1], [-1, -1], [1, -1], [-1, 1]]);
    }
  },
  Rook: {
    onPlayerEnter(cell) {
      if (!this.conquered) {
        this.conquered = true;
      }
    },
    showValidMoves(cell) {
      showSlidingMoves(this.x, this.y, [[1, 0], [-1, 0], [0, 1], [0, -1]]);
    }
  },
  Arrow: {
    onPlayerEnter() {
      if (!this.conquered) {
        this.conquered = true;
      }

      if (this.direction) {
        const delta = {
          up: [0, -1],
          down: [0, 1],
          left: [-1, 0],
          right: [1, 0]
        }[this.direction];

        const nx = this.x + delta[0];
        const ny = this.y + delta[1];

        if (nx >= 0 && nx < 5 && ny >= 0 && ny < 5) {
          isLocked = true;
          //playSoundEffect(sfxJump);
          setTimeout(() => {
            playerPos = { x: nx, y: ny };
            movementDirection = this.direction;

            const nextTile = boardState[ny][nx];
            nextTile.onPlayerEnter();

            updateAllCells();
            updateScore();
            isLocked = false;

            if (checkWinCondition()) winGame();
          }, 100); // ~1 frame delay for effect
        }
      }
    },

    showValidMoves() {
        showCardinalMoves(this.x, this.y);
    }

  },

   Ice: {
    onPlayerEnter() {
      if (!this.conquered) {
        this.conquered = true;
      }

      const delta = {
        up: [0, -1],
        down: [0, 1],
        left: [-1, 0],
        right: [1, 0]
      }[movementDirection];

      if (!delta) return; // safeguard if direction unknown

      let nx = this.x + delta[0];
      let ny = this.y + delta[1];

    if (
        nx >= 0 && nx < 5 &&
        ny >= 0 && ny < 5
    ) {
      isLocked = true;
      //playSoundEffect(sfxIce)
      setTimeout(() => {
        playerPos = { x: nx, y: ny };
        const nextTile = boardState[ny][nx];

        // direction persists
        nextTile.onPlayerEnter();

        updateAllCells();
        updateScore();
        isLocked = false;

        if (checkWinCondition()) winGame();
      }, 100);
    } else {
      return;
     }
    },

    showValidMoves() {
      showCardinalMoves(this.x, this.y);
    }
  }

};

//// Core Helpers

function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  screen.classList.add('active');

  const activeScreen = document.querySelector('.screen.active');
  const newMusic = screenMusicMap.get(activeScreen) || null;

  if (currentMusic && currentMusic !== newMusic) {
    currentMusic.pause();
    currentMusic.currentTime = 0;
  }

  if (newMusic && currentMusic !== newMusic) {
    newMusic.play().catch(e => {
      console.warn("Autoplay blocked:", e);
    });
    currentMusic = newMusic;
  }
}

function playSoundEffect(audio, volume = 1.0) {
  const clone = audio.cloneNode();
  clone.volume = volume;
  clone.play().catch(() => {});
}



function showSeedScreen(){ // This shouldn't be needed
  showScreen(seedScreen);
}

function backToHome(){
  isDaily = false;
  seed = null;
  if (tickTimer !== null) {
    clearInterval(tickTimer);
  }
  showScreen(startScreen)
}
//// Rando Helpers

function startRando() {
  time = 0;
  moves = 0;
  isDaily = false;
  updateScore();
  seed = generateRandomSeed();
  dateDisplay.textContent = 'Seed: ' + seed;

  generateGrid(seed);

  showScreen(gameScreen);

  if (tickTimer !== null) {
    clearInterval(tickTimer);
  }

  tickTimer = setInterval(() => {
    time += 1;
    updateScore();
  }, 1000);
}

function generateRandomSeed() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let str = '';
  for (let i = 0; i < 8; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

//// 'Fixed mode' Helpers

function startFixed(newSeed) {
  time = 0;
  moves = 0;
  isDaily = false;
  updateScore();
  seed = newSeed
  dateDisplay.textContent = 'Seed: ' + seed;

  generateGrid(seed);

  showScreen(gameScreen);

  if (tickTimer !== null) {
    clearInterval(tickTimer);
  }

  tickTimer = setInterval(() => {
    time += 1;
    updateScore();
  }, 1000);
}

function generateRandomSeed() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let str = '';
  for (let i = 0; i < 8; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}


///// Daily Helpers

function startDaily() {

  if (isFirstDailyToday()) {
    hasWonDaily = false;
    time = 0;
    moves = 0;
  }
  markDailyPlayed();
  if (hasWonDaily) {
     time = 0;
     moves = 0;
  }
  console.log(hasWonDaily)
  isDaily = true;
  updateScore();
  dateDisplay.textContent = 'Date: ' + getTodayDate();
  currentDate = getTodayDate();


  seed = dateToSeed(getTodayDate());
  generateGrid(seed);

  showScreen(gameScreen);

  if (tickTimer !== null) {
    clearInterval(tickTimer);
  }

  tickTimer = setInterval(() => {
    time += 1;
    updateScore();
  }, 1000);
}

function isFirstDailyToday() {
  const today = getTodayDate();
  const lastPlayed = localStorage.getItem("lastDailyDate");

  return lastPlayed !== today;
}

function markDailyPlayed() {
  const today = getTodayDate();
  localStorage.setItem("lastDailyDate", today);
}


function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function dateToSeed(dateStr) {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) >>> 0;
  }
  return hash;
}

///// Board Generation

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

function createCellData(x, y, rng) {
  const types = [
    { name: "Loop", weight: 3 },
    { name: "Shield", weight: 4 },
    { name: "Back", weight: 3 },
    { name: "Clock", weight: 1 },
    { name: "Wingshoe", weight: 1 },
    { name: "Bomb", weight: 1 },
    { name: "Bishop", weight: 2 },
    { name: "Rook", weight: 2 },
    { name: "Arrow", weight: 4 },
    { name: "Ice", weight: 4 }
  ];

  const pool = types.flatMap(t => Array(t.weight).fill(t.name));
  const type = pool[Math.floor(rng() * pool.length)];

  const cell = {
    x,
    y,
    type,
    conquered: false,
    ...TileBehaviors[type]
  };

  if (type === "Arrow") {
    const dirs = [];
    if (y > 0) dirs.push("up");
    if (y < 4) dirs.push("down");
    if (x > 0) dirs.push("left");
    if (x < 4) dirs.push("right");
    cell.direction = dirs[Math.floor(rng() * dirs.length)];
  }

  return cell;
}

function generateGrid(seed) {
  gameGrid.innerHTML = '';
  const rng = mulberry32(seed);
  boardState = [];
  playerPos = { x: 2, y: 2 }; // center start for now

  for (let y = 0; y < 5; y++) {
    const row = [];
    for (let x = 0; x < 5; x++) {
      const cell = document.createElement('div');
      cell.className = 'square';

      const cellData = createCellData(x, y, rng);
      cell.cellData = cellData;
      cellData.dom = cell;

      cell.addEventListener('click', () => {
        handleCellClick(x, y);
      });

      makeTappableSquare(cell); // supports drag-as-tap
      gameGrid.appendChild(cell);
      row.push(cellData);
    }
    boardState.push(row);
  }

  updateAllCells(); // Show player, valid moves, conquered tiles
}

///// Updates, Click Handling

function updateScore() {
  scoreDisplay.textContent = 'Score: ' + time;
}

function updateAllCells() {
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      const cellData = boardState[y][x];
      const el = cellData.dom;

      // Clear classes
      el.classList.remove("tappable", "player-location", "stepped");

      // Apply tile image
      el.style.backgroundImage = `url(tiles/${cellData.type}.png)`;
      el.style.backgroundSize = "cover";
      el.style.transform = ""; // reset

      // Rotate arrow image to match direction
      if (cellData.type === "Arrow" && cellData.direction) {
        const rotation = {
          right: "rotate(0deg)",
          down: "rotate(90deg)",
          left: "rotate(180deg)",
          up: "rotate(270deg)",
        }[cellData.direction];

        el.style.transform = rotation;
      }

      el.classList.remove("damaged");
      if (cellData.type === "Shield") {
        if (cellData.stepCount === 1) {
          el.classList.add("damaged");
        }
      }


      if (cellData.conquered) el.classList.add("stepped");
      if (playerPos.x === x && playerPos.y === y) el.classList.add("player-location");
    }
  }

  boardState[playerPos.y][playerPos.x].showValidMoves();
}

function handleCellClick(x, y) {
  if (isLocked) return;

  const cell = boardState[y][x];
  if (!cell.dom.classList.contains("tappable")) return;

  const dx = x - playerPos.x;
  const dy = y - playerPos.y;

  if (Math.abs(dx) + Math.abs(dy) === 1) {
    if (dx === 1) movementDirection = "right";
    else if (dx === -1) movementDirection = "left";
    else if (dy === 1) movementDirection = "down";
    else if (dy === -1) movementDirection = "up";
  } else {
    movementDirection = null;
  }


  lastMovePos = { ...playerPos };
  playerPos = { x, y };
  time += 4;
  moves +=1;
  console.log (movementDirection)
  cell.onPlayerEnter(cell);
  updateAllCells();
  updateScore();

  if (checkWinCondition()) {
    winGame();
    return;
  }
}

///// Win Checking

function checkWinCondition() {
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      if (!boardState[y][x].conquered) {
        return false;
      }
    }
  }
  return true;
}

function winGame() {
  if (winScreen == document.querySelector('.screen.active')){
    return
  }
  if (tickTimer !== null) {
    clearInterval(tickTimer);
    tickTimer = null;
  }
  finalScore.textContent = 'Score: ' + time;
  finalMoves.textContent =  moves + ' moves, ' + (time-4*moves) + "s"; //WARNING
  if (isDaily) {

    if (hasWonDaily) {
      finalSeed.textContent = "Retry of " + currentDate;
    } else {
      finalSeed.textContent = dateDisplay.textContent;
      hasWonDaily = true;

    }
    
  } else {
    finalSeed.textContent = 'Seed: ' + seed;
  }

 
  showScreen(winScreen);
}

//// Tile Helpers

function showCardinalMoves(x, y) {
  const candidates = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];
  for (const [nx, ny] of candidates) {
    if (nx >= 0 && nx < 5 && ny >= 0 && ny < 5) {
      boardState[ny][nx].dom.classList.add("tappable");
    }
  }
}

function showSlidingMoves(x, y, directions) {
  for (const [dx, dy] of directions) {
    let nx = x + dx;
    let ny = y + dy;
    while (nx >= 0 && nx < 5 && ny >= 0 && ny < 5) {
      boardState[ny][nx].dom.classList.add("tappable");
      nx += dx;
      ny += dy;
    }
  }
}

function getClockwiseNeighbors(x, y) {
  // Clockwise order: NW, N, NE, E, SE, S, SW, W
  const deltas = [
    [-1, -1], [ 0, -1], [ 1, -1],
    [ 1,  0], [ 1,  1], [ 0,  1],
    [-1,  1], [-1,  0]
  ];

  return deltas.map(([dx, dy]) => {
    const nx = x + dx;
    const ny = y + dy;
    if (nx >= 0 && nx < 5 && ny >= 0 && ny < 5) {
      return { x: nx, y: ny, cell: boardState[ny][nx] };
    }
    return null; // Out of bounds
  }).filter(n => n !== null);
}

function copyCellContents(from, to) {
  to.type = from.type;
  to.conquered = from.conquered;
  to.stepCount = from.stepCount ?? 0;
  to.direction = from.direction ?? null;
  to.onPlayerEnter = from.onPlayerEnter;
  to.showValidMoves = from.showValidMoves;
}





document.getElementById('daily-button').addEventListener('click', startDaily);
document.getElementById('start-button').addEventListener('click', startRando);
document.getElementById('bail-button').addEventListener('click', backToHome);
document.getElementById('bail-button2').addEventListener('click', backToHome);
document.getElementById('bail-button3').addEventListener('click', backToHome);
document.getElementById('seed-button').addEventListener('click', showSeedScreen);

seedInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const newSeed = seedInput.value.trim();
    if (newSeed) {
      startFixed(newSeed); // your function to start a run with that seed
    }
  }
});

// Prevent page drag/scroll on touch
document.body.addEventListener('touchmove', e => e.preventDefault(), { passive: false });


//showScreen(startScreen)