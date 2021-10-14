import checkCollision from "../../var0/functions/checkCollision";

// attacks and moves and defends are without consideration of pinning
// function to make a calculator to calculate piece moves, attacks, defends and base value
function getDecapitator(piece, occupiedMatrix) {
  switch (piece.type) {
    case "r":
      return new rookCalculator(piece, occupiedMatrix);
    case "b":
      return new bishopCalculator(piece, occupiedMatrix);
    case "q":
      return new queenCalculator(piece, occupiedMatrix);
    default:
      throw new Error("Unknown type: ${piece.type}");
  }
}

//Create base class
class pieceDataCalculator {
  constructor(piece, occupiedMatrix) {
    this.piece = piece;
    this.occupiedMatrix = occupiedMatrix;
  }
}

class rookCalculator extends pieceDataCalculator {
  get moves() {
    return rookMoves(this.piece, this.occupiedMatrix, true);
  }

  get attacks() {
    return rookMoves(this.piece, this.occupiedMatrix, true);
  }

  get defended() {
    return rookMoves(this.piece, this.occupiedMatrix, false);
  }
}

class bishopCalculator extends pieceDataCalculator {
  get moves() {
    return bishopMoves(this.piece, this.occupiedMatrix, true);
  }

  get attacks() {
    return bishopMoves(this.piece, this.occupiedMatrix, true);
  }

  get defended() {
    return bishopMoves(this.piece, this.occupiedMatrix, false);
  }
}

class queenCalculator extends pieceDataCalculator {
  get moves() {
    return queenMoves(this.piece, this.occupiedMatrix, true);
  }

  get attacks() {
    return queenMoves(this.piece, this.occupiedMatrix, true);
  }

  get defended() {
    return queenMoves(this.piece, this.occupiedMatrix, false);
  }
}

//returns a list of positions that the rook can attack, without accounting for pinning
function rookMoves(piece, occupiedMatrix, AorD) {
  //check for rook
  if (piece.type != "r") {
    throw new Error("input piece not rook");
  }
  let up = [];
  let down = [];
  let left = [];
  let right = [];

  //Find up
  let i = piece.position;
  while (true) {
    // break if edge
    if (checkTopEdge(i)) {
      break;
    }

    i += 8;

    //Check for blocking pieces
    let collided;
    [up, collided] = accountCollidedPiece(i, piece, up, occupiedMatrix, AorD);
    if (collided) {
      break;
    }
  }
  up = consolidateMoves(up);

  //Find down
  i = piece.position;
  while (true) {
    // Remove if edge
    if (checkBottomEdge(i)) {
      break;
    }

    i -= 8;

    //Check for blocking pieces
    let collided;
    [down, collided] = accountCollidedPiece(
      i,
      piece,
      down,
      occupiedMatrix,
      AorD
    );
    if (collided) {
      break;
    }
  }
  down = consolidateMoves(down);

  //find left
  i = piece.position;
  while (true) {
    //Check for extreme left
    if (checkLeftEdge(i)) {
      break;
    }

    i--;

    //Check for blocking pieces
    let collided;
    [left, collided] = accountCollidedPiece(
      i,
      piece,
      left,
      occupiedMatrix,
      AorD
    );
    if (collided) {
      break;
    }
  }
  left = consolidateMoves(left);

  //find right
  i = piece.position;
  while (true) {
    //Check for extreme right
    if (checkRightEdge(i)) {
      break;
    }

    i++;

    //Check for blocking pieces
    let collided;
    [right, collided] = accountCollidedPiece(
      i,
      piece,
      right,
      occupiedMatrix,
      AorD
    );
    if (collided) {
      break;
    }
  }
  right = consolidateMoves(right);

  //add directions together
  return up.concat(down, left, right);
}

