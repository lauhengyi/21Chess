import checkCollision from "../var0/functions/checkCollision";

// attacks and moves and defends are without consideration of pinning
// function to make a calculator to calculate piece moves, attacks, defends and base value
function V14CreatePieceDataCalculator(piece, occupiedMatrix) {
  switch (piece.type) {
    case "p":
      return new pawnCalculator(piece, occupiedMatrix);
    case "r":
      return new rookCalculator(piece, occupiedMatrix);
    case "n":
      return new knightCalculator(piece, occupiedMatrix);
    case "b":
      return new bishopCalculator(piece, occupiedMatrix);
    case "q":
      return new queenCalculator(piece, occupiedMatrix);
    case "k":
      return new kingCalculator(piece, occupiedMatrix);
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
class pawnCalculator extends pieceDataCalculator {
  get moves() {
    if (this.piece.stacked && this.piece.stacked !== "x") {
      const pieceData = V14CreatePieceDataCalculator(
        {
          ...this.piece,
          type: this.piece.stacked,
          stacked: "x",
        },
        this.occupiedMatrix
      );
      return pieceData.moves.concat(pawnMoves(this.piece, this.occupiedMatrix));
    }
    return pawnMoves(this.piece, this.occupiedMatrix);
  }

  get attacks() {
    if (this.piece.stacked && this.piece.stacked !== "x") {
      const pieceData = V14CreatePieceDataCalculator(
        {
          ...this.piece,
          type: this.piece.stacked,
          stacked: "x",
        },
        this.occupiedMatrix
      );
      return pieceData.attacks.concat(
        pawnAttacks(this.piece, this.occupiedMatrix, true)
      );
    }
    return pawnAttacks(this.piece, this.occupiedMatrix, true);
  }

  get defended() {
    if (this.piece.stacked && this.piece.stacked !== "x") {
      const pieceData = V14CreatePieceDataCalculator(
        {
          ...this.piece,
          type: this.piece.stacked,
          stacked: "x",
        },
        this.occupiedMatrix
      );
      return pieceData.defended.concat(
        pawnAttacks(this.piece, this.occupiedMatrix, false)
      );
    }
    return pawnAttacks(this.piece, this.occupiedMatrix, false);
  }
}

class rookCalculator extends pieceDataCalculator {
  get moves() {
    if (this.piece.stacked && this.piece.stacked !== "x") {
      const pieceData = V14CreatePieceDataCalculator(
        {
          ...this.piece,
          type: this.piece.stacked,
          stacked: "x",
        },
        this.occupiedMatrix
      );
      return pieceData.moves.concat(
        rookMoves(this.piece, this.occupiedMatrix, true)
      );
    }
    return rookMoves(this.piece, this.occupiedMatrix, true);
  }

  get attacks() {
    if (this.piece.stacked && this.piece.stacked !== "x") {
      const pieceData = V14CreatePieceDataCalculator(
        {
          ...this.piece,
          type: this.piece.stacked,
          stacked: "x",
        },
        this.occupiedMatrix
      );
      return pieceData.attacks.concat(
        rookMoves(this.piece, this.occupiedMatrix, true)
      );
    }
    return rookMoves(this.piece, this.occupiedMatrix, true);
  }

  get defended() {
    if (this.piece.stacked && this.piece.stacked !== "x") {
      const pieceData = V14CreatePieceDataCalculator(
        {
          ...this.piece,
          type: this.piece.stacked,
          stacked: "x",
        },
        this.occupiedMatrix
      );
      return pieceData.defended.concat(
        rookMoves(this.piece, this.occupiedMatrix, false)
      );
    }
    return rookMoves(this.piece, this.occupiedMatrix, false);
  }
}

class knightCalculator extends pieceDataCalculator {
  get moves() {
    if (this.piece.stacked && this.piece.stacked !== "x") {
      const pieceData = V14CreatePieceDataCalculator(
        {
          ...this.piece,
          type: this.piece.stacked,
          stacked: "x",
        },
        this.occupiedMatrix
      );
      return pieceData.moves.concat(
        knightMoves(this.piece, this.occupiedMatrix, true)
      );
    }
    return knightMoves(this.piece, this.occupiedMatrix, true);
  }

  get attacks() {
    if (this.piece.stacked && this.piece.stacked !== "x") {
      const pieceData = V14CreatePieceDataCalculator(
        {
          ...this.piece,
          type: this.piece.stacked,
          stacked: "x",
        },
        this.occupiedMatrix
      );
      return pieceData.attacks.concat(
        knightMoves(this.piece, this.occupiedMatrix, true)
      );
    }
    return knightMoves(this.piece, this.occupiedMatrix, true);
  }

  get defended() {
    if (this.piece.stacked && this.piece.stacked !== "x") {
      const pieceData = V14CreatePieceDataCalculator(
        {
          ...this.piece,
          type: this.piece.stacked,
          stacked: "x",
        },
        this.occupiedMatrix
      );
      return pieceData.defended.concat(
        knightMoves(this.piece, this.occupiedMatrix, false)
      );
    }
    return knightMoves(this.piece, this.occupiedMatrix, false);
  }
}

class bishopCalculator extends pieceDataCalculator {
  get moves() {
    if (this.piece.stacked && this.piece.stacked !== "x") {
      const pieceData = V14CreatePieceDataCalculator(
        {
          ...this.piece,
          type: this.piece.stacked,
          stacked: "x",
        },
        this.occupiedMatrix
      );
      return pieceData.moves.concat(
        bishopMoves(this.piece, this.occupiedMatrix, true)
      );
    }
    return bishopMoves(this.piece, this.occupiedMatrix, true);
  }

  get attacks() {
    if (this.piece.stacked && this.piece.stacked !== "x") {
      const pieceData = V14CreatePieceDataCalculator(
        {
          ...this.piece,
          type: this.piece.stacked,
          stacked: "x",
        },
        this.occupiedMatrix
      );
      return pieceData.attacks.concat(
        bishopMoves(this.piece, this.occupiedMatrix, true)
      );
    }
    return bishopMoves(this.piece, this.occupiedMatrix, true);
  }

  get defended() {
    if (this.piece.stacked && this.piece.stacked !== "x") {
      const pieceData = V14CreatePieceDataCalculator(
        {
          ...this.piece,
          type: this.piece.stacked,
          stacked: "x",
        },
        this.occupiedMatrix
      );
      return pieceData.defended.concat(
        bishopMoves(this.piece, this.occupiedMatrix, false)
      );
    }
    return bishopMoves(this.piece, this.occupiedMatrix, false);
  }
}

class queenCalculator extends pieceDataCalculator {
  get moves() {
    if (this.piece.stacked && this.piece.stacked !== "x") {
      const pieceData = V14CreatePieceDataCalculator(
        {
          ...this.piece,
          type: this.piece.stacked,
          stacked: "x",
        },
        this.occupiedMatrix
      );
      return pieceData.moves.concat(
        queenMoves(this.piece, this.occupiedMatrix, true)
      );
    }
    return queenMoves(this.piece, this.occupiedMatrix, true);
  }

  get attacks() {
    if (this.piece.stacked && this.piece.stacked !== "x") {
      const pieceData = V14CreatePieceDataCalculator(
        {
          ...this.piece,
          type: this.piece.stacked,
          stacked: "x",
        },
        this.occupiedMatrix
      );
      return pieceData.attacks.concat(
        queenMoves(this.piece, this.occupiedMatrix, true)
      );
    }
    return queenMoves(this.piece, this.occupiedMatrix, true);
  }

  get defended() {
    if (this.piece.stacked && this.piece.stacked !== "x") {
      const pieceData = V14CreatePieceDataCalculator(
        {
          ...this.piece,
          type: this.piece.stacked,
          stacked: "x",
        },
        this.occupiedMatrix
      );
      return pieceData.defended.concat(
        queenMoves(this.piece, this.occupiedMatrix, false)
      );
    }
    return queenMoves(this.piece, this.occupiedMatrix, false);
  }
}

class kingCalculator extends pieceDataCalculator {
  get moves() {
    return kingMoves(this.piece, this.occupiedMatrix, true);
  }

  get attacks() {
    return kingMoves(this.piece, this.occupiedMatrix, true);
  }

  get defended() {
    return kingMoves(this.piece, this.occupiedMatrix, false);
  }
}
//returns a list of positions that the pawn can move and attack
function pawnMoves(piece, occupiedMatrix) {
  //get attack moves
  let Amoves = pawnAttacks(piece, occupiedMatrix, true);
  //update attacks to only when there is an enemy
  let moves = [];
  for (let move of Amoves) {
    const [collided, , eatenId, collidedStacked, collidedType] = checkCollision(
      move[1],
      occupiedMatrix
    );
    if (
      collided &&
      !piece.stacked &&
      !collidedStacked &&
      piece.type !== collidedType
    ) {
      moves.push([move[0], move[1], eatenId]);
    }
  }

  //compile forward movement (include double movement if pawn is untouched)
  if (piece.moved === false) {
    //differentiate between white and black
    if (piece.side) {
      //piece is white
      let collided;
      [collided] = checkCollision(piece.position + 8, occupiedMatrix);
      if (!collided) {
        moves.push([piece.id, piece.position + 8]);
        [collided] = checkCollision(piece.position + 16, occupiedMatrix);
        if (!collided) {
          moves.push([piece.id, piece.position + 16]);
        }
      }
    } else {
      //piece is black
      let collided;
      [collided] = checkCollision(piece.position - 8, occupiedMatrix);
      if (!collided) {
        moves.push([piece.id, piece.position - 8]);
        [collided] = checkCollision(piece.position - 16, occupiedMatrix);
        if (!collided) {
          moves.push([piece.id, piece.position - 16]);
        }
      }
    }
  } else {
    //differentiate between white and black
    if (piece.side) {
      //piece is white
      if (!checkCollision(piece.position + 8, occupiedMatrix)[0]) {
        moves.push([piece.id, piece.position + 8]);
      }
    } else {
      //piece is black
      if (!checkCollision(piece.position - 8, occupiedMatrix)[0]) {
        moves.push([piece.id, piece.position - 8]);
      }
    }
  }
  return moves;
}

//returns a list of positions that the pawn can attack, regardless of enemies and without accounting for pinning
function pawnAttacks(piece, occupiedMatrix, AorD) {
  // Need to differentiate from white and black due to assymetrical movement of pawns
  let attacks = [];
  if (piece.side === true) {
    //pawn is white
    //consider edge cases
    //consider extreme left and extreme right respectively
    if (!checkLeftEdge(piece.position) && !checkTopEdge(piece.position)) {
      attacks.push([piece.id, piece.position + 7]);
    }
    if (!checkRightEdge(piece.position) && !checkTopEdge(piece.position)) {
      attacks.push([piece.id, piece.position + 9]);
    }
  } else {
    //pawn is black
    //consider edge cases
    //consider extreme left and extreme right respectively
    if (!checkLeftEdge(piece.position) && !checkBottomEdge(piece.position)) {
      attacks.push([piece.id, piece.position - 9]);
    }
    if (!checkRightEdge(piece.position) && !checkBottomEdge(piece.position)) {
      attacks.push([piece.id, piece.position - 7]);
    }
  }
  //return nothing if attack is on an allied piece
  let result = [];
  for (let attack of attacks) {
    [result] = accountCollidedPiece(
      attack[1],
      piece,
      result,
      occupiedMatrix,
      AorD
    );
  }
  return result;
}

//returns a list of positions that the rook can attack, without accounting for pinning
function rookMoves(piece, occupiedMatrix, AorD) {
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

  //add directions together
  return up.concat(down, left, right);
}

//returns a list of positions that the knight can attack, without considering pinning
function knightMoves(piece, occupiedMatrix, AorD) {
  // consider all eight possible moves:
  // ul, ur. dl, dr, lu, ld, ru, rd
  let ul = piece.position + 15;
  let ur = piece.position + 17;
  let dl = piece.position - 17;
  let dr = piece.position - 15;
  let lu = piece.position + 6;
  let ld = piece.position - 10;
  let ru = piece.position + 10;
  let rd = piece.position - 6;

  // compile moves before accounting for positions blocked by allies
  // adding relevant moves depending on the pieces edge cases
  let positions = [];

  // consider up moves
  if (!checkTopEdge2(piece.position)) {
    if (!checkLeftEdge(piece.position)) {
      positions.push(ul);
    }
    if (!checkRightEdge(piece.position)) {
      positions.push(ur);
    }
  }

  // consider down moves
  if (!checkBottomEdge2(piece.position)) {
    if (!checkLeftEdge(piece.position)) {
      positions.push(dl);
    }
    if (!checkRightEdge(piece.position)) {
      positions.push(dr);
    }
  }

  // consider left moves
  if (!checkLeftEdge2(piece.position) && !checkLeftEdge(piece.position)) {
    if (!checkTopEdge(piece.position)) {
      positions.push(lu);
    }
    if (!checkBottomEdge(piece.position)) {
      positions.push(ld);
    }
  }

  // consider right moves
  if (!checkRightEdge2(piece.position) && !checkRightEdge(piece.position)) {
    if (!checkTopEdge(piece.position)) {
      positions.push(ru);
    }
    if (!checkBottomEdge(piece.position)) {
      positions.push(rd);
    }
  }

  //update positions which is moves - positions when knight is blocked by ally
  let moves = [];
  for (let position of positions) {
    [moves] = accountCollidedPiece(
      position,
      piece,
      moves,
      occupiedMatrix,
      AorD
    );
  }
  return moves;
}

//returns a list of positions that a bishop can attack without considering pinning
function bishopMoves(piece, occupiedMatrix, AorD) {
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

  //add all four directions together
  return northE.concat(southW, northW, southE);
}

//Returns a list of positions that the queen can attack, not considering pinning
function queenMoves(piece, occupiedMatrix, AorD) {
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

//Returns a list of positioins that the king can attack, not considering pinning
function kingMoves(piece, occupiedMatrix, AorD) {
  //check for king
  if (piece.type != "k") {
    throw new Error("input piece not king");
  }

  //list possible positions
  let u = piece.position + 8;
  let d = piece.position - 8;
  let l = piece.position - 1;
  let r = piece.position + 1;
  let ul = piece.position + 7;
  let ur = piece.position + 9;
  let dl = piece.position - 9;
  let dr = piece.position - 7;

  //compile moves
  let positions = [];
  //considering up moves
  if (!checkTopEdge(piece.position)) {
    positions.push(u);
    if (!checkLeftEdge(piece.position)) {
      positions.push(ul);
    }
    if (!checkRightEdge(piece.position)) {
      positions.push(ur);
    }
  }
  //consider down moves
  if (!checkBottomEdge(piece.position)) {
    positions.push(d);
    if (!checkLeftEdge(piece.position)) {
      positions.push(dl);
    }
    if (!checkRightEdge(piece.position)) {
      positions.push(dr);
    }
  }

  //consider side moves
  if (!checkLeftEdge(piece.position)) {
    positions.push(l);
  }
  if (!checkRightEdge(piece.position)) {
    positions.push(r);
  }

  let moves = [];
  for (let position of positions) {
    [moves] = accountCollidedPiece(
      position,
      piece,
      moves,
      occupiedMatrix,
      AorD
    );
  }

  return moves;
}

function checkTopEdge(position) {
  return position > 55;
}

function checkTopEdge2(position) {
  return position > 47;
}

function checkBottomEdge(position) {
  return position < 8;
}

function checkBottomEdge2(position) {
  return position < 16;
}

function checkLeftEdge(position) {
  return (position + 8) % 8 === 0;
}

function checkLeftEdge2(position) {
  return (position + 7) % 8 === 0;
}

function checkRightEdge(position) {
  return (position + 9) % 8 === 0;
}

function checkRightEdge2(position) {
  return (position + 10) % 8 === 0;
}

//function that when given position of move, side of piece, and list of previously compiled moves,
//Last parameter, AorD, refers to whether accounting attacked squares, or checking defended squares, true for attack, false for defend
//will return [updated moves, whether the position is collided]
function accountCollidedPiece(position, piece, moves, occupiedMatrix, AorD) {
  const [collided, collidedSide, eatenId, collidedStacked, collidedType] =
    checkCollision(position, occupiedMatrix);
  if (AorD === true) {
    if (collided) {
      if (
        (piece.side === collidedSide && (piece.stacked || collidedStacked)) ||
        piece.type === collidedType
      ) {
        return [moves, true];
      } else {
        moves.push([piece.id, position, eatenId]);
        return [moves, true];
      }
    } else {
      moves.push([piece.id, position]);
      return [moves, false];
    }
  } else {
    if (collided) {
      moves.push([piece.id, position, eatenId]);
      return [moves, true];
    } else {
      moves.push([piece.id, position]);
      return [moves, false];
    }
  }
}

export default V14CreatePieceDataCalculator;
