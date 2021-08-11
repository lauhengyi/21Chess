import checkCollision from "./functions/checkCollision.js";

// attacks and moves and defends are without consideration of pinning
// function to make a calculator to calculate piece moves, attacks, defends and base value
function createPieceDataCalculator(piece, board) {
  switch (piece.type) {
    case "p":
      return new pawnCalculator(piece, board);
    case "r":
      return new rookCalculator(piece, board);
    case "n":
      return new knightCalculator(piece, board);
    case "b":
      return new bishopCalculator(piece, board);
    case "q":
      return new queenCalculator(piece, board);
    case "k":
      return new kingCalculator(piece, board);
    default:
      throw new Error("Unknown type: ${piece.type}");
  }
}

//Create base class
class pieceDataCalculator {
  constructor(piece, board) {
    this.piece = piece;
    this.board = board;
  }
}
class pawnCalculator extends pieceDataCalculator {
  get moves() {
    return pawnMoves(this.piece, this.board);
  }

  get attacks() {
    return pawnAttacks(this.piece, this.board, true);
  }

  get defended() {
    return pawnAttacks(this.piece, this.board, false);
  }
}

class rookCalculator extends pieceDataCalculator {
  get moves() {
    return rookMoves(this.piece, this.board, true);
  }

  get attacks() {
    return rookMoves(this.piece, this.board, true);
  }

  get defended() {
    return rookMoves(this.piece, this.board, false);
  }
}

class knightCalculator extends pieceDataCalculator {
  get moves() {
    return knightMoves(this.piece, this.board, true);
  }

  get attacks() {
    return knightMoves(this.piece, this.board, true);
  }

  get defended() {
    return knightMoves(this.piece, this.board, false);
  }
}

class bishopCalculator extends pieceDataCalculator {
  get moves() {
    return bishopMoves(this.piece, this.board, true);
  }

  get attacks() {
    return bishopMoves(this.piece, this.board, true);
  }

  get defended() {
    return bishopMoves(this.piece, this.board, false);
  }
}

class queenCalculator extends pieceDataCalculator {
  get moves() {
    return queenMoves(this.piece, this.board, true);
  }

  get attacks() {
    return queenMoves(this.piece, this.board, true);
  }

  get defended() {
    return queenMoves(this.piece, this.board, false);
  }
}

class kingCalculator extends pieceDataCalculator {
  get moves() {
    return kingMoves(this.piece, this.board, true);
  }

  get attacks() {
    return kingMoves(this.piece, this.board, true);
  }

  get defended() {
    return kingMoves(this.piece, this.board, false);
  }
}

//returns a list of positions that the pawn can move and attack
function pawnMoves(piece, board) {
  //check for pawn
  if (piece.type != "p") {
    throw new Error("input piece not pawn");
  }

  //get attack moves
  let Amoves = pawnAttacks(piece, board, true);
  //update attacks to only when there is an enemy
  let positions = [];
  for (let move of Amoves) {
    let collided, side;
    [collided, side] = checkCollision(move, board);
    if (collided && side != piece.side) {
      positions.push(move);
    }
  }

  //compile forward movement (include double movement if pawn is untouched)
  if (piece.moved === false) {
    //differentiate between white and black
    if (piece.side) {
      //piece is white
      let collided;
      [collided] = checkCollision(piece.position + 8, board);
      if (!collided) {
        positions.push(piece.position + 8);
        [collided] = checkCollision(piece.position + 16, board);
        if (!collided) {
          positions.push(piece.position + 16);
        }
      }
    } else {
      //piece is black
      let collided;
      [collided] = checkCollision(piece.position - 8, board);
      if (!collided) {
        positions.push(piece.position - 8);
        [collided] = checkCollision(piece.position - 16, board);
        if (!collided) {
          positions.push(piece.position - 16);
        }
      }
    }
  } else {
    //differentiate between white and black
    if (piece.side) {
      //piece is white
      if (!checkCollision(piece.position + 8, board)[0]) {
        positions.push(piece.position + 8);
      }
    } else {
      //piece is black
      if (!checkCollision(piece.position - 8, board)[0]) {
        positions.push(piece.position - 8);
      }
    }
  }
  return positions;
}

