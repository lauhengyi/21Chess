import { validMoves } from "./getChessMoves.js";
import var0Layout from "../../screens/variations/boardLayouts/var0Layout.js";
import { chessMovesReducer } from "./useChessMove.js";
import "react-native-console-time-polyfill";
import getOccupiedMatrix from "../primaryFunctions/getOccupiedMatrix.js";
import evaluateBoardV2 from "./evalutateBoardV2.js";

function getEnemyBestMove(gameDetails, depth) {
  const currentDetails = gameDetails;
  const board = currentDetails.boardLayout;
  const occupiedMatrix = getOccupiedMatrix(board);

  let bestEvaluation = currentDetails.currentSide ? -Infinity : Infinity;
  let bestMove = [-1, -1];
  let castling = false;
  let promotion = false;
  for (let piece of board) {
    if (piece.side === currentDetails.currentSide) {
      let moves = validMoves(
        piece,
        board,
        occupiedMatrix,
        currentDetails.lastMoved
      );
      if (moves[0]) {
        //Normal moves
        for (let move of moves[0]) {
          let newDetails = chessMovesReducer(currentDetails, {
            type: "makeTurn",
            move: move,
            castling: false,
          });
          //Check Promotion
          let promoted = false;
          if (newDetails.promotion) {
            newDetails = chessMovesReducer(newDetails, {
              type: "promotion",
              move: [newDetails.promotion, "q"],
            });
            promoted = true;
          }
          const evaluation = getBestEvaluation(
            newDetails,
            bestEvaluation,
            currentDetails,
            move,
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
            promotion = promoted;
          }
        }
      }
      if (moves[1]) {
        //castling moves
        for (let move of moves[1]) {
          let newDetails = chessMovesReducer(currentDetails, {
            type: "makeTurn",
            move: move,
            castling: true,
          });
          const evaluation = getBestEvaluation(
            newDetails,
            bestEvaluation,
            currentDetails,
            null,
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

  return [bestMove, castling, promotion];
}

function getBestEvaluation(gameDetails, currentBest, oldDetails, move, depth) {
  let ended = true;
  const currentDetails = gameDetails;
  const board = currentDetails.boardLayout;
  const occupiedMatrix = getOccupiedMatrix(board);

  //Add end point
  if (depth === 0) {
    return evaluateBoardV2(currentDetails, oldDetails, move);
  }
  let bestEvaluation = currentDetails.currentSide ? -Infinity : Infinity;

  for (let piece of board) {
    if (piece.side === currentDetails.currentSide) {
      let moves = validMoves(
        piece,
        board,
        occupiedMatrix,
        currentDetails.lastMoved
      );
      if (moves[0]) {
        //Normal moves
        ended = false;
        for (let move of moves[0]) {
          let newDetails = chessMovesReducer(currentDetails, {
            type: "makeTurn",
            move: move,
            castling: false,
          });
          //Check Promotion
          if (newDetails.promotion) {
            newDetails = chessMovesReducer(newDetails, {
              type: "promotion",
              move: [newDetails.promotion, "q"],
            });
          }
          const evaluation = getBestEvaluation(
            newDetails,
            bestEvaluation,
            currentDetails,
            move,
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
        ended = false;
        //castling moves
        for (let move of moves[1]) {
          let newDetails = chessMovesReducer(currentDetails, {
            type: "makeTurn",
            move: move,
            castling: true,
          });
          const evaluation = getBestEvaluation(
            newDetails,
            bestEvaluation,
            currentDetails,
            null,
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
  if (ended) {
    return evaluateBoardV2(currentDetails, oldDetails, move);
  }

  return bestEvaluation;
}

function isBestEvaluation(side, evaluation, bestEvaluation) {
  if (side === true) {
    //Maximise evaluation
    if (evaluation >= bestEvaluation) {
      return true;
    }
  } else {
    //Minimise evaluation
    if (evaluation <= bestEvaluation) {
      return true;
    }
  }

  return false;
}

/* console.log'(
  getBestMove(
    {
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
    },
    3
  )
); */

export default getEnemyBestMove;
