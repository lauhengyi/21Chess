import getPiece from "../../primaryFunctions/getPiece.js";
import movePiece from "../../var0/functions/movePiece.js";
import V21CheckCheck from "./V21CheckCheck.js";
import getOccupiedMatrix from "../../primaryFunctions/getOccupiedMatrix.js";

//returns whether pieces will be pinned when moved
function V21CheckPin(move, board) {
  const newBoard = movePiece(move, board);
  const newOccupiedMatrix = getOccupiedMatrix(newBoard);
  // move is pinned if new board is checked
  return V21CheckCheck(
    newBoard,
    newOccupiedMatrix,
    getPiece(move[0], board).side
  );
}

export default V21CheckPin;
