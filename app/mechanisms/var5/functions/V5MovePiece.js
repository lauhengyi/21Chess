import clone from "just-clone";

// returns a board with the move made:
// move = [eaterId, position, eatenId]
function V5MovePiece(move, board) {
  // Create version of board with theoretically moved piece

  // Copy new board
  let newBoard = clone(board);

  let pieceSide;
  let previousPosition;

  //Move piece
  let id = move[0];
  for (let i = 0; i < newBoard.length; i++) {
    if (newBoard[i].id === id) {
      previousPosition = newBoard[i].position;
      newBoard[i].position = move[1];
      newBoard[i].moved = true;
      pieceSide = newBoard[i].side;
    }
  }

  //Remove blank
  newBoard = newBoard.filter(
    (piece) => !(piece.type === null && piece.side === pieceSide)
  );

  //Add blank square
  newBoard.push({
    id: 1000,
    position: previousPosition,
    type: null,
    side: !pieceSide,
    moved: false,
  });
  // Can eat
  if (move.length > 2) {
    return newBoard.filter((piece) => piece.id !== move[2]);
  }

  return newBoard;
}

export default V5MovePiece;
