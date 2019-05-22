console.log('JS is working!')

const tic = {
  boxNumber: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
  lastPlayed: 'O',
  // if last value was X than next value will be O, vice versa
  nextPlay: function(){
    if (this.lastPlayed === 'X'){
      return 'O';
    } else {
      return 'X';
    }
  },
  numCols: 4, // number of columns and rows
  isMatch: function(line){
    // Checks if every item in the arrays below are ALL the same
    if (line.every(x => x === 'X') || line.every(x => x === 'O')) {
      return true;
    }
  },
  win: function(){
    // this creates arrays for each possible winning line (rows,
    // columns, diagonals x 2)
    // Then the isMatch() is used to determine if all values within each
    // array are the SAME
    // If SAME then this function evaluates to true

    let x = this.numCols;

    let diagonal1 = [];
    for ( let j = 0; j < this.boxNumber.length; j+=(x+1) ) {
      diagonal1.push(this.boxNumber[j]);
    };

    if( this.isMatch(diagonal1) ){
      return true;
    };   // end of diagonal1


    let diagonal2 = [];

    for ( let j = (x-1); j < this.boxNumber.length-1; j+=(x-1) ) {
      diagonal2.push(this.boxNumber[j]);
    };

    if( this.isMatch(diagonal2) ){
      return true;
    }; // end of diagonal2


    let cols = [];

    for(let j = 0; j < x; j++){
    // creates an array within cols (i.e. cols will be an array of arrays)
      cols[j] = [];
      for ( let i = j; i < this.boxNumber.length; i+=x ) {
        cols[j].push(this.boxNumber[i]);
      }
    };

    for (let i = 0; i < cols.length; i++) {
      if( this.isMatch(cols[i]) ){
        return true;
      }
    }; // end of columns


    let rows = [];

    for(let j = 0, k = 0; j < this.boxNumber.length; j+=x, k++){
      //k is only the number for arrays, this removes empty arrays problem when using row[j]
      rows[k] = [];
      for ( let i = j; i < (j+x); i++ ) {
        rows[k].push(this.boxNumber[i]);
      }
    };

    for(let i = 0; i < rows.length; i++){
      if( this.isMatch(rows[i]) ){
        return true;
      }
    }; // end of rows


  },


};// end to tic object

//end of game logic

//change board size

$('.quarter.size').on('click', function(){

  //boardSize will be 3x3, 4x4 or 5x5 depending on what gets clicked
  const boardSize = parseInt($(this).attr("index"));

  //clear previous divs that were appended
  $( ".board" ).empty();

  // append appropriate num of divs based on boardSize
  for(i = 0; i < boardSize**2; i++){
    $(`<div class="box${i}" index="${i}"></div>`).appendTo('.board');
  };

  //calculate CSS settings based on
  const fontSize = 7+(5/boardSize)**4;

  $('.board').css({
    gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
    gridTemplateRows:  `repeat(${boardSize}, 1fr)`,
    fontSize: `${fontSize}vw`,
  });

  //fix game logic based on board size  




});





let countPlays = 0;

let gameIsWon = false;


// event delegation - attach a click handler to the
// entire document, and test the selector AT CLICK time
// before running the handler function (only if it matches)
$(document).on('click', '.board > div', function(){

  // $('.board > div').on('click', function(){
  // this allows you to click anywhere on the board
  // and to return the index depending where you click

  // disables the rest of code after a player wins by exiting function
  if (gameIsWon) {
    return
  }

  // let boxNum = $(e.target).attr('index');
  // this refers to the box you clicked on in $('.board > div')
  let boxNum = $(this).attr('index');

  console.log(boxNum);
  // console.log($(this).html());


  // if spot is empty then run code below
  if ($(this).html().length === 0 ) {

    // find out if its X or O
    const play = tic.nextPlay();

    // insert X or O into box clicked
    $(this).html(play);

    // updated lastPlayed value, turn index(string) into a number
    tic.boxNumber[parseInt(boxNum)] = play; //

    // updated lastPlayed value, turn index(string) into a number
    tic.lastPlayed = play;

    countPlays += 1;

    // also need to display draw no one wins - needs counter
    if (countPlays === 16) {
      $('.outcome').html('Draw game!');
    }
    // also need to display draw no one wins - needs counter

    if (tic.win()){
      $('.outcome').html(`Player ${play} you win!`);
      gameIsWon = true;

    }

  }

}); //end of event handler for clicks





// Big Goals
// Build a web application from scratch, without a starter codebase
// Use your programming skills to map out the game logic for a simple game like Tic Tac Toe
// Separate HTML, CSS, and JavaScript files in your application
// Build an application to a spec that someone else gives you
// Build a dynamic game that allows two players to compete
// Craft a README.md file that explains your app to the world
// Technical Requirements
// Your app must:
//
// Render a game board in the browser
// Switch turns between X and O (or whichever markers you select); your game should prevent users from playing a turn into a square that is already occupied
// Visually display which side won if a player gets three in a row or show a draw/"cat’s game" if neither wins
// Include separate HTML / CSS / JavaScript files
// Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
// Use Javascript with jQuery for DOM manipulation
// Deploy your game online, where the rest of the world can access it
// Use semantic markup for HTML and CSS (adhere to best practices)
