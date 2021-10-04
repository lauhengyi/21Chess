import V11MovePiece from "./V11MovePiece.js";

// function will execute move on board, if castling is true then the move is a castle
// A normal move will have a list of two values, [id, position]
function V11ExecuteMove(move, board, castling) {
  if (castling) {
    // move king then rook
    let newBoard = V11MovePiece(move[0], board);
    return V11MovePiece(move[1], newBoard);
  } else {
    return V11MovePiece(move, board);
  }
}

export default V11ExecuteMove;
