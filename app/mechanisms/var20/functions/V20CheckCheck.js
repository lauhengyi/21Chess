import checkCheck from "../checkCheck.js";
import createPieceDataCalculator from "../createPieceDataCalculator.js";

// Check whether a board is checked
function V20CheckCheck(board, occupiedMatrix, side) {
  return (
    checkCheck(board, occupiedMatrix, true) ||
    checkCheck(board, occupiedMatrix, false)
  );
}

export default V20CheckCheck;
