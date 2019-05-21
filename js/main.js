console.log('JS is workingg!')


// $('.box3').on('click', function(){
//   console.log('you clicked on box 3')
// });

const tic = {
  boxNumber: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
  lastPlayed: 'O', // let players pick

 // if last value was X than next value will be O
  nextPlay: function(){
    if (this.lastPlayed === 'X'){
      return 'O';
    } else {
      return 'X';
    }
  },
  numCols: 3,
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


//
// let cols = [];
//
// const arrayNum = [0, 1, 2, 3, 4, 5, 6, 7, 8];
//
// for(let j = 0; j < x; j++){
//   cols[j] = [];
//   for ( let i = j; i < arrayNum.length; i+=x ) {
//     cols[j].push(arrayNum[i]);
//   }
// }; // end of column arrays
//
// let rows = [];
// for(let j = 0; j < arrayNum.length; j+=x){
// 	rows[j] = [];
// for ( let i = j; i < (j+x); i++ ) {
//   rows[j].push(arrayNum[i]);
//   }
// }; // end of row arrays . . there are some empty rows not sure if this is a problem
// consider filtering them out if it is an issue
// var filtered = array.filter(function (el) {
//   return el != null;
// });




//
// // to determine if the array is WINNERR
// diagonal2.every(x => x === 'X') || diagonal2.every(x => x === 'O');



// keep track of plays
let countPlays = 0;


$('.board > div').on('click', function( e ){
// this allows you to click anywhere on the board
// and to return className of target depending where you click
  let boxNum = e.target.className; //$(e.target).attr('index')

// if spot is empty then run code below

  if ($(`.${boxNum}`).html().length === 0 ) {

    // find out if its X or O
    const play = tic.nextPlay();

    // insert X or O into box clicked
    $(`.${boxNum}`).html(play);

    // updated lastPlayed value
    tic.boxNumber[parseInt(boxNum.replace(/\D/g,''))] = play;  // need to splice, slice or dice to get number only
    tic.lastPlayed = play;

    countPlays += 1;

      // also need to display draw no one wins - needs counter
    if (countPlays === 9) {
      $('.outcome').html('Draw game!');
    }
    // also need to display draw no one wins - needs counter

    if (tic.win()){
      $('.outcome').html(`Player ${play} you win!`);
      $('.board > div').off('click');

    }

  }

}); //end of event handler for clicks



    // need to stop game someone


// const updateTic = function(boxNum, play){
//   tic.boxNumber[boxNum] = play;
//   tic.lastPlayed = play;
// };



// $('.box1').on('click', function(){
//   const play = tic.nextPlay();
//   $('.box1').html(play);
//   updateTic('box1', play);
//
// });
//
// $('.box2').on('click', function(){
//   const play = tic.nextPlay();
//   $('.box2').html(play);
//   tic.boxNumber.box2 = play;
//   tic.lastPlayed = play;
// });
//
// $('.box3').on('click', function(){
//   $('.box3').html('X');
// });
//
// $('.box4').on('click', function(){
//   $('.box4').html('X');
// });
//
// $('.box5').on('click', function(){
//   $('.box5').html('X');
// });
//
// $('.box6').on('click', function(){
//   $('.box6').html('X');
// });
//
// $('.box7').on('click', function(){
//   $('.box7').html('X');
// });
//
// $('.box8').on('click', function(){
//   $('.box8').html('X');
// });
//
// $('.box9').on('click', function(){
//   $('.box9').html('X');
// });
//


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
