import V9CreatePieceDataCalculator from "./V9CreatePieceDataCalculator";

// Check whether a board is checked
function V9CheckCheck(board, occupiedMatrix, side) {
  //Get king's position
  let kingPos = null;
  for (let piece of board) {
    if (piece.type == "k" && piece.side == side) {
      kingPos = piece.position;
    }
  }
  if (kingPos === null) {
    return true;
  }
  // Compile list of positions where enemies attacks
  for (let piece of board) {
    // Isolate enemy pieces
    if (piece.side != side) {
      let pieceData = V9CreatePieceDataCalculator(piece, occupiedMatrix, board);
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

export default V9CheckCheck;
