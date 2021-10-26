import V19MovePiece from "./V19MovePiece.js";

// function will execute move on board, if castling is true then the move is a castle
// A normal move will have a list of two values, [id, position]
function V19ExecuteMove(move, board, castling) {
  if (castling) {
    // move king then rook
    let newBoard = V19MovePiece(move[0], board);
    return V19MovePiece(move[1], newBoard);
  } else {
    return V19MovePiece(move, board);
  }
}

export default V19ExecuteMove;
