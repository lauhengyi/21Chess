import checkCollision from "../var0/functions/checkCollision";
import accountCollidedPiece from "./functions/accountCollidedPiece";
import checkEdge from "./functions/checkEdge";
import getLanePositions from "./functions/getLanePositions";
import updateLane from "./functions/portalFunctions/updateLane";

// attacks and moves and defends are without consideration of pinning
// function to make a calculator to calculate piece moves, attacks, defends and base value
function V21CreatePieceDataCalculator(piece, occupiedMatrix, portals) {
  switch (piece.type) {
    case "p":
      return new pawnCalculator(piece, occupiedMatrix, portals);
    case "r":
      return new rookCalculator(piece, occupiedMatrix, portals);
    case "n":
      return new knightCalculator(piece, occupiedMatrix);
    case "b":
      return new bishopCalculator(piece, occupiedMatrix, portals);
    case "q":
      return new queenCalculator(piece, occupiedMatrix, portals);
    case "k":
      return new kingCalculator(piece, occupiedMatrix, portals);
    default:
      throw new Error("Unknown type: ${piece.type}");
  }
}

//Create base class
class pieceDataCalculator {
  constructor(piece, occupiedMatrix, portals) {
    this.piece = piece;
    this.occupiedMatrix = occupiedMatrix;
    this.portals = portals;
  }
}
class pawnCalculator extends pieceDataCalculator {
  get moves() {
    return pawnMoves(this.piece, this.occupiedMatrix, this.portals);
  }

  get attacks() {
    return pawnAttacks(this.piece, this.occupiedMatrix, this.portals, true);
  }

  get defended() {
    return pawnAttacks(this.piece, this.occupiedMatrix, this.portals, false);
  }
}

class rookCalculator extends pieceDataCalculator {
  get moves() {
    return rookMoves(this.piece, this.occupiedMatrix, this.portals, true);
  }

  get attacks() {
    return rookMoves(this.piece, this.occupiedMatrix, this.portals, true);
  }

  get defended() {
    return rookMoves(this.piece, this.occupiedMatrix, this.portals, false);
  }
}

class knightCalculator extends pieceDataCalculator {
  get moves() {
    return knightMoves(this.piece, this.occupiedMatrix, true);
  }

  get attacks() {
    return knightMoves(this.piece, this.occupiedMatrix, true);
  }

  get defended() {
    return knightMoves(this.piece, this.occupiedMatrix, false);
  }
}

class bishopCalculator extends pieceDataCalculator {
  get moves() {
    return bishopMoves(this.piece, this.occupiedMatrix, this.portals, true);
  }

  get attacks() {
    return bishopMoves(this.piece, this.occupiedMatrix, this.portals, true);
  }

  get defended() {
    return bishopMoves(this.piece, this.occupiedMatrix, this.portals, false);
  }
}

class queenCalculator extends pieceDataCalculator {
  get moves() {
    return queenMoves(this.piece, this.occupiedMatrix, this.portals, true);
  }

  get attacks() {
    return queenMoves(this.piece, this.occupiedMatrix, this.portals, true);
  }

  get defended() {
    return queenMoves(this.piece, this.occupiedMatrix, this.portals, false);
  }
}

class kingCalculator extends pieceDataCalculator {
  get moves() {
    return kingMoves(this.piece, this.occupiedMatrix, this.portals, true);
  }

  get attacks() {
    return kingMoves(this.piece, this.occupiedMatrix, this.portals, true);
  }

  get defended() {
    return kingMoves(this.piece, this.occupiedMatrix, this.portals, false);
  }
}

//returns a list of positions that the pawn can move and attack
function pawnMoves(piece, occupiedMatrix, portals) {
  //check for pawn
  if (piece.type != "p") {
    throw new Error("input piece not pawn");
  }

  //get attack moves
  let Amoves = pawnAttacks(piece, occupiedMatrix, portals, true);
  //update attacks to only when there is an enemy
  let moves = [];
  for (let move of Amoves) {
    const [collided, side, eatenId] = checkCollision(move[1], occupiedMatrix);
    if (collided && side != piece.side) {
      moves.push([move[0], move[1], eatenId]);
    }
  }

  //differentiate between white and black
  let collided;
  let position = piece.position;
  if (piece.side) {
    //piece is white
    let increment = 8;

    [position, increment] = updateLane(position, increment, portals);
    [collided] = checkCollision(position + increment, occupiedMatrix);

    if (!checkEdge(position, increment) && !collided) {
      moves.push([piece.id, position + increment]);
      //Check for double move
      if (!piece.moved) {
        position += increment;
        [position, increment] = updateLane(position, increment, portals);
        [collided] = checkCollision(position + increment, occupiedMatrix);
        if (!checkEdge(position, increment) && !collided) {
          moves.push([piece.id, position + increment]);
        }
      }
    }
  } else {
    //piece is black
    let increment = -8;

    [position, increment] = updateLane(position, increment, portals);
    [collided] = checkCollision(position + increment, occupiedMatrix);

    if (!checkEdge(position, increment) && !collided) {
      moves.push([piece.id, position + increment]);
      //Check for double move
      if (!piece.moved) {
        position += increment;
        [position, increment] = updateLane(position, increment, portals);
        [collided] = checkCollision(position + increment, occupiedMatrix);
        if (!checkEdge(position, increment) && !collided) {
          moves.push([piece.id, position + increment]);
        }
      }
    }
  }
  return moves;
}

