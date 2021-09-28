import V6MovePiece from "./V6MovePiece";

// function will execute move on board, if castling is true then the move is a castle
// A normal move will have a list of two values, [id, position]
function V6ExecuteMove(move, board1, board2, castling) {
  if (castling) {
    // move king then rook
    let [newBoard1, newBoard2] = V6MovePiece(move[0], board1, board2);
    return V6MovePiece(move[1], newBoard1, newBoard2);
  } else {
    return V6MovePiece(move, board1, board2);
  }
}

export default V6ExecuteMove;
