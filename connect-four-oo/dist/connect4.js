/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 class Color {
   constructor(){

   }
 }


  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const grid = ctx.createLinearGradient(-10, 0, 95, 0);
  grid.addColorStop(1/7, 'red');
  grid.addColorStop(2/7, 'orange');
  grid.addColorStop(3/7, 'yellow');
  grid.addColorStop(4/7, 'green');
  grid.addColorStop(5/7, 'blue');
  grid.addColorStop(6/7, 'purple');
  grid.addColorStop(7/7, 'pink');

  ctx.fillStyle = grid;
  ctx.fillRect(0,0,100,200);
  
  let chosenColor = document.getElementById('color1');
  canvas.addEventListener('mousemove', hoverColor);
  
  function hoverColor(e) {
    const colorOnImg = ctx.getImageData((e.offsetX / canvas.clientWidth) * canvas.width, (e.offsetY / canvas.clientHeight) * canvas.height, 1, 1);
    const rgba = colorOnImg.data;
    const color = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
    chosenColor.style.background = color;
  }
    
  let count = 0;
  const heading = document.querySelector('h1');
  canvas.addEventListener('click', pickHoverColor);
      
  function pickHoverColor(e){
        chosenColor = document.getElementById('color2');
        heading.innerText = 'Player 2';
        
        if(count === 1){
          heading.innerText = 'Player 1';
          heading.previousElementSibling.style.display = 'none'
          canvas.style.display = 'none';
          let btn = document.getElementById('btn');
          btn.style.display = 'block';
        }
        count++;
      }

      
  class Game {
    constructor(HEIGHT, WIDTH, player1, player2){
      this.players = [player1, player2];
      this.WIDTH = WIDTH;
      this.HEIGHT = HEIGHT;
      this.currPlayer = this.players[0]; // active player: 1 or 2
      this.makeBoard();
      this.makeHtmlBoard();
    }
    
    
  makeBoard() {
    this.board = []; // array of rows, each row is array of cells  (board[y][x])
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }
  /** makeHtmlBoard: make HTML table and row of column tops. */
  
  makeHtmlBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    
    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    this.handleGameClick = this.handleClick.bind(this);
    top.addEventListener('click', this.handleGameClick);
    
    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
    
    board.append(top);
    
    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement('tr');
      
    for (let x = 0; x < this.WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }
    
    board.append(row);
    start.innerText = 'Restart Game';
  }
  }
  
  
  /** makeBoard: create in-JS board structure:
   *   board = array of rows, each row is array of cells  (board[y][x])
   */
  
  
  
  /** findSpotForCol: given column x, return top empty y (null if filled) */
  
  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }
  
  /** placeInTable: update DOM to place piece into HTML table of board */
  
  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = 
    this.currPlayer.color === '' ? 'black': this.currPlayer.color;
    
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }
  
  /** endGame: announce game end */
  
  endGame(msg) {
    alert(msg);
  }
  
  /** handleClick: handle click of column top to play piece */
  
  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;
    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }
    
    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);
    
    // check for win
    if (this.checkForWin()) {
      start.innerText = 'Play Again?';
      this.board.removeEventListener();
      return this.endGame(`Player ${this.currPlayer} won!`);
    }
    
    // check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }
    
    // switch players
    this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] :this.players[0];
    heading.innerText = heading.innerText === 'Player 1' ? 'Player 2' : 'Player 1';
  }
  
  /** checkForWin: check board cell-by-cell for "does a win start here?" */
  
  checkForWin() {
    const _win = (cells) => {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
      cells.every(
        ([y, x]) => {
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this. WIDTH &&
          this.board[y][x] === this.currPlayer
        });
      }           

      
      for (let y = 0; y < this.HEIGHT; y++) {
        for (let x = 0; x < this.WIDTH; x++) {
          // get "check list" of 4 cells (starting here) for each of the different
          // ways to win
          const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
          const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
          const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
          const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
          
          // find winner (only checking each win-possibility as needed)
          if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
            return true;
          }
        }
      }
    }
  }

  class Player {
    constructor(color){
      this.color = color;
    }
  }

  const start = document.querySelector('#btn');
  start.addEventListener('click', () => {
    let player1 = new Player(document.getElementById('color1').style.backgroundColor);
    let player2 = new Player(document.getElementById('color2').style.backgroundColor);
    new Game(6,7, player1, player2);
  });
  
  
  