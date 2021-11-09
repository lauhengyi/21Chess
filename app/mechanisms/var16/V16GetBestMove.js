import getOccupiedMatrix from "../primaryFunctions/getOccupiedMatrix.js";
import evaluateBoardV2 from "../var0/evalutateBoardV2.js";
import evaluateBoardV1 from "../var0/evalutateBoardV1.js";

function V16GetBestMove(
  gameDetails,
  getChessMoves,
  chessMovesReducer,
  difficulty
) {
  //Difficulty:
  // 0 == easy, 1 == medium, 2 == hard
  const currentDetails = gameDetails;
  const board = currentDetails.boardLayout;
  const occupiedMatrix = getOccupiedMatrix(board);

  //Create evaluation function and depth depending on difficulty
  const [depth, evaluationFunction] = getParameters(difficulty);

  let bestEvaluation = currentDetails.currentSide ? -Infinity : Infinity;
  let bestMove = [-1, -1];
  let castling = false;
  let promotion = false;
  let upgradable = false;
  const perkList = ["s", "a", "p", "d", "c"];
  const perk = perkList[Math.floor(Math.random() * 5)];
  for (let piece of board) {
    if (piece.side === currentDetails.currentSide) {
      let moves = getChessMoves(
        piece,
        board,
        occupiedMatrix,
        currentDetails.lastMoved,
        "moves"
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
          //Check upgrading
          let upgraded = false;
          if (newDetails.upgradable) {
            //Randomize perk getting
            newDetails = chessMovesReducer(newDetails, {
              type: "order",
              perk: perk,
            });
            upgraded = true;
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
            upgradable = upgraded;
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
  }

  return [bestMove, castling, promotion, upgradable, perk];
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
  const currentDetails = gameDetails;
  const board = currentDetails.boardLayout;
  const occupiedMatrix = getOccupiedMatrix(board);

  //Add end point
  if (depth === 0) {
    return evaluationFunction(currentDetails, getChessMoves);
  }
  let bestEvaluation = currentDetails.currentSide ? -Infinity : Infinity;

  for (let piece of board) {
    if (piece.side === currentDetails.currentSide) {
      let moves = getChessMoves(
        piece,
        board,
        occupiedMatrix,
        currentDetails.lastMoved,
        "moves"
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
          //Check upgrading
          if (newDetails.upgradable) {
            //Randomize perk getting
            const perkList = ["s", "a", "p", "d", "c"];
            const perk = perkList[Math.floor(Math.random() * 5)];
            newDetails = chessMovesReducer(newDetails, {
              type: "order",
              perk: perk,
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
      return [1, evaluateBoardV2];

    case 1:
      return [2, evaluateBoardV1];

    case 2:
      return [2, evaluateBoardV2];
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

export default V16GetBestMove;
