import getPiece from "../../primaryFunctions/getPiece.js";
import movePiece from "../../var0/functions/movePiece.js";
import V20CheckCheck from "./V20CheckCheck.js";
import getOccupiedMatrix from "../../primaryFunctions/getOccupiedMatrix.js";

//returns whether pieces will be pinned when moved
function V20CheckPin(move, board) {
  const newBoard = movePiece(move, board);
  const newOccupiedMatrix = getOccupiedMatrix(newBoard);
  // move is pinned if new board is checked
  return V20CheckCheck(
    newBoard,
    newOccupiedMatrix,
    getPiece(move[0], board).side
  );
}

export default V20CheckPin;