//returns a list of positions that the pawn can attack, regardless of enemies and without accounting for pinning
function pawnAttacks(piece, occupiedMatrix, portals, AorD) {
  //check for pawn
  if (piece.type != "p") {
    throw new Error("input piece not pawn");
  }
  // Need to differentiate from white and black due to assymetrical movement of pawns
  let attacks = [];
  if (piece.side === true) {
    //pawn is white
    //consider edge cases
    //consider extreme left and extreme right respectively
    const increments = [7, 9];
    for (let increment of increments) {
      let position = piece.position;
      [position, increment] = updateLane(position, increment, portals);
      if (!checkEdge(position, increment)) {
        attacks.push(position + increment);
      }
    }
  } else {
    //pawn is black
    //consider edge cases
    //consider extreme left and extreme right respectively
    const increments = [-7, -9];
    for (let increment of increments) {
      let position = piece.position;
      [position, increment] = updateLane(position, increment, portals);
      if (!checkEdge(position, increment)) {
        attacks.push(position + increment);
      }
    }
  }
  //return nothing if attack is on an allied piece
  let result = [];
  for (let attack of attacks) {
    [result] = accountCollidedPiece(
      attack,
      piece,
      result,
      occupiedMatrix,
      AorD
    );
  }
  return result;
}

//returns a list of positions that the rook can attack, without accounting for pinning
function rookMoves(piece, occupiedMatrix, portals, AorD) {
  //check for rook
  if (piece.type != "r") {
    throw new Error("input piece not rook");
  }
  const up = getLanePositions(
    piece.position,
    piece,
    occupiedMatrix,
    AorD,
    8,
    portals
  );
  const bottom = getLanePositions(
    piece.position,
    piece,
    occupiedMatrix,
    AorD,
    -8,
    portals
  );
  const left = getLanePositions(
    piece.position,
    piece,
    occupiedMatrix,
    AorD,
    -1,
    portals
  );
  const right = getLanePositions(
    piece.position,
    piece,
    occupiedMatrix,
    AorD,
    1,
    portals
  );

  //add directions together
  return [...new Set(up.concat(bottom, left, right))];
}

//returns a list of positions that the knight can attack, without considering pinning
function knightMoves(piece, occupiedMatrix, AorD) {
  //check if piece is knight
  if (piece.type != "n") {
    throw new Error("input piece is not knight");
  }

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
function bishopMoves(piece, occupiedMatrix, portals, AorD) {
  //check for bishop
  if (piece.type != "b") {
    throw new Error("input piece not bishop");
  }

  const northE = getLanePositions(
    piece.position,
    piece,
    occupiedMatrix,
    AorD,
    9,
    portals
  );
  const southW = getLanePositions(
    piece.position,
    piece,
    occupiedMatrix,
    AorD,
    -9,
    portals
  );
  const northW = getLanePositions(
    piece.position,
    piece,
    occupiedMatrix,
    AorD,
    7,
    portals
  );
  const southE = getLanePositions(
    piece.position,
    piece,
    occupiedMatrix,
    AorD,
    -7,
    portals
  );

  //add all four directions together
  return [...new Set(northE.concat(southW, northW, southE))];
}

//Returns a list of positions that the queen can attack, not considering pinning
function queenMoves(piece, occupiedMatrix, portals, AorD) {
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
    portals,
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
    portals,
    AorD
  );

  return [...new Set(rm.concat(bm))];
}

//Returns a list of positioins that the king can attack, not considering pinning
function kingMoves(piece, occupiedMatrix, portals, AorD) {
  //check for king
  if (piece.type != "k") {
    throw new Error("input piece not king");
  }

  //list possible increments
  const increments = [8, -8, -1, 1, 7, 9, -9, -7];

  //compile moves
  let positions = [];
  for (let increment of increments) {
    let position = piece.position;
    [position, increment] = updateLane(position, increment, portals);
    if (!checkEdge(position, increment)) {
      positions.push(position + increment);
    }
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

export default V21CreatePieceDataCalculator;
