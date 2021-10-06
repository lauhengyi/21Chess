import V13MovePiece from "./V13MovePiece";

// function will execute move on board, if castling is true then the move is a castle
// A normal move will have a list of two values, [id, position]
function V13ExecuteMove(move, board, castling) {
  if (castling) {
    // move king then rook
    let newBoard = V13MovePiece(move[0], board);
    return V13MovePiece(move[1], newBoard);
  } else {
    return V13MovePiece(move, board);
  }
}

export default V13ExecuteMove;
