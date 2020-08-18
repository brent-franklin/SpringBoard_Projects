/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
const htmlBoard = document.getElementById("board");

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < HEIGHT; i++) {
    const row = [];
    for (let j = 0; j < WIDTH; j++) {
      const rowItem = null;
      row.push(rowItem);
    }
    board.push(row);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: add comment for this code
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  let tdArr = [];
  for (let i = 5; i >= 0; i--) {
    let td = document.getElementById(`${i}-${x}`);
    tdArr.push(td);
  }

  const filteredArr = tdArr.filter((value) => !value.lastChild);
  
  if(filteredArr.length !== 0){
    return filteredArr.length - 1;
  } else {
    return null;
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const newPiece  = document.createElement('div');
  newPiece.classList.add('piece');
  const pieceLocation = document.getElementById(`${y}-${x}`);
  
  currPlayer === 1 ? newPiece.style.backgroundColor = 'red' : newPiece.style.backgroundColor = 'blue';
  
  pieceLocation.appendChild(newPiece);
  board[y].splice(x, 1, currPlayer);
      
  if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`);
      }
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  return alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;
  
  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  console.log(y);
  if (y === null) {
    return;
  }
  
  
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  
  //update currPlayer
  currPlayer === 1 ? currPlayer++ : currPlayer--;
  
  
  
  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  //grab all td's
  const tds = Array.from(document.querySelectorAll('td'));
  // create array of all td's without the first row
  const [,,,,,,, ...tdArr] = tds;
  
  // if all are full then alert "Tie Game"
  if(tdArr.every((td) => td.lastChild)) {alert('Tie Game')};
  
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  // loop over each subarray in board
  for (let y = 0; y < HEIGHT; y++) {
    //loop over each value in the subarray
    for (let x = 0; x < WIDTH; x++) {
      //create arrays of each direction to check with _win
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      //add each constant to the _win function to check
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}


makeBoard();
makeHtmlBoard();
