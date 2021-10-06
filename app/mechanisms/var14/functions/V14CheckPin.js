import getPiece from "../../primaryFunctions/getPiece.js";
import V14MovePiece from "./V14MovePiece.js";
import V14CheckCheck from "./V14CheckCheck";
import getOccupiedMatrix from "../../primaryFunctions/getOccupiedMatrix.js";

//returns whether pieces will be pinned when moved
function V14CheckPin(move, board) {
  const newBoard = V14MovePiece(move, board);
  const newOccupiedMatrix = getOccupiedMatrix(newBoard);
  // move is pinned if new board is checked
  return V14CheckCheck(
    newBoard,
    newOccupiedMatrix,
    getPiece(move[0], board).side
  );
}

export default V14CheckPin;