//returns a list of positions that the pawn can attack, regardless of enemies and without accounting for pinning
function pawnAttacks(piece, board, AorD) {
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
    if (!checkLeftEdge(piece.position)) {
      attacks.push(piece.position + 7);
    }
    if (!checkRightEdge(piece.position)) {
      attacks.push(piece.position + 9);
    }
  } else {
    //pawn is black
    //consider edge cases
    //consider extreme left and extreme right respectively
    if (!checkLeftEdge(piece.position)) {
      attacks.push(piece.position - 9);
    }
    if (!checkRightEdge(piece.position)) {
      attacks.push(piece.position - 7);
    }
  }
  //return nothing if attack is on an allied piece
  if (AorD) {
    let result = [];
    for (let attack of attacks) {
      let collided, side;
      [collided, side] = checkCollision(attack, board);
      if (collided === false || side != piece.side) {
        result.push(attack);
      }
    }
    return result;
  } else {
    return attacks;
  }
}

//returns a list of positions that the rook can attack, without accounting for pinning
function rookMoves(piece, board, AorD) {
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
    [up, collided] = accountCollidedPiece(i, piece.side, up, board, AorD);
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
    [down, collided] = accountCollidedPiece(i, piece.side, down, board, AorD);
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
    [left, collided] = accountCollidedPiece(i, piece.side, left, board, AorD);
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
    [right, collided] = accountCollidedPiece(i, piece.side, right, board, AorD);
    if (collided) {
      break;
    }
  }

  //add directions together
  return up.concat(down, left, right);
}

//returns a list of positions that the knight can attack, without considering pinning
function knightMoves(piece, board, AorD) {
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
  let moves = [];

  // consider up moves
  if (!checkTopEdge2(piece.position)) {
    if (!checkLeftEdge(piece.position)) {
      moves.push(ul);
    }
    if (!checkRightEdge(piece.position)) {
      moves.push(ur);
    }
  }

  // consider down moves
  if (!checkBottomEdge2(piece.position)) {
    if (!checkLeftEdge(piece.position)) {
      moves.push(dl);
    }
    if (!checkRightEdge(piece.position)) {
      moves.push(dr);
    }
  }

  // consider left moves
  if (!checkLeftEdge2(piece.position) && !checkLeftEdge(piece.position)) {
    if (!checkTopEdge(piece.position)) {
      moves.push(lu);
    }
    if (!checkBottomEdge(piece.position)) {
      moves.push(ld);
    }
  }

  // consider right moves
  if (!checkRightEdge2(piece.position) && !checkRightEdge(piece.position)) {
    if (!checkTopEdge(piece.position)) {
      moves.push(ru);
    }
    if (!checkBottomEdge(piece.position)) {
      moves.push(rd);
    }
  }

  //update positions which is moves - positions when knight is blocked by ally
  let positions = [];
  for (let move of moves) {
    [positions] = accountCollidedPiece(
      move,
      piece.side,
      positions,
      board,
      AorD
    );
  }
  return positions;
}

//returns a list of positions that a bishop can attack without considering pinning
function bishopMoves(piece, board, AorD) {
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
      piece.side,
      northE,
      board,
      AorD
    );
    if (collided) {
      break;
    }

    //add to northE
    northE.push(i);
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
      piece.side,
      southW,
      board,
      AorD
    );
    if (collided) {
      break;
    }

    //add to northE
    southW.push(i);
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
      piece.side,
      northW,
      board,
      AorD
    );
    if (collided) {
      break;
    }

    //add to northE
    northW.push(i);
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
      piece.side,
      southE,
      board,
      AorD
    );
    if (collided) {
      break;
    }

    //add to northE
    southE.push(i);
  }

  //add all four directions together
  return northE.concat(southW, northW, southE);
}

