import checkPin from "./functions/checkPin.js";
import checkCheck from "./functions/checkCheck.js";
import getPiece from "../primaryFunctions/getPiece.js";
import movePiece from "./functions/movePiece.js";
import checkCollision from "./functions/checkCollision.js";
import createPieceDataCalculator from "./normalChessMovements.js";

//returns list of valid moves a piece can make with consideration of pinning
// Last moved [id, movedFrom, moved] specialMoves: normalMoves = null, doublePawn move = 'dp', castling = 'c', enPassant = 'p'
function validMoves(id, board, lastMoved) {
  let piece = getPiece(id, board);
  // Get normal moves
  let moves = normalMoves(id, board);
  // Check for castling
  let castlingMoves = [];
  if (piece.type === "k") {
    castlingMoves = checkCastling(id, board, moves);
  }

  // Check for en Passant
  // Check for piece to be pawn, last move to be pawn)
  let enPassantMove;
  if (lastMoved[0]) {
    if (piece.type === "p" && getPiece(lastMoved[0], board).type === "p") {
      // Make sure the pawn double moved
      if (Math.abs(lastMoved[1] - lastMoved[2]) === 16) {
        enPassantMove = checkEnPassant(id, board, lastMoved);
      }
    }
  }
  if (enPassantMove) {
    moves.push(enPassantMove);
  }
  return [moves, castlingMoves];
}

//Return attacks from pieces
function validAttacks(piece, board, lastMoved) {
  // Get moveable moves
  let pieceData = createPieceDataCalculator(piece, board);
  // Check whether attack is pinned
  let result = [];
  for (let attack of pieceData.attacks) {
    result.push(attack);
  }
  // Check for en Passant
  // Check for piece to be pawn, last move to be pawn)
  let enPassantMoves = [];
  if (
    lastMoved &&
    getPiece(id, board).type === "p" &&
    getPiece(lastMoved[0], board).type === "p"
  ) {
    // Make sure the pawn double moved
    if (Math.abs(lastMoved[1] - lastMoved[2]) === 16) {
      enPassantMoves = checkEnPassant(id, board, normalMoves, lastMoved);
    }
  }
  return result;
}

function validDefended(piece, board) {
  // Get moveable moves
  let pieceData = createPieceDataCalculator(piece, board);
  // Check whether attack is pinned
  let result = [];
  for (let defend of pieceData.defended) {
    result.push(defend);
  }
  return result;
}

// Returns a list of normal moves checked for pins
function normalMoves(id, board) {
  let piece = getPiece(id, board);
  let pieceData = createPieceDataCalculator(piece, board);
  // Check whether move is pinned
  let normalPositions = pieceData.moves;
  // turn positions into moves, checking whether that move eats
  let movesUnchecked = [];
  for (let position of normalPositions) {
    let collided, side, eatenId;
    [collided, side, eatenId] = checkCollision(position, board);
    if (collided && side != piece.side) {
      movesUnchecked.push([id, position, eatenId]);
    } else {
      movesUnchecked.push([id, position]);
    }
  }
  // Removing move if pinned
  let moves = [];
  for (let move of movesUnchecked) {
    if (checkPin(move, board) === false) {
      moves.push(move);
    }
  }
  return moves;
}

// Check enPassant in the moves list
function checkEnPassant(id, board, lastMoved) {
  let ghostPosition = (lastMoved[1] + lastMoved[2]) / 2;
  // Add temporary pawn in board to see pawn can declare enPassant
  let newBoard = movePiece([lastMoved[0], ghostPosition], board);
  let moves = normalMoves(id, newBoard);
  // Check whether pawn can attacked the double moved piece
  for (let move of moves) {
    if (move[1] === ghostPosition) {
      //checkPin
      if (checkPin(move, board) === false) {
        return move;
      }
    }
  }
}
// Check castling in the moves list
function checkCastling(id, board, validMoves) {
  let piece = getPiece(id, board);
  let castleMoves = [];
  // make sure king and rook has not been moved
  if (piece.moved) {
    return castleMoves;
  }

  let castlingRookRight = [false, 0];
  let castlingRookLeft = [false, 0];
  for (let otherPiece of board) {
    if (
      otherPiece.type === "r" &&
      otherPiece.side === piece.side &&
      otherPiece.moved === false
    ) {
      //Identify is castling rook is on the right or left of king, from the perspective of white
      if (otherPiece.side === true) {
        //king is white
        if (otherPiece.position === 0) {
          castlingRookLeft = [true, otherPiece.id];
        }
        if (otherPiece.position === 7) {
          castlingRookRight = [true, otherPiece.id];
        }
      } else {
        //king is black
        if (otherPiece.position === 56) {
          castlingRookLeft = [true, otherPiece.id];
        }
        if (otherPiece.position === 63) {
          castlingRookRight = [true, otherPiece.id];
        }
      }
    }
  }
  // return if no castling rook
  if (!(castlingRookLeft[0] || castlingRookRight[0])) {
    return castleMoves;
  }

  //check whether in check
  if (checkCheck(board, piece.side)) {
    return castleMoves;
  }
  //check whether valid moves include pieces moving left or right
  for (let validMove of validMoves) {
    // For queen side castling
    if (validMove[1] === piece.position - 1 && castlingRookLeft[0]) {
      // Check for occupied pieces between the rook and king
      if (
        !(
          checkCollision(piece.position - 1, board)[0] &&
          checkCollision(piece.position - 2, board)[0] &&
          checkCollision(piece.position - 3, board)[0]
        )
      ) {
        // Check whether king can move one more step to the right
        let newBoard = movePiece(validMove, board);
        let moves = normalMoves(id, newBoard);
        // Check whether that move is in moves
        for (let move of moves) {
          if (move[1] === piece.position - 2) {
            //Can castle
            let castleMove = [move, [castlingRookLeft[1], move[1] + 1]];
            castleMoves.push(castleMove);
          }
        }
      }
    }
    // For normal castling
    if (validMove[1] === piece.position + 1 && castlingRookRight[0]) {
      // Check for occupied pieces between the rook and king
      if (
        !(
          checkCollision(piece.position + 1, board)[0] &&
          checkCollision(piece.position + 2, board)[0]
        )
      ) {
        // Check whether king can move one more step to the right
        let newBoard = movePiece(validMove, board);
        let moves = normalMoves(id, newBoard);
        // Check whether that move is in moves
        for (let move of moves) {
          if (move[1] === piece.position + 2) {
            //Can castle
            let castleMove = [move, [castlingRookRight[1], move[1] - 1]];
            castleMoves.push(castleMove);
          }
        }
      }
    }
  }
  return castleMoves;
}

export { validMoves, validAttacks, validDefended };
