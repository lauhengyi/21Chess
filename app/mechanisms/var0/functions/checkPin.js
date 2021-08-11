import getPiece from "../../primaryFunctions/getPiece.js";
import movePiece from "./movePiece.js";
import checkCheck from "./checkCheck.js";

//returns whether pieces will be pinned when moved
function checkPin(move, board) {
  // move is pinned if new board is checked
  return checkCheck(movePiece(move, board), getPiece(move[0], board).side);
}

export default checkPin;
