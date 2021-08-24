import { chessMovesReducer } from "./useChessMove.js";
import { validMoves } from "./getChessMoves.js";
import evaluateBoard from "./evalutateBoard.js";
import var0Layout from "../../screens/variations/boardLayouts/var0Layout.js";

function getBestMove(gameDetails, depth) {
  const currentDetails = gameDetails;
  const board = gameDetails.boardLayout;

  let bestEvaluation = currentDetails.currentSide ? -Infinity : Infinity;
  let bestMove = [1, 1];
  let castling = false;
  for (let piece of board) {
    if (piece.side === currentDetails.currentSide) {
      let moves = validMoves(piece.id, board, currentDetails.lastMoved);
      if (moves[0]) {
        //Normal moves
        for (let move of moves[0]) {
          const newDetails = chessMovesReducer(currentDetails, {
            type: "makeTurn",
            move: move,
            castling: false,
          });
          const evaluation = getBestEvaluation(
            newDetails,
            bestEvaluation,
            depth - 1
          );
          if (
            isBestEvaluation(
              currentDetails.currentSide,
              evaluation,
              bestEvaluation
            )
          ) {
            bestEvaluation = evaluation;
            bestMove = move;
            castling = false;
          }
        }
      }
      if (moves[1]) {
        //castling moves
        for (let move of moves[1]) {
          const newDetails = chessMovesReducer(currentDetails, {
            type: "makeTurn",
            move: move,
            castling: true,
          });
          const evaluation = getBestEvaluation(
            newDetails,
            bestEvaluation,
            depth - 1
          );
          if (
            isBestEvaluation(
              currentDetails.currentSide,
              evaluation,
              bestEvaluation
            )
          ) {
            bestEvaluation = evaluation;
            bestMove = move;
            castling = true;
          }
        }
      }
    }
  }

  return [bestMove, castling];
}

function getBestEvaluation(gameDetails, currentBest, depth) {
  const currentDetails = gameDetails;
  const board = gameDetails.boardLayout;

  //Add end point
  if (depth === 0) {
    return evaluateBoard(currentDetails);
  }
  let bestEvaluation = currentDetails.currentSide ? -Infinity : Infinity;

  for (let piece of board) {
    if (piece.side === currentDetails.currentSide) {
      let moves = validMoves(piece.id, board, currentDetails.lastMoved);
      if (moves[0]) {
        //Normal moves
        for (let move of moves[0]) {
          const newDetails = chessMovesReducer(currentDetails, {
            type: "makeTurn",
            move: move,
            castling: false,
          });
          const evaluation = getBestEvaluation(
            newDetails,
            bestEvaluation,
            depth - 1
          );
          if (
            isBestEvaluation(
              currentDetails.currentSide,
              evaluation,
              bestEvaluation
            )
          ) {
            bestEvaluation = evaluation;
            //AlphaBetaPruning
            if (
              isBestEvaluation(
                currentDetails.currentSide,
                bestEvaluation,
                currentBest
              )
            ) {
              return bestEvaluation;
            }
          }
        }
      }
      if (moves[1]) {
        //castling moves
        for (let move of moves[1]) {
          const newDetails = chessMovesReducer(currentDetails, {
            type: "makeTurn",
            move: move,
            castling: true,
          });
          const evaluation = getBestEvaluation(
            newDetails,
            bestEvaluation,
            depth - 1
          );
          if (
            isBestEvaluation(
              currentDetails.currentSide,
              evaluation,
              bestEvaluation
            )
          ) {
            bestEvaluation = evaluation;
            //AlphaBetaPruning
            if (
              isBestEvaluation(
                currentDetails.currentSide,
                bestEvaluation,
                currentBest
              )
            ) {
              return bestEvaluation;
            }
          }
        }
      }
    }
  }

  return bestEvaluation;
}

function isBestEvaluation(side, evaluation, bestEvaluation) {
  if (side === true) {
    //Maximise evaluation
    if (evaluation > bestEvaluation) {
      return true;
    }
  } else {
    //Minimise evaluation
    if (evaluation < bestEvaluation) {
      return true;
    }
  }

  return false;
}

const initialDetails = {
  boardLayout: var0Layout,
  moveables: [null, null],
  clickedSquare: null,
  currentSide: true,
  lastMoved: [null, null, null],
  eatenPieces: [],
  checked: 0,
  stalemated: 0,
  checkmated: 0,
  promotion: null,
};

export default getBestMove;