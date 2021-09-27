import getPiece from "../../primaryFunctions/getPiece.js";
import clone from "just-clone";

// returns a board with the move made:
// move = [eaterId, position, eatenId]
function movePiece(move, board) {
  // Create version of board with theoretically moved piece
  // Copy new board
  let newBoard = clone(board);
  let id = move[0];
  for (let i = 0; i < newBoard.length; i++) {
    if (newBoard[i].id === id) {
      newBoard[i].position = move[1];
      newBoard[i].moved = true;
    }
  }
  // Can eat
  if (move.length > 2) {
    return newBoard.filter((piece) => piece.id != move[2]);
  }

  return newBoard;
}

export default movePiece;
