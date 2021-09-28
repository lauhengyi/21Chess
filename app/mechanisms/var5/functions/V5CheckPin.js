import getPiece from "../../primaryFunctions/getPiece.js";
import V5MovePiece from "./V5MovePiece.js";
import V5CheckCheck from "./V5CheckCheck";
import getOccupiedMatrix from "../../primaryFunctions/getOccupiedMatrix.js";

//returns whether pieces will be pinned when moved
function V5CheckPin(move, board) {
  const newBoard = V5MovePiece(move, board);
  const newOccupiedMatrix = getOccupiedMatrix(newBoard);
  // move is pinned if new board is checked
  return V5CheckCheck(
    newBoard,
    newOccupiedMatrix,
    getPiece(move[0], board).side
  );
}

export default V5CheckPin;
