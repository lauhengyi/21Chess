import { validMoves } from "./getChessMoves.js";
import evaluateBoard from "./evalutateBoard.js";
import getPiece from "../primaryFunctions/getPiece.js";
import executeMove from "./functions/executeMove.js";
import var0Layout from "../../screens/variations/boardLayouts/var0Layout.js";
import { chessMovesReducer } from "./useChessMove.js";

function getBestMove(gameDetails, depth) {
  const currentDetails = gameDetails;
  const board = currentDetails.boardLayout;

  let bestEvaluation = currentDetails.currentSide ? -Infinity : Infinity;
  let bestMove = [1, 1];
  let castling = false;
  for (let piece of board) {
    if (piece.side === currentDetails.currentSide) {
      let moves = validMoves(piece, board, currentDetails.lastMoved);
      if (moves[0]) {
        //Normal moves
        for (let move of moves[0]) {
          let newDetails = chessMovesReducer(currentDetails, {
            type: "makeTurn",
            move: move,
            castling: false,
          });
          //Check Promotion
          if (newDetails.promotion) {
            newDetails = chessMovesReducer(currentDetails, {
              type: "promotion",
              move: [newDetails.promotion, "q"],
            });
            move = null;
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

  return [bestMove, castling];
}

function getBestEvaluation(gameDetails, currentBest, oldDetails, move, depth) {
  const currentDetails = gameDetails;
  const board = gameDetails.boardLayout;

  //Add end point
  if (depth === 0) {
    return evaluateBoard(currentDetails, oldDetails, move);
  }
  let bestEvaluation = currentDetails.currentSide ? -Infinity : Infinity;

  for (let piece of board) {
    if (piece.side === currentDetails.currentSide) {
      let moves = validMoves(piece, board, currentDetails.lastMoved);
      if (moves[0]) {
        //Normal moves
        for (let move of moves[0]) {
          let newDetails = chessMovesReducer(currentDetails, {
            type: "makeTurn",
            move: move,
            castling: false,
          });
          //Check Promotion
          if (newDetails.promotion) {
            newDetails = chessMovesReducer(currentDetails, {
              type: "promotion",
              move: [newDetails.promotion, "q"],
            });
            move = null;
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

  return bestEvaluation;
}

function makeMove(gameDetails, move, castling) {
  let newDetails = {};
  let pieceID;
  let movedTo;
  if (castling) {
    pieceID = move[0][0];
    movedTo = move[0][1];
  } else {
    pieceID = move[0];
    movedTo = move[1];
  }
  let movedFrom = getPiece(pieceID, gameDetails.boardLayout).position;
  let newBoard = executeMove(move, gameDetails.boardLayout, castling);
  let newlastMoved = [pieceID, movedFrom, movedTo];
  newDetails.lastMoved = newlastMoved;
  newDetails.boardLayout = newBoard;
  newDetails.currentSide = !gameDetails.currentSide;
  return newDetails;
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

/* console.log(
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

export default getBestMove;