//returns a list of positions that a bishop can attack without considering pinning
function bishopMoves(piece, occupiedMatrix, AorD) {
  //check for bishop
  if (piece.type != "b") {
    throw new Error("input piece not bishop");
  }
  let northE = [];
  let southW = [];
  let northW = [];
  let southE = [];

  //find northE
  let i = piece.position;
  while (true) {
    //Check for extreme right
    if (checkRightEdge(i)) {
      break;
    }
    //Check for extreme top
    if (checkTopEdge(i)) {
      break;
    }

    i += 9;

    //Check for blocking pieces
    let collided;
    [northE, collided] = accountCollidedPiece(
      i,
      piece,
      northE,
      occupiedMatrix,
      AorD
    );
    if (collided) {
      break;
    }
  }
  northE = consolidateMoves(northE);

  //find southW
  i = piece.position;
  while (true) {
    //Check for extreme left
    if (checkLeftEdge(i)) {
      break;
    }
    //Check for extreme bottom
    if (checkBottomEdge(i)) {
      break;
    }

    i -= 9;

    //Check for blocking pieces
    let collided;
    [southW, collided] = accountCollidedPiece(
      i,
      piece,
      southW,
      occupiedMatrix,
      AorD
    );
    if (collided) {
      break;
    }
  }
  southW = consolidateMoves(southW);

  //find northW
  i = piece.position;
  while (true) {
    //Check for extreme left
    if (checkLeftEdge(i)) {
      break;
    }
    //Check for extreme top
    if (checkTopEdge(i)) {
      break;
    }

    i += 7;

    //Check for blocking pieces
    let collided;
    [northW, collided] = accountCollidedPiece(
      i,
      piece,
      northW,
      occupiedMatrix,
      AorD
    );
    if (collided) {
      break;
    }
  }
  northW = consolidateMoves(northW);

  //find southE
  i = piece.position;
  while (true) {
    //Check for extreme right
    if (checkRightEdge(i)) {
      break;
    }
    //Check for extreme bottom
    if (checkBottomEdge(i)) {
      break;
    }

    i -= 7;

    //Check for blocking pieces
    let collided;
    [southE, collided] = accountCollidedPiece(
      i,
      piece,
      southE,
      occupiedMatrix,
      AorD
    );
    if (collided) {
      break;
    }
  }
  southE = consolidateMoves(southE);

  //add all four directions together
  return northE.concat(southW, northW, southE);
}

//Returns a list of positions that the queen can attack, not considering pinning
function queenMoves(piece, occupiedMatrix, AorD) {
  //check for queen
  if (piece.type != "q") {
    throw new Error("input piece not queen");
  }
  //Get rook moves
  let rm = rookMoves(
    {
      id: piece.id,
      position: piece.position,
      type: "r",
      moved: piece.moved,
      side: piece.side,
    },
    occupiedMatrix,
    AorD
  );
  //Get bishop moves
  let bm = bishopMoves(
    {
      id: piece.id,
      position: piece.position,
      type: "b",
      moved: piece.moved,
      side: piece.side,
    },
    occupiedMatrix,
    AorD
  );

  return rm.concat(bm);
}

function checkTopEdge(position) {
  return position > 55;
}

function checkBottomEdge(position) {
  return position < 8;
}

function checkLeftEdge(position) {
  return (position + 8) % 8 === 0;
}

function checkRightEdge(position) {
  return (position + 9) % 8 === 0;
}

//function that when given position of move, side of piece, and list of previously compiled moves,
//Last parameter, AorD, refers to whether accounting attacked squares, or checking defended squares, true for attack, false for defend
//will return [updated moves, whether the position is collided]
function accountCollidedPiece(position, piece, moves, occupiedMatrix, AorD) {
  const [collided, collidedSide, eatenId] = checkCollision(
    position,
    occupiedMatrix
  );
  if (AorD === true) {
    if (collided) {
      if (piece.side === collidedSide) {
        return [moves, true];
      } else {
        moves.push([piece.id, position, eatenId]);
        return [moves, false];
      }
    } else {
      moves.push([piece.id, position]);
      return [moves, false];
    }
  } else {
    if (collided) {
      if (piece.side === collidedSide) {
        moves.push([piece.id, position, eatenId]);
        return [moves, true];
      } else {
        moves.push([piece.id, position, eatenId]);
        return [moves, false];
      }
    } else {
      moves.push([piece.id, position]);
      return [moves, false];
    }
  }
}

function consolidateMoves(moves) {
  const consolidatedMoves = [];
  //Check that moves is not empty before consolidating
  if (moves.length > 0) {
    for (let i = moves.length - 1; i > 0; i--) {
      let move = moves[i];
      for (let j = i - 1; j > -1; j--) {
        if (moves[j].length > 2) {
          move.push(moves[j][2]);
        }
      }
      consolidatedMoves.push(move);
    }
    consolidatedMoves.push(moves[0]);
  }
  return consolidatedMoves;
}

export default getDecapitator;
