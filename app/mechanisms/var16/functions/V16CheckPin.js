import getPiece from "../../primaryFunctions/getPiece.js";
import V16MovePiece from "./V16MovePiece.js";
import V16CheckCheck from "./V16CheckCheck.js";
import getOccupiedMatrix from "../../primaryFunctions/getOccupiedMatrix.js";

//returns whether pieces will be pinned when moved
function V16CheckPin(move, board) {
  const newBoard = V16MovePiece(move, board);
  const newOccupiedMatrix = getOccupiedMatrix(newBoard);
  // move is pinned if new board is checked
  return V16CheckCheck(
    newBoard,
    newOccupiedMatrix,
    getPiece(move[0], board).side
  );
}

export default V16CheckPin;
