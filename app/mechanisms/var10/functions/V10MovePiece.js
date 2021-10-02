import clone from "just-clone";
import getPiece from "../../primaryFunctions/getPiece";

// returns a board with the move made:
// move = [eaterId, position, eatenId]
function V10MovePiece(move, board) {
  // Create version of board with theoretically moved piece
  // Copy new board
  let newBoard = clone(board);

  let id = move[0];
  let index;
  let pieceType;
  for (let i = 0; i < newBoard.length; i++) {
    if (newBoard[i].id === id) {
      newBoard[i].position = move[1];
      newBoard[i].moved = true;
      pieceType = newBoard[i].type;

      index = i;
      break;
    }
  }
  // Can eat
  if (move.length > 2) {
    //Change piece type after eating
    if (pieceType !== "k") {
      newBoard[index].type = getPiece(move[2], board).type;
    }
    return newBoard.filter((piece) => piece.id != move[2]);
  }

  return newBoard;
}

export default V10MovePiece;
