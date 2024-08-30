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
}

function checkForTie() {
  // Function to check for a tie condition
  function checkForTie(board) {
    for (let row of board) {
      if (row.includes(' ')) {
        return false; // Empty space found, game is not a tie yet
      }
    }
    return true; // Board is full, game is a tie
  }
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