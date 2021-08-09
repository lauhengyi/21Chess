import getPiece from "../../primaryFunctions/getPiece";
import movePiece from "./movePiece";
import checkCheck from "./checkCheck";

//returns whether pieces will be pinned when moved
function checkPin(move, board) {
  // move is pinned if new board is checked
  return checkCheck(movePiece(move, board), getPiece(move[0], board).side);
}

export default checkPin;
