import V4MovePiece from "./V4MovePiece";

// function will execute move on board, if castling is true then the move is a castle
// A normal move will have a list of two values, [id, position]
function V4ExecuteMove(move, board, castling) {
  if (castling) {
    // move king then rook
    let newBoard = V4MovePiece(move[0], board);
    return V4MovePiece(move[1], newBoard);
  } else {
    return V4MovePiece(move, board);
  }
}

export default V4ExecuteMove;
