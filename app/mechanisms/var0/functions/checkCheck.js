import createPieceDataCalculator from "../normalChessMovements.js";

// Check whether a board is checked
function checkCheck(board, occupiedMatrix, side) {
  //Get king's position
  let kingPos = 0;
  for (let piece of board) {
    if (piece.type == "k" && piece.side == side) {
      kingPos = piece.position;
    }
  }
  // Compile list of positions where enemies attacks
  for (let piece of board) {
    // Isolate enemy pieces
    if (piece.side != side) {
      let pieceData = createPieceDataCalculator(piece, occupiedMatrix, board);
      for (let attacks of pieceData.attacks) {
        //If attack positions === king's position, return true
        if (attacks[1] === kingPos) {
          return true;
        }
      }
    }
  }
  return false;
}

export default checkCheck;
