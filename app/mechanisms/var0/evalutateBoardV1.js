import getOccupiedMatrix from "../primaryFunctions/getOccupiedMatrix.js";

function evaluateBoardV1(gameDetails, getChessMoves) {
  // Declare evaluation constants
  const coveredSquareValue = 20;
  const pawnValue = 60;
  const rookValue = 300;
  const knightValue = 200;
  const bishopValue = 200;
  const queenValue = 700;
  const kingValue = 100;
  const checkmateValue = 100000;
  const stalemateValue = 0;

  //Initialise occupied matrix
  const occupiedMatrix = getOccupiedMatrix(gameDetails.boardLayout);

  //Multipllier on coveredSquareValue based on how many pieces attacked that square
  const coveredSquareMatrix = [0, 1, 0.9, 0.85, 0.8, 0.75, 0.7, 0.6];
  //Multiplier on piece base value based on how many pieces defends it
  const defendedMatrix = [1, 1.1, 1.15, 1.18, 1.2, 1.21, 1.23, 1.25];
  //Multiplier on piece base value based on how many pieces attacks it
  const attackedMatrix = [1, 0.909, 0.87, 0.847, 0.833, 0.826, 0.813, 0.8];

  const board = gameDetails.boardLayout;

  return evaluateSide(true) - evaluateSide(false);

  function evaluateSide(side) {
    let evaluation = 0;
    const [attacked] = compileAttackedSquares(!side);

    const defended = compileDefendedSquares(side);

    const [covered] = compileAttackedSquares(side);

    for (let piece of board) {
      if (piece.side === side) {
        evaluation += evaluatePieceValue(piece, attacked, defended);
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

export default evaluateBoardV1;
