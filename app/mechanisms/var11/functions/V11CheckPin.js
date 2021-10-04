import getPiece from "../../primaryFunctions/getPiece.js";
import V11MovePiece from "./V11MovePiece.js";
import V11CheckCheck from "./V11CheckCheck.js";
import getOccupiedMatrix from "../../primaryFunctions/getOccupiedMatrix.js";

//returns whether pieces will be pinned when moved
function V11CheckPin(move, board) {
  const newBoard = V11MovePiece(move, board);
  const newOccupiedMatrix = getOccupiedMatrix(newBoard);
  // move is pinned if new board is checked
  return V11CheckCheck(
    newBoard,
    newOccupiedMatrix,
    getPiece(move[0], board).side
  );
}

export default V11CheckPin;
