import getOccupiedMatrix from "../primaryFunctions/getOccupiedMatrix.js";
import V20EvaluateBoardV1 from "./V20EvaluatateBoardV1.js";
import V20EvaluateBoardV2 from "./V20EvaluatateBoardV2.js";
import clone from "just-clone";

function V20GetBestMove(
  gameDetails,
  getChessMoves,
  chessMovesReducer,
  difficulty
) {
  //Difficulty:
  // 0 == easy, 1 == medium, 2 == hard
  const currentDetails = clone(gameDetails);
  const board = currentDetails.boardLayout;
  const occupiedMatrix = getOccupiedMatrix(board);

  //Create evaluation function and depth depending on difficulty
  const [depth, evaluationFunction] = getParameters(difficulty);

  let bestEvaluation = currentDetails.currentSide ? -Infinity : Infinity;
  let bestMove = [-1, -1];
  let castling = false;
  let promotion = false;
  for (let piece of board) {
    let moves = getChessMoves(piece, currentDetails, occupiedMatrix, "moves");
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
          evaluationFunction,
          getChessMoves,
          chessMovesReducer,
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
          evaluationFunction,
          getChessMoves,
          chessMovesReducer,
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

  return [bestMove, castling, promotion];
}

function getBestEvaluation(
  gameDetails,
  currentBest,
  evaluationFunction,
  getChessMoves,
  chessMovesReducer,
  depth
) {
  let ended = true;
  const currentDetails = clone(gameDetails);
  const board = currentDetails.boardLayout;
  const occupiedMatrix = getOccupiedMatrix(board);

  //Add end point
  if (depth === 0) {
    return evaluationFunction(currentDetails, getChessMoves);
  }
  let bestEvaluation = currentDetails.currentSide ? -Infinity : Infinity;

  for (let piece of board) {
    let moves = getChessMoves(piece, currentDetails, occupiedMatrix, "moves");
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
          evaluationFunction,
          getChessMoves,
          chessMovesReducer,
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
          evaluationFunction,
          getChessMoves,
          chessMovesReducer,
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
  if (ended) {
    return evaluationFunction(currentDetails, getChessMoves);
  }

  return bestEvaluation;
}

//For easy, it has a depth of 1 and uses v2 evaluation function
//For medium, it has a depth of 2 and uses v1 evaluation function
//For hard, it has a depth of 2 and uses v2 evaluation function
//Returns [depth, difficulty]
function getParameters(difficulty) {
  switch (difficulty) {
    case 0:
      return [1, V20EvaluateBoardV2];

    case 1:
      return [2, V20EvaluateBoardV1];

    case 2:
      return [2, V20EvaluateBoardV2];
  }
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

export default V20GetBestMove;
