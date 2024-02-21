const gameBoard = (() => {

  let board = ['','','','','','','','',''];

  let currentMarker = 'x';
  let winningComboFound = false;
  let movesCount = 0;

  const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];  

  const placeMarker = (cellNumber) => {
    if (winningComboFound || movesCount === 9) {
      renderTextBox.changeText('Game is already over.');
      return;
    };

    if (board[cellNumber] === '') {
      if (currentMarker === 'x') {
        renderTextBox.changeText(`Player 2's turn`);
        board[cellNumber] = 'x';
        currentMarker = 'o';
        movesCount++;
        renderContainer.renderBoard();
        checkForWinOrTie();
      } else if (currentMarker === 'o') {
        renderTextBox.changeText(`Player 1's turn`);
        board[cellNumber] = 'o';
        currentMarker = 'x';
        movesCount++;
        renderContainer.renderBoard();
        checkForWinOrTie();
      };
    };
  };

  const checkForWinOrTie = () => {
    if (winningComboFound) {
      return
    };
    winningCombos.forEach((combo) => {
      const [a, b, c] = combo;
      const marker = board[a];

      if (marker && marker === board[b] && marker === board[c]){
        renderTextBox.changeText(`${marker === 'x' ? 'Player 1' : 'Player 2'} wins!`);
        winningComboFound = true;
      };
    });

    if (!winningComboFound && movesCount === 9) {
      renderTextBox.changeText(`It's a tie!`)
    };
  };

  const renderContainer = (() => {
    const container = document.createElement('div');
    container.classList.add('board-container');
    document.body.appendChild(container);

    const renderBoard = () => {
      container.innerHTML = '';
      board.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('created-cell');
        cellDiv.innerText = cell;
        container.appendChild(cellDiv);
  
        cellDiv.addEventListener('click', () => {
          placeMarker(index);
        });
      });
    };

    return {
      renderBoard
    };
  })();
  renderContainer.renderBoard();

  const renderTextBox = (() => {
    const textBox = document.createElement('h1');
    textBox.classList.add('text-box');
    textBox.innerText = `Player 1's turn`;
    document.body.appendChild(textBox);

    const changeText = (text) => {
      textBox.innerText = text;
    };

    return {
      changeText
    };
  })();

  const renderResetButton = (() => {
    const button = document.createElement('button');
    button.innerText = 'Reset';
    button.classList.add('reset-button');
    document.body.appendChild(button);

    const resetBoard = () => {
      button.addEventListener('click', () => {
        board = ['','','','','','','','',''];
        currentMarker = 'x';
        winningComboFound = false;
        movesCount = 0;
        renderTextBox.changeText(`Player 1's turn`);
        renderContainer.renderBoard();
      });
    };

    return {
      resetBoard
    };
  })();
  renderResetButton.resetBoard();

})();


