import { validAttacks, validDefended } from "./getChessMoves.js";
import layout from "../../screens/variations/boardLayouts/var0Layout.js";

function evaluateBoard(gameDetails) {
  // Declare evaluation constants
  const coveredSquareValue = 10;
  const pawnValue = 60;
  const rookValue = 300;
  const knightValue = 240;
  const bishopValue = 200;
  const queenValue = 700;
  const kingValue = 100;
  const checkmateValue = Infinity;

  //Multipllier on coveredSquareValue based on how many pieces attacked that square
  const coveredSquareMatrix = [0, 1, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3];
  //Multiplier on piece base value based on how many pieces defends it
  const defendedMatrix = [1, 1.5, 2.0, 2.3, 4, 4.3, 4.7, 5];
  //Multiplier on piece base value based on how many pieces attacks it
  const attackedMatrix = [1, 0.5, 0.357, 0.286, 0.25, 0.233, 0.213, 0.2];

  const board = gameDetails.boardLayout;

  return evaluateSide(true) - evaluateSide(false);

  function evaluateSide(side) {
    const attacked = compileAttackedSquares(!side);
    const defended = compileDefendedSquares(side);
    const covered = compileAttackedSquares(side);

    let evaluation = 0;

    for (let piece of board) {
      if (piece.side === side) {
        evaluation += evaluatePieceValue(piece, attacked, defended);
      }
    }

    evaluation += evaluateCoveredSquares(covered);

    evaluation += evaluateCheckmate(side);

    return evaluation;
  }

  // return a list of attacked squares by the side, in a key value pair object, where key is position, and value is number of pieces attacking it
  function compileAttackedSquares(side) {
    //initialise object;
    let result = [];
    for (let i = 0; i < 64; i++) {
      result.push(0);
    }

    for (let piece of board) {
      // check side of piece
      if (piece.side === side) {
        // get attacked squares of piece
        let attacks = validAttacks(piece, board, gameDetails.lastMoved);
        // Add attacks to result
        for (let attack of attacks) {
          result[attack] += 1;
        }
      }
    }

    return result;
  }

  // return a list of defended squares by the side, in a key value pair object, where key is position, and value is number of pieces attacking it
  function compileDefendedSquares(side) {
    //initialise object;
    let result = [];
    for (let i = 0; i < 64; i++) {
      result.push(0);
    }

    for (let piece of board) {
      // check side of piece
      if (piece.side === side) {
        // get attacked squares of piece
        let defended = validDefended(piece, board);
        // Add attacks to result
        for (let defend of defended) {
          result[defend] += 1;
        }
      }
    }
    return result;
  }

  function evaluatePieceValue(piece, attacked, defended) {
    // Determine base value
    const baseValue = getBaseValue(piece);

    let pieceValue = baseValue;
    // Determine how many times attacked by enemy
    let attackedIndex = attacked[piece.position];
    // Pass base value by attacked matrix
    pieceValue *= attackedMatrix[attackedIndex];

    // Determine how many times piece is defended;
    let defendedIndex = defended[piece.position];
    // Pass base balue by defended matrix
    pieceValue *= defendedMatrix[defendedIndex];

    return pieceValue;
  }

  // Return total value of squares attacked by one side
  function evaluateCoveredSquares(covered) {
    let result = 0;
    for (let i = 0; i < 64; i++) {
      let coveredIndex = covered[i];
      // Pass through coveredMatrix then add to result
      result +=
        coveredSquareValue * coveredIndex * coveredSquareMatrix[coveredIndex];
    }
    return result;
  }

  function evaluateCheckmate(side) {
    let result = 0;
    if (gameDetails.checkmated) {
      if (
        (gameDetails.checkmated === 2 && side === true) ||
        (gameDetails.checkmated === 1 && side === false)
      ) {
        result = checkmateValue;
      }
    }
    return result;
  }

  function getBaseValue(piece) {
    switch (piece.type) {
      case "p":
        return pawnValue;
      case "r":
        return rookValue;
      case "n":
        return knightValue;
      case "b":
        return bishopValue;
      case "q":
        return queenValue;
      case "k":
        return kingValue;
      default:
        throw new Error("Unknown type");
    }
  }
}

export default evaluateBoard;
