import movePiece from "../../var0/functions/movePiece.js";
import checkCheck from "../../var0/functions/checkCheck";
import getOccupiedMatrix from "../../primaryFunctions/getOccupiedMatrix.js";

//returns whether pieces will be pinned when moved
function V20CheckPin(move, board, side) {
  const newBoard = movePiece(move, board);
  const newOccupiedMatrix = getOccupiedMatrix(newBoard);
  // move is pinned if new board is checked
  return checkCheck(newBoard, newOccupiedMatrix, side);
}

export default V20CheckPin;
