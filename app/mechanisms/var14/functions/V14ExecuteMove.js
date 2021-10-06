import V14MovePiece from "./V14MovePiece";

// function will execute move on board, if castling is true then the move is a castle
// A normal move will have a list of two values, [id, position]
function V14ExecuteMove(move, board, castling) {
  if (castling) {
    // move king then rook
    let newBoard = V14MovePiece(move[0], board);
    return V14MovePiece(move[1], newBoard);
  } else {
    return V14MovePiece(move, board);
  }
}

export default V14ExecuteMove;
