import clone from "just-clone";
import getPiece from "../../primaryFunctions/getPiece";
import checkBackStab from "./checkBackStab";

// returns a board with the move made:
// move = [eaterId, position, eatenId]
function V19MovePiece(move, board) {
  // Create version of board with theoretically moved piece
  // Copy new board
  let newBoard = clone(board);
  let piece;
  let id = move[0];
  for (let i = 0; i < newBoard.length; i++) {
    if (newBoard[i].id === id) {
      piece = newBoard[i];
      break;
    }
  }
  piece.moved = true;
  // Can eat
  if (move.length > 2) {
    let eatenPiece = getPiece(move[2], newBoard);
    if (checkBackStab(piece.side, piece.position, eatenPiece.position)) {
      eatenPiece.health -= 2;
    } else {
      eatenPiece.health -= 1;
    }
    if (eatenPiece.health < 1) {
      newBoard = newBoard.filter((piece) => piece.id != move[2]);
    } else {
      return newBoard;
    }
  }
  piece.position = move[1];

  return newBoard;
}

export default V19MovePiece;
