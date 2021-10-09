import clone from "just-clone";
import getOccupiedMatrix from "../../primaryFunctions/getOccupiedMatrix";
import accountChanges from "./accountChanges";

// returns a board with the move made:
// move = [eaterId, position, eatenId]
function V12MovePiece(move, board) {
  // Create version of board with theoretically moved piece
  // Copy new board
  let newBoard = clone(board);
  // Can eat
  if (move.length > 2) {
    newBoard = newBoard.filter((piece) => piece.id != move[2]);
  }

  let id = move[0];
  let pieceIndex;
  for (let i = 0; i < newBoard.length; i++) {
    if (newBoard[i].id === id) {
      newBoard[i].position = move[1];
      newBoard[i].moved = true;
      pieceIndex = i;
      break;
    }
  }

  //Scan for changes in side
  let occupiedMatrix = getOccupiedMatrix(newBoard);
  accountChanges(pieceIndex, newBoard, occupiedMatrix);

  return newBoard;
}

export default V12MovePiece;
