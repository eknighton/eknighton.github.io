const board = ['', '', '', '', '', '', '', '', ''];
const rows = ['1', '2', '3'];
const columns = ['a', 'b', 'c'];
const rowMap = shuffleArray([...rows]);
const columnMap = shuffleArray([...columns]);
let currentPlayer = 'X';
let selectedRow = '';
let selectedColumn = '';

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

function setRow(row) {
    selectedRow = row;
    highlightButton('row', row);
    updatePlaceButtonState();
}

function setColumn(column) {
    selectedColumn = column;
    highlightButton('column', column);
    updatePlaceButtonState();
}

function highlightButton(type, value) {
    const buttons = document.querySelectorAll(`#${type}-buttons button`);
    buttons.forEach(button => {
        if (button.textContent.toLowerCase() === value.toLowerCase()) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });
}

function updatePlaceButtonState() {
    document.getElementById('place-button').disabled = !selectedRow || !selectedColumn;
}

function makeMove() {
    if (!selectedRow || !selectedColumn) {
        alert('Please select both row and column');
        return;
    }

    const cellIndex = getCellIndex(selectedRow, selectedColumn);
    if (board[cellIndex] !== '') {
        alert('Cell already occupied');
        return;
    }

    board[cellIndex] = currentPlayer;
    document.getElementById(`cell-${cellIndex}`).textContent = currentPlayer;

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    
    // Reset selected row and column
    selectedRow = '';
    selectedColumn = '';
    updatePlaceButtonState();
    
    // Remove highlight from buttons
    document.querySelectorAll('button.selected').forEach(button => button.classList.remove('selected'));
}
