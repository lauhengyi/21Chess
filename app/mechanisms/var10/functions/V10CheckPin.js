import getPiece from "../../primaryFunctions/getPiece.js";
import V10MovePiece from "./V10MovePiece.js";
import checkCheck from "../../var0/functions/checkCheck.js";
import getOccupiedMatrix from "../../primaryFunctions/getOccupiedMatrix.js";

//returns whether pieces will be pinned when moved
function V10CheckPin(move, board) {
  const newBoard = V10MovePiece(move, board);
  const newOccupiedMatrix = getOccupiedMatrix(newBoard);
  // move is pinned if new board is checked
  return checkCheck(newBoard, newOccupiedMatrix, getPiece(move[0], board).side);
}

export default V10CheckPin;
