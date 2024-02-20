const gameBoard = (() => {
  const board = [
    ['X', '', ''],
    ['', 'O', ''],
    ['', '', '']
  ];

  const displayBoard = () => {
    console.log(board);
  }

  let currentMarker = '';
  let winningComboFound = false;
  let movesCount = 0;

  const placeMarker = (cellNumber) => {
    if (winningComboFound || movesCount === 9) {
      console.log('Game is already over.');
      return;
    }

    if (cellNumber < 0 || cellNumber > 8) {
      console.log('Error - input number from 0 - 8');
      return;
    } 

    const row = Math.floor(cellNumber / 3);
    const col = cellNumber % 3;
    
    if (board[row][col] === '') {
      if (currentMarker === '' || currentMarker === 'o') {
        board[row][col] = 'x';
        currentMarker = 'x';
        movesCount++;
        displayBoard();
        checkForWinOrTie();
      } else if (currentMarker === 'x') {
        board[row][col] = 'o';
        currentMarker = 'o';
        movesCount++;
        displayBoard();
        checkForWinOrTie();
      }
    } 
    else {
      console.log('Choose a different number, this cell is already filled');
    }
  };

  const checkForWinOrTie = () => {
    if (winningComboFound) {
      return
    }
    winningCombos.forEach((combo) => {
      const [a, b, c] = combo;
      const marker = board[Math.floor(a / 3)][a % 3];

      if (marker && marker === board[Math.floor(b / 3)][b % 3] && marker === board[Math.floor(c / 3)][c % 3]){
        console.log(`${marker} wins!`)
        winningComboFound = true;
      }
    });

    if (!winningComboFound && movesCount === 9) {
      console.log(`It's a tie!`)
    }
  };

  displayBoard();

  const renderBoard = () => {
    const boardContainer = document.createElement('div');
    boardContainer.classList.add('board-container');
    document.body.appendChild(boardContainer);

    board.forEach((row) => {
      row.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('created-cell');
        cellDiv.innerText = cell
        boardContainer.appendChild(cellDiv)
      });
    });
  };

  renderBoard();

  return {
    placeMarker,
  };

})();

const winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
]


