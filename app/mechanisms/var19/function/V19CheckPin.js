import getPiece from "../../primaryFunctions/getPiece.js";
import V19MovePiece from "./V19MovePiece.js";
import checkCheck from "../../var0/functions/checkCheck.js";
import getOccupiedMatrix from "../../primaryFunctions/getOccupiedMatrix.js";

//returns whether pieces will be pinned when moved
function V19CheckPin(move, board) {
  const newBoard = V19MovePiece(move, board);
  const newOccupiedMatrix = getOccupiedMatrix(newBoard);
  // move is pinned if new board is checked
  return checkCheck(newBoard, newOccupiedMatrix, getPiece(move[0], board).side);
}

export default V19CheckPin;
