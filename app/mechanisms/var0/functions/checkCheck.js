import createPieceDataCalculator from "../normalChessMovements.js";

// Check whether a board is checked
function checkCheck(board, side) {
  let positions = [];
  // Compile list of positions where enemies attacks
  for (let piece of board) {
    // Isolate enemy pieces
    if (piece.side != side) {
      let pieceData = createPieceDataCalculator(piece, board);
      positions = positions.concat(pieceData.attacks);
    }
  }
  // Find king's position
  let kingPos = 0;
  for (let piece of board) {
    if (piece.type == "k" && piece.side == side) {
      kingPos = piece.position;
    }
  }

  // Make sure the king's position is not under attack
  for (let position of positions) {
    if (kingPos === position) {
      return true;
    }
  }
  return false;
}

export default checkCheck;
