import executeMove from "./functions/executeMove.js";
import getPiece from "../primaryFunctions/getPiece.js";
import { validMoves } from "./getChessMoves.js";
import layout from "../../screens/variations/boardLayouts/var0Layout.js";

function countMoves(board, side, lastMoved, depth) {
  let count = 0;
  if (depth === 1) {
    return countOneLayer(board, side, lastMoved);
  }
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

function countOneLayer(board, side, lastMoved) {
  let count = 0;
  for (let piece of board) {
    if (piece.side === side) {
      let moves = validMoves(piece.id, board, lastMoved);
      if (moves[0]) {
        count += moves[0].length;
      }
      if (moves[1]) {
        count += moves[1].length;
      }
    }
  }
  return count;
}

console.log(countMoves(layout, true, [null, null], 6));

export default countMoves;
