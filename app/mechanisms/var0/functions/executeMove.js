import movePiece from "./movePiece.js";

// function will execute move on board, if castling is true then the move is a castle
// A normal move will have a list of two values, [id, position]
function executeMove(move, board, castling) {
  if (castling) {
    // move king then rook
    let newBoard = movePiece(move[0], board);
    return movePiece(move[1], newBoard);
  } else {
    return movePiece(move, board);
  }
}

export default executeMove;
