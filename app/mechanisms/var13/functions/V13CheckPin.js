import getPiece from "../../primaryFunctions/getPiece.js";
import V13MovePiece from "./V13MovePiece.js";
import V13CheckCheck from "./V13CheckCheck";
import getOccupiedMatrix from "../../primaryFunctions/getOccupiedMatrix.js";

//returns whether pieces will be pinned when moved
function V13CheckPin(move, board) {
  const newBoard = V13MovePiece(move, board);
  const newOccupiedMatrix = getOccupiedMatrix(newBoard);
  // move is pinned if new board is checked
  return V13CheckCheck(
    newBoard,
    newOccupiedMatrix,
    getPiece(move[0], board).side
  );
}

export default V13CheckPin;
