import getOccupiedMatrix from "../primaryFunctions/getOccupiedMatrix.js";

function V19EvaluateBoardV2(gameDetails, getChessMoves) {
  // Declare evaluation constants
  const coveredSquareValue = 20;
  const pawnValue = 60;
  const rookValue = 300;
  const knightValue = 200;
  const bishopValue = 450;
  const queenValue = 700;
  const kingValue = 300;
  const checkmateValue = Infinity;
  const stalemateValue = 0;

  //Initialise occupied matrix
  const occupiedMatrix = getOccupiedMatrix(gameDetails.boardLayout);

  //Multipllier on coveredSquareValue based on how many pieces attacked that square
  const coveredSquareMatrix = [0, 1, 0.9, 0.85, 0.8, 0.75, 0.7, 0.6];
  //Additional points on piece base value based on how many pieces defends it
  const defendedMatrix = [0, 40, 60, 70, 75, 77.5, 80, 82, 81];
  //Multiplier on piece base value based on how many pieces attacks it
  const attackedMatrix = [1, 0.909, 0.87, 0.847, 0.833, 0.826, 0.813, 0.8];

  const board = gameDetails.boardLayout;

  return evaluateSide(true) - evaluateSide(false);

  function evaluateSide(side) {
    let evaluation = 0;
    const [attacked, pawnAttacked] = compileAttackedSquares(!side);

    const defended = compileDefendedSquares(side);

    const [covered] = compileAttackedSquares(side);

    for (let piece of board) {
      if (piece.side === side) {
        evaluation += evaluatePieceValue(
          piece,
          attacked,
          pawnAttacked,
          defended
        );
      }
    }

    evaluation += evaluateCoveredSquares(covered);
    evaluation = evaluateStatus(side, evaluation);

    return evaluation;
  }

  // return a list of attacked squares by the side, in a key value pair object, where key is position, and value is number of pieces attacking it
  function compileAttackedSquares(side) {
    //initialise object;
    let result = [];
    let pawnAttacked = [];
    for (let i = 0; i < 64; i++) {
      result.push(0);
      pawnAttacked.push(0);
    }

    for (let piece of board) {
      // check side of piece
      if (piece.side === side) {
        // get attacked squares of piece
        let attacks = getChessMoves(
          piece,
          board,
          occupiedMatrix,
          gameDetails.lastMoved,
          "attacks"
        );
        // Add attacks to result
        for (let attack of attacks) {
          result[attack[1]] += 1;
        }
        if (piece.type === "p") {
          for (const attack of attacks) {
            pawnAttacked[attack[1]] += 1;
          }
        }
      }
    }

    return [result, pawnAttacked];
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
        let defended = getChessMoves(
          piece,
          board,
          occupiedMatrix,
          gameDetails.lastMoved,
          "defended"
        );
        // Add attacks to result
        for (let defend of defended) {
          result[defend[1]] += 1;
        }
      }
    }
    return result;
  }

  function evaluatePieceValue(piece, attacked, pawnAttacked, defended) {
    //Piece will most likely be eaten if it is attacked by a pawn
    if (pawnAttacked[piece.position] && piece.type !== "p") {
      return 0;
    }

    // Determine how many times attacked by enemy
    let attackedIndex = attacked[piece.position];

    // Determine how many times piece is defended;
    let defendedIndex = defended[piece.position];

    //Piece will most likely be eaten if attacked and unprotected
    if (attackedIndex && !defendedIndex) {
      return 0;
    }

    // Determine base value
    const baseValue = getBaseValue(piece);

    let pieceValue = baseValue;
    // Pass base value by attacked matrix
    pieceValue *= attackedMatrix[attackedIndex];

    // Pass base balue by defended matrix
    pieceValue += defendedMatrix[defendedIndex];

    //Multiply bass value by health
    pieceValue *= piece.health;

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

  function evaluateStatus(side, evaluation) {
    let result = evaluation;
    if (gameDetails.checkmated) {
      if (
        (gameDetails.checkmated === 2 && side === true) ||
        (gameDetails.checkmated === 1 && side === false)
      ) {
        result = checkmateValue;
      }
    } else if (gameDetails.stalemated) {
      if (gameDetails.stalemated) {
        result = stalemateValue;
      }
    } else if (gameDetails.repetition) {
      result = stalemateValue;
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
      case null:
        return 0;
      default:
        throw new Error("Unknown type");
    }
  }
}

export default V19EvaluateBoardV2;
