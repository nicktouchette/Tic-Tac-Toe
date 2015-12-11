$(document).ready(function() {

  var board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

  var playerTurn = "X";
  updateBoard("#status", "Player Turn: " + playerTurn);

  $("a").on("click", setSquare);

  function setSquare(loc) {
    var location = $(this).parent().attr("id");
    var row = Number(location.charAt("1")) - 1;
    var col = Number(location.charAt("3")) - 1;
    if (board[row][col] === "") {
      board[row][col] = playerTurn;
      updateBoard(this, playerTurn);
      if (isWinner()) {
        updateBoard("#status", "Player " + playerTurn + " Wins!!!");
        $("a").unbind("click");
      } else {
        playerTurn = (playerTurn === "X") ? "O" : "X";
        updateBoard("#status", "Player Turn: " + playerTurn);
      }
    }
  }

  function isWinner() {
    switch (playerTurn + playerTurn + playerTurn) {
      case (board[0][0] + board[0][1] + board[0][2]): //first row
      case (board[1][0] + board[1][1] + board[1][2]): // second row
      case (board[2][0] + board[2][1] + board[2][2]): // third row

      case (board[0][0] + board[1][0] + board[2][0]): //first column
      case (board[0][1] + board[1][1] + board[2][1]): //second column
      case (board[0][2] + board[1][2] + board[2][2]): // third column

      case (board[0][0] + board[1][1] + board[2][2]): //diagonal 1
      case (board[0][2] + board[1][1] + board[2][0]): //diagonal 2
        return true;
        break;
      default:
        return false;
    }
  }

  function updateBoard(id, message) {
    $(id).text(message);
  }
});
