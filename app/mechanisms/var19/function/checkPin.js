import getPiece from "../../primaryFunctions/getPiece.js";
import movePiece from "./movePiece.js";
import checkCheck from "./checkCheck.js";
import getOccupiedMatrix from "../../primaryFunctions/getOccupiedMatrix.js";

//returns whether pieces will be pinned when moved
function checkPin(move, board) {
  const newBoard = movePiece(move, board);
  const newOccupiedMatrix = getOccupiedMatrix(newBoard);
  // move is pinned if new board is checked
  return checkCheck(newBoard, newOccupiedMatrix, getPiece(move[0], board).side);
}

export default checkPin;
