$(document).ready(function() {


    var player = "";
    var playerOneMove = [];
    var playerTwoMove = [];
    var isWinner = {
        senario1: ['cell1', 'cell2', 'cell3'],
        senario2: ['cell4', 'cell5', 'cell6'],
        senario3: ['cell7', 'cell8', 'cell9'],
        senario4: ['cell1', 'cell5', 'cell9'],
        senario5: ['cell3', 'cell5', 'cell7'],
        senario6: ['cell1', 'cell4', 'cell7'],
        senario7: ['cell2', 'cell5', 'cell8'],
        senario8: ['cell3', 'cell6', 'cell9'],
    }

    //assign tokens to each player;

    var playerOne = 'x';
    var playerTwo = 'o';


    //decide whose turn is it
    // set the player’s turn at the start of the game
    // change the player’s turn after each turn;
    var turn = "playerOne";





    //this fuction picks up who has won the game by checking if they have three in a row in any direction
    // if yes game is over, if no, change player turn
    var getWinner = function(player) {

        if (player === "playerOne") {
            var playerMoves = playerOneMove;
        }
        if (player === "playerTwo") {
            var playerMoves = playerTwoMove;
        }
        if (playerMoves.join('') === isWinner.senario1.join('') ||
            playerMoves.join('') === isWinner.senario2.join('') ||
            playerMoves.join('') === isWinner.senario3.join('') ||
            playerMoves.join('') === isWinner.senario4.join('') ||
            playerMoves.join('') === isWinner.senario5.join('') ||
            playerMoves.join('') === isWinner.senario6.join('') ||
            playerMoves.join('') === isWinner.senario7.join('') ||
            playerMoves.join('') === isWinner.senario8.join('')
        ) {
            alert(player + ' wins! click New Game to play again !')
            return;
        }

    };


    //this function allows each player to make moves alternatively,record the moves into two arrays for playerOne and PlayerTwo.  preventing clicking on already taken spots
    $('.box').on('click', function() {
        if (turn === "playerOne") {

            playerMove(this, "playerOne")
            //you can pass in anything for " this" eg. playerMove( $('.box:first'), "playerOne" ); whichever box you click on it will log cell1

        } else {

            playerMove(this, "playerTwo")
        }
    });


    //This function takes a box element from the page and a player and places that players image in that box.
    //I am passing in " this" in the event handler into this function, first argument 'box'is just a place holder
    //can not use 'this' out of an event handler
    //ths reason why i can put playerMove funciton after click event is that the playerMove function will already be loaded when clicking on the boxes
    var playerMove = function(box, player) {
        if (player === 'playerOne') {
            var playerMoves = playerOneMove;
            var bgImage = "url('images/redxsmall.png')";
            var nextTurn = 'playerTwo';
        } else {
            var playerMoves = playerTwoMove;
            var bgImage = "url('images/circle-small.png')";
            var nextTurn = 'playerOne';
        }
        if ($(box).css('background-image') !== "none") {
            alert('pick another box');
        } else {
            $(box).css({
                    "background-image": bgImage
                }) //do something here to make image representation of that player  appear in the box

            var ID = $(box).attr('id'); //record this move by grabing the id of that cell
            ID = ID.toString(); //return the ID of that cell as a string
            playerMoves.push(ID); //creating a collection of player's moves
            playerMoves = playerMoves.sort(); //sort this array to make it in numerial order
            console.log(playerMoves)

            getWinner(player);

            turn = nextTurn;
        }
    }




    // if one of the players win, start a new game
    $('#new-game').on('click', function() {
        console.log('start new game ')
        $('.box').css('background-image') = "none";

    })


    // end the game to resume the gameboard
    $('#end-game').on('click', function() {
        console.log('end your game ')
    })


});
