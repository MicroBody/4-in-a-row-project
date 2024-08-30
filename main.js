// Define a Player class
class Player {
  constructor(name) {
    this.name = name;
  }
}

// Define a Game class
class ConnectFour {
  constructor() {
    this.players = [];
    this.currentPlayerIndex = 0;
  }

  // Function to prompt the user to enter their name
  promptForPlayerName() {
    const playerName = prompt("Enter your name: ");
    const player = new Player(playerName);
    this.players.push(player);
  }
}

// Initialize the game
const game = new ConnectFour();
game.promptForPlayerName();
console.log(`Welcome, ${game.players[0].name}! Let's start the game.`);

// Define a function to display the game board
function displayBoard(board) {
  for (let row of board) {
    console.log(row.join(' | '));
  }
}

// Initialize the game board (7 columns by 6 rows)
const board = Array.from({ length: 6 }, () => Array(7).fill(' '));
displayBoard(board);

// Function to handle player moves
function makeMove(board, column, player) {
  for (let i = board.length - 1; i >= 0; i--) {
    if (board[i][column] === ' ') {
      board[i][column] = player.token;
      return true;
    }
  }
  return false; // Column is full
}

// Function to check for a winning condition
function checkForWin(board, player) {
  const checkDirection = (row, col, dRow, dCol) => {
    let count = 0;
    while (row >= 0 && row < board.length && col >= 0 && col < board[0].length && board[row][col] === player.token) {
      count++;
      row += dRow;
      col += dCol;
    }
    return count;
  };

  const directions = [
    [0, 1],     // horizontal
    [1, 0],     // vertical
    [1, 1],     // diagonal /
    [1, -1]     // diagonal \
  ];

  for (let [dRow, dCol] of directions) {
    let total = 1 + checkDirection(row, col - dCol, -dRow, -dCol) + checkDirection(row, col + dCol, dRow, dCol);
    if (total >= 4) {
      return true;
    }
  }

  return false;
}

// Function to check for a tie condition
function checkForTie(board) {
  for (let row of board) {
    if (row.includes(' ')) {
      return false; // Empty space found, game is not a tie yet
    }
  }
  return true; // Board is full, game is a tie
}

// Game loop
let currentPlayer = game.players[game.currentPlayerIndex];
while (true) {
  // Display the board
  displayBoard(board);

  // Prompt the current player to make a move
  const column = parseInt(prompt(`${currentPlayer.name}, choose a column (0-6): `));

  // Make the move
  if (makeMove(board, column, currentPlayer)) {
    // Check for win
    if (checkForWin(board, currentPlayer)) {
      console.log(`${currentPlayer.name} wins!`);
      break;
    }

    // Check for tie
    if (checkForTie(board)) {
      console.log("It's a tie!");
      break;
    }

    // Switch players
    game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
    currentPlayer = game.players[game.currentPlayerIndex];
  } else {
    console.log("Invalid move. Please try again.");
  }
}