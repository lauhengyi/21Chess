import V10MovePiece from "./V10MovePiece";

// function will execute move on board, if castling is true then the move is a castle
// A normal move will have a list of two values, [id, position]
function V10ExecuteMove(move, board, castling) {
  if (castling) {
    // move king then rook
    let newBoard = V10MovePiece(move[0], board);
    return V10MovePiece(move[1], newBoard);
  } else {
    return V10MovePiece(move, board);
  }
}

export default V10ExecuteMove;
