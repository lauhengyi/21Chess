import V21CreatePieceDataCalculator from "../V21CreatePieceDataCalculator.js";

// Check whether a board is checked
function V21CheckCheck(gameDetails, occupiedMatrix, side) {
  //Get king's position
  let kingPos = null;
  for (let piece of gameDetails.boardLayout) {
    if (piece.type == "k" && piece.side == side) {
      kingPos = piece.position;
    }
  }
  if (kingPos === null) {
    return true;
  }
  // Compile list of positions where enemies attacks
  for (let piece of gameDetails.boardLayout) {
    // Isolate enemy pieces
    if (piece.side != side) {
      let pieceData = V21CreatePieceDataCalculator(
        piece,
        occupiedMatrix,
        gameDetails.portals
      );
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

export default V21CheckCheck;
