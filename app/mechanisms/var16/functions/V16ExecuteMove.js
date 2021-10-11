import V16MovePiece from "./V16MovePiece.js";

// function will execute move on board, if castling is true then the move is a castle
// A normal move will have a list of two values, [id, position]
function V16ExecuteMove(move, board, castling) {
  if (castling) {
    // move king then rook
    let newBoard = V16MovePiece(move[0], board);
    return V16MovePiece(move[1], newBoard);
  } else {
    return V16MovePiece(move, board);
  }
}

export default V16ExecuteMove;
