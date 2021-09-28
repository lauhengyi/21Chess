import clone from "just-clone";

// returns a tuple of [board1, board2] with the move made:
// move = [eaterId, position, eatenId]
function V6MovePiece(move, board1, board2) {
  // Create version of board with theoretically moved piece
  // Copy new board
  let newBoard1 = clone(board1);
  let newBoard2 = clone(board2);

  let id = move[0];
  for (let i = 0; i < newBoard1.length; i++) {
    if (newBoard1[i].id === id) {
      newBoard1[i].position = move[1];
      newBoard1[i].moved = true;
    }
  }
  // Can eat
  if (move.length > 2) {
    newBoard1 = newBoard1.filter((piece) => piece.id != move[2]);
    //Remove linked piece in board 2
    newBoard2 = newBoard2.filter((piece) => piece.id != move[2]);
  }

  return [newBoard1, newBoard2];
}

export default V6MovePiece;
