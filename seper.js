var playerMove = function (player) {
  if (player === 'playerOne') {
    var playerMove = playerOneMove;
    var bgImage = "url('images/redxsmall.png')";
    var nextTurn = 'playerTwo';
  } else {
    var playerMove = playerTwoMove;
    var bgImage = "url('images/circle-small.png')";
    var nextTurn = 'playerOne';
  }
  if ($(this).css('background-image') !== "none") {
      alert('pick another box');
  } else {
      $(this).css({
              "background-image": bgImage
          }) //do something here to make image representation of that player  appear in the box

      var ID1 = $(this).attr('id'); //record this move by grabing the id of that cell
      ID1 = ID1.toString(); //return the ID of that cell as a string
      playerMove.push(ID1); //creating a collection of player's moves
      playerMove = playerMove.sort(); //sort this array to make it in numerial order
      console.log(playerMove)

         getWinner();

      turn = nextTurn;
  }
}