//Returns a list of positions that the queen can attack, not considering pinning
function queenMoves(piece, board, AorD) {
  //check for queen
  if (piece.type != "q") {
    throw new Error("input piece not queen");
  }
  //Get rook moves
  let rm = rookMoves(
    {
      position: piece.position,
      type: "r",
      moved: piece.moved,
      side: piece.side,
    },
    board,
    AorD
  );
  //Get bishop moves
  let bm = bishopMoves(
    {
      position: piece.position,
      type: "b",
      moved: piece.moved,
      side: piece.side,
    },
    board,
    AorD
  );

  return rm.concat(bm);
}

//Returns a list of positioins that the king can attack, not considering pinning
function kingMoves(piece, board, AorD) {
  //check for king
  if (piece.type != "k") {
    throw new Error("input piece not king");
  }

  //list possible moves
  let u = piece.position + 8;
  let d = piece.position - 8;
  let l = piece.position - 1;
  let r = piece.position + 1;
  let ul = piece.position + 7;
  let ur = piece.position + 9;
  let dl = piece.position - 9;
  let dr = piece.position - 7;

  //compile moves
  let moves = [];
  //considering up moves
  if (!checkTopEdge(piece.position)) {
    moves.push(u);
    if (!checkLeftEdge(piece.position)) {
      moves.push(ul);
    }
    if (!checkRightEdge(piece.position)) {
      moves.push(ur);
    }
  }
  //consider down moves
  if (!checkBottomEdge(piece.position)) {
    moves.push(d);
    if (!checkLeftEdge(piece.position)) {
      moves.push(dl);
    }
    if (!checkRightEdge(piece.position)) {
      moves.push(dr);
    }
  }

  //consider side moves
  if (!checkLeftEdge(piece.position)) {
    moves.push(l);
  }
  if (!checkRightEdge(piece.position)) {
    moves.push(r);
  }

  let positions = [];
  for (let move of moves) {
    [positions] = accountCollidedPiece(
      move,
      piece.side,
      positions,
      board,
      AorD
    );
  }

  return positions;
}

function checkTopEdge(position) {
  if (position > 55) {
    return true;
  } else {
    return false;
  }
}

function checkTopEdge2(position) {
  if (position > 47) {
    return true;
  } else {
    return false;
  }
}

function checkBottomEdge(position) {
  if (position < 8) {
    return true;
  } else {
    return false;
  }
}

function checkBottomEdge2(position) {
  if (position < 16) {
    return true;
  } else {
    return false;
  }
}

function checkLeftEdge(position) {
  if ((position + 8) % 8 === 0) {
    return true;
  } else {
    return false;
  }
}

function checkLeftEdge2(position) {
  if ((position + 7) % 8 === 0) {
    return true;
  } else {
    return false;
  }
}

function checkRightEdge(position) {
  if ((position + 9) % 8 === 0) {
    return true;
  } else {
    return false;
  }
}

function checkRightEdge2(position) {
  if ((position + 10) % 8 === 0) {
    return true;
  } else {
    return false;
  }
}

//function that when given position of move, side of piece, and list of previously compiled moves,
//Last parameter, AorD, refers to whether accounting attacked squares, or checking defended squares, true for attack, false for defend
//will return [updated moves, whether the position is collided]
function accountCollidedPiece(position, side, moves, board, AorD) {
  let ifcollided = checkCollision(position, board);
  if (AorD === true) {
    if (ifcollided[0]) {
      if (side === ifcollided[1]) {
        return [moves, true];
      } else {
        moves.push(position);
        return [moves, true];
      }
    } else {
      moves.push(position);
      return [moves, false];
    }
  } else {
    if (ifcollided[0]) {
      moves.push(position);
      return [moves, true];
    } else {
      moves.push(position);
      return [moves, false];
    }
  }
}

export default createPieceDataCalculator;
