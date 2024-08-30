var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var board = Array.from({ length: 6 }, () => Array(7).fill(' '));
var players = [];
var currentPlayer = 0;

function displayBoard() {
  for (let row of board) {
    console.log(row.join(' | '));
  }
}

function makeMove(column, player) {
  for (let i = board.length - 1; i >= 0; i--) {
    if (board[i][column] === ' ') {
      board[i][column] = player;
      return true;
    }
  }
  return false;
}

function checkForWin(player) {
  // Check horizontally
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === player &&
        board[row][col + 1] === player &&
        board[row][col + 2] === player &&
        board[row][col + 3] === player) {
        return true;
      }
    }
  }

  // Check vertically
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 7; col++) {
      if (board[row][col] === player &&
        board[row + 1][col] === player &&
        board[row + 2][col] === player &&
        board[row + 3][col] === player) {
        return true;
      }
    }
  }

  // Check diagonally (from bottom left to top right)
  for (let row = 3; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === player &&
        board[row - 1][col + 1] === player &&
        board[row - 2][col + 2] === player &&
        board[row - 3][col + 3] === player) {
        return true;
      }
    }
  }

  // Check diagonally (from top left to bottom right)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === player &&
        board[row + 1][col + 1] === player &&
        board[row + 2][col + 2] === player &&
        board[row + 3][col + 3] === player) {
        return true;
      }
    }
  }

  return false;
}

function checkForTie() {
  for (let row of board) {
    for (let cell of row) {
      if (cell === ' ') {
        return false; // The board is not full yet
      }
    }
  }

  return true; // The board is full
}

function promptForPlayerName(playerIndex, callback) {
  rl.question(`Enter Player ${playerIndex + 1}'s name: `, function (name) {
    callback(name);
  });
}

function playerMove() {
  displayBoard();

  rl.question(`${players[currentPlayer]}, choose a column (0-6): `, function (column) {
    column = parseInt(column);

    if (makeMove(column, currentPlayer === 0 ? 'X' : 'O')) {
      if (checkForWin(currentPlayer === 0 ? 'X' : 'O')) {
        displayBoard();
        console.log(`${players[currentPlayer]} wins!`);
        rl.close();
        return;
      }

      if (checkForTie()) {
        displayBoard();
        console.log("It's a tie!");
        rl.close();
        return;
      }

      currentPlayer = currentPlayer === 0 ? 1 : 0;
      playerMove(); // Let the other player make a move
    } else {
      console.log("Invalid move. Please try again.");
      playerMove(); // Ask the same player to make a move again
    }
  });
}

function startGame() {
  promptForPlayerName(0, function (name) {
    players.push(name);
    promptForPlayerName(1, function (name) {
      players.push(name);
      console.log(`Welcome, ${players[0]} and ${players[1]}! Let's start the game.`);
      playerMove();
    });
  });
}

startGame();