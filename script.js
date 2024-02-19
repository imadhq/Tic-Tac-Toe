const gameBoard = (() => {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  const displayBoard = () => {
    console.log(board);
  }

  let currentMarker = '';
  let winningComboFound = false;

  const placeMarker = (cellNumber) => {
    if (winningComboFound) {
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
        currentMarker = 'x'
        displayBoard();
        checkForWin();
      } else if (currentMarker === 'x') {
        board[row][col] = 'o';
        currentMarker = 'o'
        displayBoard();
        checkForWin();
      }
    } 
    else {
      console.log('Choose a different number, this cell is already filled');
    }
  };

  const checkForWin = () => {
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
  };

  displayBoard();

  return {
    displayBoard,
    placeMarker,
    checkForWin
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


