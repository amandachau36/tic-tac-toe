console.log('JS is workingg!')


// $('.box3').on('click', function(){
//   console.log('you clicked on box 3')
// });

const tic = {
  boxNumber: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
  lastPlayed: 'O', // let players pick

 // if last value was X than next value will be O
  nextPlay: function(){
    if (this.lastPlayed === 'X'){
      return 'O';
    } else {
      return 'X';
    }
  },

  numCols: 4, // number of columns and rows
  win: function(){

    const n = this.boxNumber;  //just to shorten things
    let x = this.numCols;

    let diagonal1 = [];
    for ( let j = 0; j < n.length; j+=(x+1) ) {
      diagonal1.push(n[j]);
    };

    if (diagonal1.every(x => x === 'X') || diagonal1.every(x => x === 'O')){
      return true
    };
    // end of diagonal1

    let diagonal2 = [];

    for ( let j = (x-1); j < n.length-1; j+=(x-1) ) {
      diagonal2.push(n[j]);
    };

    if (diagonal2.every(x => x === 'X') || diagonal2.every(x => x === 'O')){
      return true
    };
    // end of diagonal2

    let cols = [];

    for(let j = 0; j < x; j++){
      cols[j] = [];
      for ( let i = j; i < n.length; i+=x ) {
        cols[j].push(n[i]);
      }
    };

    for (let i = 0; i < cols.length; i++) {
      if (cols[i].every(x => x === 'X') || cols[i].every(x => x === 'O')){
        return true
      }
    }; // end of columns


    let rows = [];

    for(let j = 0; j < n.length; j+=x){
    	rows[j] = [];
      for ( let i = j; i < (j+x); i++ ) {
        rows[j].push(n[i]);
      }
    };
    // what happens to the empty arrays . . . . ..
    for(let i = 0; i < rows.length; i+=x){
      if (rows[i].every(x => x === 'X') || rows[i].every(x => x === 'O')){
        return true
      }
    }; // end of row arrays


  },



};// end to tic object






// keep track of plays
let countPlays = 0;

let gameIsWon = false;



$('.board > div').on('click', function(){
// this allows you to click anywhere on the board
// and to return the index depending where you click . . . how does this work???

  if (gameIsWon) {
    return
  }

  // let boxNum = $(e.target).attr('index');
  // this refers to the box you clicked on in $('.board > div')
  let boxNum = $(this).attr('index');

  // console.log(boxNum);
  // console.log($(this).html());



// if spot is empty then run code below
  if ($(this).html().length === 0 ) {

    // find out if its X or O
    const play = tic.nextPlay();

    // insert X or O into box clicked
    $(this).html(play);

    // updated lastPlayed value
  // remove all letters and turn string into numbers and save in array
    tic.boxNumber[parseInt(boxNum)] = play; //


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

// make height the same as width 
// var cw = $('.child').width();
// $('.child').css({'height':cw+'px'});


// $(`<div class="box${work}"></div>`).appendTo('body');



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
