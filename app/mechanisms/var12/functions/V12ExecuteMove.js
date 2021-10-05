import V12MovePiece from "./V12MovePiece";

// function will execute move on board, if castling is true then the move is a castle
// A normal move will have a list of two values, [id, position]
function V12ExecuteMove(move, board, castling) {
  if (castling) {
    // move king then rook
    let newBoard = V12MovePiece(move[0], board);
    return V12MovePiece(move[1], newBoard);
  } else {
    return V12MovePiece(move, board);
  }
}

export default V12ExecuteMove;
