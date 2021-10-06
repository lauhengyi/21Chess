import clone from "just-clone";
import addStunned from "./addStunned";
import clearStunned from "./clearStunned";

// returns a board with the move made:
// move = [eaterId, position, eatenId]
function V13MovePiece(move, board) {
  // Create version of board with theoretically moved piece
  // Copy new board
  let newBoard = clone(board);
  let id = move[0];
  let side;
  for (let i = 0; i < newBoard.length; i++) {
    if (newBoard[i].id === id) {
      newBoard[i].position = move[1];
      newBoard[i].moved = true;
      side = newBoard[i].side;
      break;
    }
  }
  // Can eat
  if (move.length > 2) {
    addStunned(move[1], !side, newBoard);
    newBoard = newBoard.filter((piece) => piece.id != move[2]);
  }
  clearStunned(side, newBoard);

  return newBoard;
}

export default V13MovePiece;
