$(document).ready(function() {

  var board, turnCount, playerTurn;

  init();

  $("a").on("click", setSquare);
  $("#play-again").on("click", resetBoard);

  function setSquare(loc) {
    var location = $(this).parent().attr("id");
    var row = Number(location.charAt("1")) - 1;
    var col = Number(location.charAt("3")) - 1;

    if (board[row][col] === "") {
      board[row][col] = playerTurn;
      updateSquare(this, playerTurn);
      ++turnCount;

      if (isWinner()) {
        updateStatus("Player " + playerTurn + " Wins!!!");
        $("a").unbind("click");
        $("#play-again").fadeIn(2000);
        $("a:contains(" + playerTurn + ")").css("background", "green");
      } else if (turnCount === 9) {
        updateStatus("Draw!!!");
        $("a").unbind("click");
      } else {
        playerTurn = (playerTurn === "X") ? "O" : "X";
        updateStatus("Player Turn: " + playerTurn);
      }
    }
  }

  function isWinner() {
    // concatenate 3 XXX's or OOO's together
    switch (playerTurn + playerTurn + playerTurn) {
      // concatenate value of squares together potentionally resulting in XXX or OOO
      case (board[0][0] + board[0][1] + board[0][2]): // first row
      case (board[1][0] + board[1][1] + board[1][2]): // second row
      case (board[2][0] + board[2][1] + board[2][2]): // third row
      case (board[0][0] + board[1][0] + board[2][0]): // first column
      case (board[0][1] + board[1][1] + board[2][1]): // second column
      case (board[0][2] + board[1][2] + board[2][2]): // third column
      case (board[0][0] + board[1][1] + board[2][2]): // diagonal 1
      case (board[0][2] + board[1][1] + board[2][0]): // diagonal 2
        return true;
        break;
      default:
        return false;
    }
  }

  function updateStatus(message) {
    $('.status').text(message);
  }

  function updateSquare(id, player) {
    $(id).hide().text(player).fadeIn(2000);
  }

  function resetBoard() {
    init();
    $("a").removeAttr( 'style' );
    $("#play-again").fadeOut(2000);
    $("a").text("");
    $("a").on("click", setSquare);
  }

  function init() {
    board = [["", "", ""],
             ["", "", ""],
             ["", "", ""]];

    playerTurn = "X";
    turnCount = 0;
    updateStatus("Player Turn: " + playerTurn);
  }
});
