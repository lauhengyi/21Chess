import clone from "just-clone";

// returns a board with the move made:
// move = [eaterId, position, eatenId]
function V16MovePiece(move, board) {
  // Create version of board with theoretically moved piece
  // Copy new board
  let id = move[0];
  for (let i = 0; i < board.length; i++) {
    if (board[i].id === id) {
      if (board[i].perk !== "c" && board[i].perk !== "d") {
        return defaultMove(move, i, board);
      }
    }
  }
}

function defaultMove(move, index, board) {
  let newBoard = clone(board);
  newBoard[index].position = move[1];
  newBoard[index].moved = true;

  // Can eat
  if (move.length > 2) {
    newBoard[index].level += 1;
    newBoard = newBoard.filter((piece) => piece.id != move[2]);
  }
  return newBoard;
}

export default V16MovePiece;
