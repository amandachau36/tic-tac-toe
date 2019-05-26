console.log('JS is working!')

const tic = {
  boxNumber: [],
  lastPlayed: 'O',
  // if last value was X than next value will be O, vice versa
  nextPlay: function(){
    if (this.lastPlayed === 'X'){
      return 'O';
    } else {
      return 'X';
    }
  },
  numCols: 3, // number of columns and rows
  createBoxNumber: function(){

    this.boxNumber = [];

    for (let i = 0; i < this.numCols**2; i++) {
      this.boxNumber.push(i);
    }
  },
  oScore: 0,
  xScore: 0,
  isMatch: function(line, player){
    // Checks if every item in the arrays below are ALL the same
    if (line.every(x => x === player)) {
      return true;
    }

  },
  win: function(player){
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

    if( this.isMatch(diagonal1, player) ){
      return true;
    };   // end of diagonal1


    let diagonal2 = [];

    for ( let j = (x-1); j < this.boxNumber.length-1; j+=(x-1) ) {
      diagonal2.push(this.boxNumber[j]);
    };

    if( this.isMatch(diagonal2, player) ){
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
      if( this.isMatch(cols[i], player) ){
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
      if( this.isMatch(rows[i], player) ){
        return true;
      }
    }; // end of rows


  },
  randomMove: function(){
    //Create an array of empty boxes
    const possibleMoves = this.boxNumber.filter(x => typeof(x) === 'number');
    //From the new array (which contains indices without X or O), pick a an empty spot
    const randomIndex = Math.floor(Math.random()*(possibleMoves.length));
    return possibleMoves[randomIndex];
  },
  arrayOfBetterMoves: [],
  oneMoreToWin: function(line, lastPlayed){
    let arrayOfOne = line.filter(x => typeof(x) === 'number');
    // console.log(arrayOfOne);
    if (arrayOfOne.length > 0) {
      this.arrayOfBetterMoves.push(arrayOfOne[0]);
      // console.log(tic.arrayOfBetterMoves);
    }
  },
  findBetterMoves: function(lastPlayed){
    let x = this.numCols;
    this.arrayOfBetterMoves = [];

    let diagonal1 = [];
    for ( let j = 0; j < this.boxNumber.length; j+=(x+1) ) {
      diagonal1.push(this.boxNumber[j]);
    };


    if(diagonal1.filter(x => x === this.lastPlayed).length === (x - 1) ){
      this.oneMoreToWin(diagonal1, this.lastPlayed);
    };   // end of diagonal1


    let diagonal2 = [];

    for ( let j = (x-1); j < this.boxNumber.length-1; j+=(x-1) ) {
      diagonal2.push(this.boxNumber[j]);
    };

    if( diagonal2.filter(x => x === this.lastPlayed).length === (x - 1) ){
      this.oneMoreToWin(diagonal2, this.lastPlayed);
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
      if( cols[i].filter(x => x === this.lastPlayed).length === (x - 1) ) {
        this.oneMoreToWin(cols[i], this.lastPlayed);
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
      if( rows[i].filter(x => x === this.lastPlayed).length === (x - 1) ) {
        this.oneMoreToWin(rows[i], this.lastPlayed);
      }
    }; // end of rows

    const randomIndex = Math.floor(Math.random()*(this.arrayOfBetterMoves.length));
    return this.arrayOfBetterMoves[randomIndex];

  },
  singlePlayer: false,
  countPlays: 0,
  updateTic: function(play){
    this.lastPlayed = play;
    this.countPlays += 1;
  },
  gameIsWon: false,
  computerTurn: false,



};// end to tic object

//end of game logic





const displayTurn = function(){
  $('#displayTurn').html(`${tic.nextPlay()}`);
};

const clear = function(){

//hides winner/draw banner
    $('.outcome').hide();

//reset to initial conditions
  tic.countPlays = 0;
  tic.gameIsWon = false;
  tic.computerTurn = false;

  // for the singlePlayer mode let player X start again
  if (tic.singlePlayer === true){
    tic.lastPlayed = 'O';
  };
// generates boxNumber array with numbers again
  tic.createBoxNumber();

  displayTurn();


};




//change board size
$('.quarter.size').on('click', function(){

  //boardSize will be 3x3, 4x4 or 5x5 depending on what gets clicked
  const boardSize = parseInt($(this).attr("index"));

  //fix game logic based on board size
  tic.numCols = boardSize;

  // resets to initial settings and regenerates array
  clear();

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


}); // end of boardsize



// clears board so that you can play again
$('#reset').on('click', function(){

  // clear x and o from board
  $('.board > div').html('');

  clear();

});


// clears score and resets back to 0:0
$('#clearScore').on('click', function(){
  //resets object back to 0
  tic.oScore = 0;
  tic.xScore = 0;
  // displays 0 from object on UI
  $('#xScore').html(`${tic.xScore}`);
  $('#oScore').html(`${tic.oScore}`);

});

// toggles between single player mode and 2 player Mode
// 2 player mode is the default
// also clears boards (reset button)
$('#single').on('click', function(){
  $('.board > div').html('');
  clear();
  if (tic.singlePlayer === false){
    tic.singlePlayer = true;
    tic.lastPlayed = 'O';
    $(this).css("color", "rgb(215, 214, 218)");
  } else {
    tic.singlePlayer = false;
    $(this).css("color", "rgb(85, 85, 85)");
  };

});


//UI update if there is a win
const youWin = function(play){
  $('.outcome').html(`Player ${play} wins!`);
  $('.outcome, .outcomeBackground').show();
  tic.gameIsWon = true;
  if (play === 'X'){
    tic.xScore += 1;
  } else {
    tic.oScore += 1;
  };
  $('#xScore').html(`${tic.xScore}`);
  $('#oScore').html(`${tic.oScore}`);

};

//UI update if there is a draw
const draw = function(){
    $('.outcome').html('Draw game!');
    $('.outcome, .outcomeBackground').show();
};










// $('.board > div').on('click', function(){
// this allows you to click anywhere on the board
// and to return the index depending where you click
$(document).on('click', '.board > div', function(){


    // disables the rest of code if player has won or if waiting for the comp to take a turn
    if (tic.gameIsWon || tic.computerTurn ) {
      return;
    }

    // let boxNum = $(e.target).attr('index');
    // this refers to the box you clicked on in $('.board > div')
    let boxNum = $(this).attr('index');


    // if spot is empty then run code below
    if ($(this).html().length === 0 ) {

      // find out if its X or O
      let play = tic.nextPlay();



      // insert X or O into box clicked
      $(this).html(play);

      // updated lastPlayed value, turn index(string) into a number
      tic.boxNumber[parseInt(boxNum)] = play; //

      // updated lastPlayed value, turn index(string) into a number

      tic.updateTic(play);


      displayTurn();

      if (tic.win(play)){
        youWin(play);
      } else if (tic.countPlays === (tic.numCols)**2) {
        draw();
      }



      if (tic.singlePlayer) {
      // disable clicks until computer plays
        tic.computerTurn = true;

        if (tic.gameIsWon === false){
          window.setTimeout(function(){

              play = tic.nextPlay();

              const computerMoveBetter = tic.findBetterMoves();

              if (tic.arrayOfBetterMoves.length > 0) {
                $(`.box${computerMoveBetter}`).html(play);
                tic.boxNumber[computerMoveBetter] = play;
              } else {
                const computerMove = tic.randomMove();

                // put computer's play on screen
                $(`.box${computerMove}`).html(play);

                //update tic object
                tic.boxNumber[computerMove] = play;
              }

              // save random available index


              tic.updateTic(play);

              if (tic.win(play)){
                youWin(play);
              } else if (tic.countPlays === (tic.numCols)**2) {
                draw();
              }

              tic.computerTurn = false;
              displayTurn();

          }, 900);
        }
      }
    }
});







// event delegation - attach a click handler to the
// entire document, and test the selector AT CLICK time
// before running the handler function (only if it matches)
// $(document).on('click', '.board > div', function(){
//
