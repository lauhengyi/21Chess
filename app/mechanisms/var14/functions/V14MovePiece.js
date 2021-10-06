import clone from "just-clone";

// returns a board with the move made:
// move = [eaterId, position, eatenId]
function V14MovePiece(move, board) {
  // Create version of board with theoretically moved piece
  // Copy new board
  let newBoard = clone(board);
  let id = move[0];
  let index;
  for (let i = 0; i < newBoard.length; i++) {
    if (newBoard[i].id === id) {
      newBoard[i].position = move[1];
      newBoard[i].moved = true;
      index = i;
      break;
    }
  }
  // Can eat
  if (move.length > 2) {
    //Check index
    let pieceIndex;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i].id === move[2]) {
        pieceIndex = i;
        break;
      }
    }
    //Check merge
    if (newBoard[pieceIndex].side === newBoard[index].side) {
      newBoard[index].stacked = newBoard[pieceIndex].type;
    }
    //Remove other piece
    newBoard.splice(pieceIndex, 1);
  }

  return newBoard;
}

export default V14MovePiece;
