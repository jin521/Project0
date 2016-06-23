$(document).ready(function() {
    var player;
    var playerOneMove; // collection of all the moves of this player
    var playerTwoMove;
    var turn;
    var counter = 0;
    var score1 = 0;
    var score2 = 0;

    var initialize = function() {
        turn = "playerOne";
        playerOneMove = [];
        playerTwoMove = [];
        $('.box').css({
            'background-image': "none"
        });
        counter = 0;

    }
    initialize(); // initialize to start the game

    var scenarios = [
        ['cell1', 'cell2', 'cell3'],
        ['cell4', 'cell5', 'cell6'],
        ['cell7', 'cell8', 'cell9'],
        ['cell1', 'cell5', 'cell9'],
        ['cell3', 'cell5', 'cell7'],
        ['cell1', 'cell4', 'cell7'],
        ['cell2', 'cell5', 'cell8'],
        ['cell3', 'cell6', 'cell9']
    ];



    //decide whose turn is it
    // set the player’s turn at the start of the game
    // change the player’s turn after each turn;


    //this fuction picks up who has won the game by checking if they have three in a row in any direction
    // if yes game is over, if no, change player turn
    var getWinner = function(player) {

        if (player === "playerOne") {
            var playerMoves = playerOneMove;
        } else {
            var playerMoves = playerTwoMove;
        }

        playerMoves.sort();

        if (counter < 9) {
            for (var i = 0; i < scenarios.length; i++) {
                var match = 0;
                for (var j = 0; j < playerMoves.length; j++) {
                    if (scenarios[i].includes(playerMoves[j])) {
                        match += 1;
                    }
                }

                if (match === 3) {

                    swal({
                        title: "Sweet!",
                        text: player + "  won",
                        imageUrl: "images/goodjob.png"
                    });
                    initialize();
                    return true;
                }
            }
            if (player === "playerOne") {
                score1++;
                $('#player1notes').text(score1)
            } else {
                score2++;
                $('#player2notes').text(score2)
            }
            return false; // use " true " as an identifier, don't go next turn 1
        }
        if (counter === 9) {
            swal({
                title: "Oooooops!",
                text: "It is a tie ! Try again !",
                imageUrl: "images/bow_tie.jpg"
            });
            initialize();
            return true; // use " true " as an identifier, dont go next turn 1
        } else {
            return false; // use " false " as an identifier, turn = next turn
        }

    };


    //this function allows each player to make moves alternatively,record the moves into two arrays for playerOne and PlayerTwo.  preventing clicking on already taken spots
    $('.box').on('click', function() {
        counter++;
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
            swal("Pick another spot!", "this one is taken");
        } else {
            $(box).css({
                    "background-image": bgImage
                }) //do something here to make image representation of that player  appear in the box

            var ID = $(box).attr('id'); //record this move by grabing the id of that cell
            playerMoves.push(ID); //creating a collection of player's moves
            console.log(playerMoves)

            var ended = getWinner(player);
            if (!ended) {
                turn = nextTurn;
            }
        }
    }


    // if one of the players win, start a new game
    $('#new-game').on('click', function() {
        console.log('start new game ')
        initialize();
    })



});
