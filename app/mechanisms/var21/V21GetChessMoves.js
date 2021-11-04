import V21CheckPin from "./functions/V21CheckPin.js";
import V21CheckCheck from "./functions/V21CheckCheck.js";
import getPiece from "../primaryFunctions/getPiece.js";
import movePiece from "../var0/functions/movePiece.js";
import checkCollision from "../var0/functions/checkCollision.js";
import V21CreatePieceDataCalculator from "./V21CreatePieceDataCalculator.js";
import getOccupiedMatrix from "../primaryFunctions/getOccupiedMatrix.js";

function V21GetChessMoves(piece, gameDetails, occupiedMatrix, type) {
  switch (type) {
    case "moves":
      return validMoves(piece, gameDetails, occupiedMatrix);
    case "attacks":
      return validAttacks(piece, gameDetails, occupiedMatrix);
    case "defended":
      return validDefended(piece, gameDetails, occupiedMatrix);
  }
}
//returns list of valid moves a piece can make with consideration of pinning
// Last moved [id, movedFrom, moved] specialMoves: normalMoves = null, doublePawn move = 'dp', castling = 'c', enPassant = 'p'
function validMoves(piece, gameDetails, occupiedMatrix) {
  const { boardLayout, lastMoved } = gameDetails;
  // Get normal moves
  let moves = normalMoves(piece, gameDetails, occupiedMatrix);
  // Check for castling
  let castlingMoves = [];
  if (piece.type === "k") {
    castlingMoves = checkCastling(piece, gameDetails, occupiedMatrix, moves);
  }

  // Check for en Passant
  // Check for piece to be pawn, last move to be pawn)
  let enPassantMove;
  if (lastMoved[0]) {
    const pieceType = getPiece(lastMoved[0], boardLayout)?.type;
    if (piece.type === "p" && pieceType === "p") {
      // Make sure the pawn double moved
      if (Math.abs(lastMoved[1] - lastMoved[2]) === 16) {
        enPassantMove = checkEnPassant(piece, gameDetails, lastMoved);
      }
    }
  }
  if (enPassantMove) {
    moves.push(enPassantMove);
  }
  return [moves, castlingMoves];
}

//Return attacks from pieces
function validAttacks(piece, gameDetails, occupiedMatrix) {
  const portals = gameDetails.portalDetails.currentPortals;
  // Get moveable moves
  let pieceData = V21CreatePieceDataCalculator(piece, occupiedMatrix, portals);
  return pieceData.attacks;
}

function validDefended(piece, gameDetails, occupiedMatrix) {
  const portals = gameDetails.portalDetails.currentPortals;
  // Get moveable moves
  let pieceData = V21CreatePieceDataCalculator(piece, occupiedMatrix, portals);
  return pieceData.defended;
}

// Returns a list of normal moves checked for pins
function normalMoves(piece, gameDetails, occupiedMatrix) {
  const portals = gameDetails.portalDetails.currentPortals;
  let pieceData = V21CreatePieceDataCalculator(piece, occupiedMatrix, portals);
  // Check whether move is pinned
  let movesUnchecked = pieceData.moves;
  // Removing move if pinned
  let moves = [];
  for (let move of movesUnchecked) {
    if (V21CheckPin(move, gameDetails) === false) {
      moves.push(move);
    }
  }
  return moves;
}

// Check enPassant in the moves list
function checkEnPassant(piece, gameDetails, lastMoved) {
  let ghostPosition = (lastMoved[1] + lastMoved[2]) / 2;
  // Add temporary pawn in board to see pawn can declare enPassant
  let newBoard = movePiece(
    [lastMoved[0], ghostPosition],
    gameDetails.boardLayout
  );
  const newOccupiedMatrix = getOccupiedMatrix(newBoard);
  let newPiece;
  try {
    newPiece = getPiece(piece.id, newBoard);
  } catch (e) {
    return [];
  }
  let moves = normalMoves(
    newPiece,
    { ...gameDetails, boardLayout: newBoard },
    newOccupiedMatrix
  );
  // Check whether pawn can attacked the double moved piece
  for (let move of moves) {
    if (move[1] === ghostPosition) {
      //checkPin
      if (V21CheckPin(move, gameDetails) === false) {
        return move;
      }
    }
  }
  return null;
}
// Check castling in the moves list
function checkCastling(piece, gameDetails, occupiedMatrix, validMoves) {
  const board = gameDetails.boardLayout;
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
  if (V21CheckCheck(gameDetails, occupiedMatrix, piece.side)) {
    return castleMoves;
  }
  //check whether valid moves include pieces moving left or right
  for (let validMove of validMoves) {
    // For queen side castling
    if (validMove[1] === piece.position - 1 && castlingRookLeft[0]) {
      // Check for occupied pieces between the rook and king
      if (
        !(
          checkCollision(piece.position - 1, occupiedMatrix)[0] ||
          checkCollision(piece.position - 2, occupiedMatrix)[0] ||
          checkCollision(piece.position - 3, occupiedMatrix)[0]
        )
      ) {
        // Check whether king can move one more step to the right
        const newBoard = movePiece(validMove, board);
        const newPiece = getPiece(piece.id, newBoard);
        const newOccupiedMatrix = getOccupiedMatrix(newBoard);
        const moves = normalMoves(
          newPiece,
          { ...gameDetails, boardLayout: newBoard },
          newOccupiedMatrix
        );
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
          checkCollision(piece.position + 1, occupiedMatrix)[0] ||
          checkCollision(piece.position + 2, occupiedMatrix)[0]
        )
      ) {
        // Check whether king can move one more step to the right
        const newBoard = movePiece(validMove, board);
        const newPiece = getPiece(piece.id, newBoard);
        const newOccupiedMatrix = getOccupiedMatrix(newBoard);
        const moves = normalMoves(
          newPiece,
          { ...gameDetails, boardLayout: newBoard },
          newOccupiedMatrix
        );
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

export default V21GetChessMoves;
