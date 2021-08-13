import { executeMove, getPiece, validMoves } from "./normalChess.js";
import layout from "../../screens/variations/boardLayouts/var0Layout";

function countMoves(board, side, lastMoved, depth) {
  //Add end case
  if (depth === 0) {
    return 1;
  }

  let count = 0;
  for (let piece of board) {
    if (piece.side === side) {
      let moves = validMoves(piece.id, board, lastMoved);
      if (moves[0]) {
        for (let move of moves[0]) {
          let movedFrom = getPiece(move[0], board).position;
          let newBoard = executeMove(move, board, false);
          let newlastMoved = [move[0], movedFrom, move[1]];
          count += countMoves(newBoard, !side, newlastMoved, depth - 1);
        }
      }
      if (moves[1]) {
        for (let move of moves[1]) {
          let movedFrom = getPiece(move[0][0], board).position;
          let newBoard = executeMove(move, board, true);
          let newlastMoved = [move[0][0], movedFrom, move[0][1]];
          count += countMoves(newBoard, !side, newlastMoved, depth - 1);
        }
      }
    }
  }
  return count;
}

export default countMoves;
