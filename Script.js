// Selectors
const cells = document.querySelectorAll('[data-cell]');
const statusText = document.querySelector('.game-status');
const restartBtn = document.getElementById('restart-btn');

// Variables
let isXTurn = true;
let gameActive = true;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let boardState = Array(9).fill(null);

// Functions
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] || !gameActive) return;

    const currentPlayer = isXTurn ? 'X' : 'O';
    boardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWin(currentPlayer)) {
        statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
        gameActive = false;
    } else if (boardState.every(cell => cell)) {
        statusText.textContent = 'It\'s a Draw! 🤝';
        gameActive = false;
    } else {
        isXTurn = !isXTurn;
        statusText.textContent = `Player ${isXTurn ? 'X' : 'O'}'s Turn`;
    }
}

function checkWin(player) {
    return winningCombinations.some(combination =>
        combination.every(index => boardState[index] === player)
    );
}

function restartGame() {
    isXTurn = true;
    gameActive = true;
    boardState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
    statusText.textContent = "Player X's Turn";
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
