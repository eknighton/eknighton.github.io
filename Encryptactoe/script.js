const board = ['', '', '', '', '', '', '', '', ''];
const rows = ['1', '2', '3'];
const columns = ['a', 'b', 'c'];
const rowMap = shuffleArray([...rows]);
const columnMap = shuffleArray([...columns]);
let currentPlayer = 'X';
document.getElementById('row').value = '';
document.getElementById('column').value = '';

window.alert("Specify a row and a column to place your piece.\nLook out, the names of each row and column have been randomly shuffled!");

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getCellIndex(row, column) {
    const rowIndex = rowMap.indexOf(row);
    const columnIndex = columnMap.indexOf(column);
    return rowIndex * 3 + columnIndex;
}

function makeMove() {
    const row = document.getElementById('row').value;
    const column = document.getElementById('column').value;
    
    if (!rows.includes(row) || !columns.includes(column)) {
        alert('Invalid input');
        return;
    }
    
    const cellIndex = getCellIndex(row, column);
    if (board[cellIndex] !== '') {
        alert('Cell already occupied');
        return;
    }

    board[cellIndex] = currentPlayer;
    document.getElementById(`cell-${cellIndex}`).textContent = currentPlayer;

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    // Clear input boxes
    document.getElementById('row').value = '';
    document.getElementById('column').value = '';
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}
