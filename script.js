const square = document.querySelectorAll('.sqr');
const text = document.querySelector('#heading');
const info = document.querySelector('#info');
const resetBtn = document.querySelector('#reset');

const spaces = [];
const play_0 = 'O';
const play_X = 'X';
let currentPlayer = play_0;

const drawGrid = () => {
    square.forEach((square, i) => {
      let styleString = '';
      if (i < 3) {
        styleString += 'border-bottom: 3px solid var(--text);';
      }
      if (i % 3 === 0) {
        styleString += 'border-right: 3px solid var(--text);';
      }
      if (i % 3 === 2) {
        styleString += 'border-left: 3px solid var(--text);';
      }
      if (i > 5) {
        styleString += 'border-top: 3px solid var(--text);';
      }
      square.style = styleString;
      square.addEventListener('click', squareClicked); // Had to add this click event before closing the forEach loop
    });
  };

  const squareClicked = (e) => {
    const id = e.target.id; // gives id of the div clicked
    if (!spaces[id]) { // checking if the position is empty
      spaces[id] = currentPlayer;
      e.target.innerText = currentPlayer; //if it is empty it assigns currentPlayer symbol
  
      if (playerWon()) {
        text.innerText = `${currentPlayer} has won!`; // following symbol this checks if the player has won, if not the return leaves the condition
        restart();
        return;
      }
  
      if (playerDraw()) {
        return;
      }
      currentPlayer = currentPlayer === play_0 ? play_X : play_0;
    }
  };
// Setting win conditions
// first 3 use 0th position as base. Top row, diagonally from top left. and down from top left
//  O O O
//  O O
//  O   O
  const playerWon = () => {
    if (spaces[0] === currentPlayer) {
      if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
          info.innerText = `${currentPlayer} wins up to top`;
          return true; // add true in the return so that squareClicked function can read the value returned
      }
      if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
        info.innerText = `${currentPlayer} wins on the left`;
        return true;
      }
      if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
        info.innerText = `${currentPlayer} wins diagonally`;
        return true;
      }
    }

// 8th as base. win up from base. or left from base
//     O
//     O
// O O O

    if (spaces[8] === currentPlayer) {
      if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
        info.innerText = `${currentPlayer} wins on the right`;
        return true;
      }
      if (spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
        info.innerText = `${currentPlayer} wins on the bottom`;
        return true;
      }
    }

    // Down from top middle, across from middle left, diagonal from bottom left
    //   O O
    // O O O
    // O O
    if (spaces[4] === currentPlayer) {
      if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
        info.innerText = `${currentPlayer} wins vertically on middle`;
        return true;
      }
      if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
        info.innerText = `${currentPlayer} wins horizontally on the middle`;
        return true;
      }
      if (spaces[2] === currentPlayer && spaces[6] === currentPlayer) {
        info.innerText = `${currentPlayer} wins diagonally`;
        return true;
      }
    }
  };

  const playerDraw = () => {
    let draw = 0;
    spaces.forEach((space, i) => {
      if (spaces[i] !== null) draw++; // if the squares are filled and doesn't match the above win condition, set to draw
    });
    if (draw === 9) {
      text.innerText = `Draw`;
      restart();
    }
  };

  const restart = () => {
    setTimeout(() => {
      spaces.forEach((space, i) => {
        spaces[i] = null; // setting restart function to create null value on all spaces
      });
      square.forEach((square) => {
        square.innerText = '';
      });
      text.innerText = `Play`;
      info.innerText = ``;
    }, 1000);
  };

  resetBtn.addEventListener('click', restart);
restart();
drawGrid();