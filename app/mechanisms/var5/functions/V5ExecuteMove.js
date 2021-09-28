import V5MovePiece from "./V5MovePiece";

// function will execute move on board, if castling is true then the move is a castle
// A normal move will have a list of two values, [id, position]
function V5ExecuteMove(move, board, castling) {
  if (castling) {
    // move king then rook
    let newBoard = V5MovePiece(move[0], board);
    return V5MovePiece(move[1], newBoard);
  } else {
    return V5MovePiece(move, board);
  }
}

export default V5ExecuteMove;
