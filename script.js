// JavaScript code in script.js
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const gameContainer = document.getElementById('game');
const message = document.getElementById('message');
const columns = 7;
const rows = 6;
let currentPlayer = 1;
let board = [];
let winner = null;

function createBoard() {
  for (let i = 0; i < columns; i++) {
    board[i] = [];
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;
    }
  }
}

function renderBoard() {
  gameContainer.innerHTML = '';

  const buttonRow = document.createElement('div');
  buttonRow.classList.add('row');
  for (let i = 0; i < columns; i++) {
    const column = document.createElement('div');
    column.classList.add('cell', 'clickable');
    column.innerText = '▼';
    column.setAttribute('data-col', i);
    column.addEventListener('click', handleClick);
    buttonRow.appendChild(column);
  }
  gameContainer.appendChild(buttonRow);

  for (let j = 0; j < rows; j++) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let i = 0; i < columns; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (board[i][j] === 1) {
        cell.innerText = '●';
      } else if (board[i][j] === 2) {
        cell.innerText = '○';
      }
      row.appendChild(cell);
    }
    gameContainer.appendChild(row);
  }
}

function startGame() {
  createBoard();
  renderBoard();
  currentPlayer = 1;
  winner = null;
  message.innerText = `${player1.value}'s turn`;
}

function handleClick(e) {
  if (winner) return;
  const col = e.target.getAttribute('data-col');
  for (let i = rows - 1; i >= 0; i--) {
    if (board[col][i] === 0) {
      board[col][i] = currentPlayer;
      checkForWinner();
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      renderBoard();
      if (!winner) {
        message.innerText = `${currentPlayer === 1 ? player1.value : player2.value}'s turn`;
      }
      break;
    }
  }
}

function checkForWinner() {
  // Check horizontally
  for (let i = 0; i < columns - 3; i++) {
    for (let j = 0; j < rows; j++) {
      if (board[i][j] === currentPlayer &&
        board[i + 1][j] === currentPlayer &&
        board[i + 2][j] === currentPlayer &&
        board[i + 3][j] === currentPlayer) {
        announceWinner();
        return;
      }
    }
  }

  // Check vertically
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows - 3; j++) {
      if (board[i][j] === currentPlayer &&
        board[i][j + 1] === currentPlayer &&
        board[i][j + 2] === currentPlayer &&
        board[i][j + 3] === currentPlayer) {
        announceWinner();
        return;
      }
    }
  }

  // Check diagonally (bottom-left to top-right)
  for (let i = 0; i < columns - 3; i++) {
    for (let j = 0; j < rows - 3; j++) {
      if (board[i][j] === currentPlayer &&
        board[i + 1][j + 1] === currentPlayer &&
        board[i + 2][j + 2] === currentPlayer &&
        board[i + 3][j + 3] === currentPlayer) {
        announceWinner();
        return;
      }
    }
  }

  // Check diagonally (top-left to bottom-right)
  for (let i = 0; i < columns - 3; i++) {
    for (let j = 3; j < rows; j++) {
      if (board[i][j] === currentPlayer &&
        board[i + 1][j - 1] === currentPlayer &&
        board[i + 2][j - 2] === currentPlayer &&
        board[i + 3][j - 3] === currentPlayer) {
        announceWinner();
        return;
      }
    }
  }
}

function checkForTie() {
  for (let i = 0; i < columns; i++) {
    if (board[i][rows - 1] === 0) {
      return false;
    }
  }
  message.innerText = "It's a tie!";
  return true;
}

function announceWinner() {
  message.innerText = `${currentPlayer === 1 ? player1.value : player2.value} wins!`;
  winner = currentPlayer;
}

function resetGame() {
  startGame();
}