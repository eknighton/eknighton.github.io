


/* Static Lists */

let enemies = [];


/* Player Variables */

let player = {};
let symbols = [];
let items = [];
let attacker = null;

/* Level */

let level = null;
let lvlEnemies = [];
let lvlEnemiesAlive = 0;


/* Turn */

let gameState = {
    phase: 'setup',
    turn: 'player',
    revealed: [],
    scratchRevealed: 0
};

/* Scratching */

let revealThreshold = 16;
let revealMax = 3;
let revealBuffer = 2.5;

let fingerNail = 70;
let totalPercentRevealed = 100;
let scratches = 12;

/* UI */

const playerItemsUI = document.getElementById('player-items')
const playerStatuses = document.getElementById('player-statuses')

const tooltip = document.createElement('div');
tooltip.classList.add('tooltip');
tooltip.classList.add('scratch-card-tip');
tooltip.innerHTML = "Seeing this description is a tooltip error. Please report it.";
document.body.appendChild(tooltip);

let selectedItem = null;
let interactType = null;

let isDragging = false;
let startingX = 0;
let startingY = 0;