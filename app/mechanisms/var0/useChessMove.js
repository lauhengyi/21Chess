import { useReducer } from "react";
import executeMove from "./functions/executeMove.js";
import checkCheck from "./functions/checkCheck.js";
import getPiece from "../primaryFunctions/getPiece.js";
import { validMoves } from "./getChessMoves.js";
import clone from "just-clone";
import "react-native-console-time-polyfill";
import getOccupiedMatrix from "../primaryFunctions/getOccupiedMatrix.js";

function chessMovesReducer(state, action) {
  //Making deep copy
  let newDetails = clone(state);

  switch (action.type) {
    case "pieceClick": {
      //Check for pawn promoting, if so, prevent other pieces from moving until promotion
      if (state.promotion) {
        return state;
      }

      //Get piece
      const piece = getPiece(action.pieceId, state.boardLayout);

      //Initialised occupiedMatrix
      const occupiedMatrix = getOccupiedMatrix(state.boardLayout);

      //Get clickedSquare
      const clickedSquare = piece.position;

      //Get moveableSquares
      const moves = validMoves(
        piece,
        state.boardLayout,
        occupiedMatrix,
        state.lastMoved
      );

      if (clickedSquare === state.clickedSquare) {
        newDetails.clickedSquare = null;
        newDetails.moveables = [null, null];
      } else {
        newDetails.clickedSquare = clickedSquare;
        newDetails.moveables = moves;
      }
      return newDetails;
    }
    case "makeTurn": {
      //Get pieceId and final position of piece
      const [pieceId, moved] = getPieceIdandMoved();
      //Get side of moved piece
      const side = state.currentSide;

      updateLastMoved();

      //Make move
      newDetails.boardLayout = executeMove(
        action.move,
        state.boardLayout,
        action.castling
      );

      //Add eaten pieces
      if (action.move.length > 2) {
        let side = getPiece(action.move[0], state.boardLayout).side;
        let piece = getPiece(action.move[2], state.boardLayout);
        newDetails.eatenPieces.push([side, piece]);
      }

      //Remove moveables
      newDetails.moveables = [null, null];

      //Removed clickedSquare
      newDetails.clickedSquare = null;

      //update status
      //Initialised occupiedMatrix
      const occupiedMatrix = getOccupiedMatrix(state.boardLayout);
      updateGameStatus(occupiedMatrix);

      //Check promotion
      //Promotion = [pieceId, piecePosition]
      if (getPiece(pieceId, newDetails.boardLayout).type === "p") {
        if ((side === true && moved > 55) || (side === false && moved < 8)) {
          newDetails.promotion = pieceId;
        }
      }

      //Change Side (only if no promotion)
      if (!newDetails.promotion) {
        newDetails.currentSide = !state.currentSide;
      }

      return newDetails;

      function getPieceIdandMoved() {
        let pieceId;
        let moved;
        if (action.castling) {
          pieceId = action.move[0][0];
          moved = action.move[0][1];
        } else {
          pieceId = action.move[0];
          moved = action.move[1];
        }
        return [pieceId, moved];
      }

      function updateLastMoved() {
        let movedFrom = getPiece(pieceId, state.boardLayout).position;
        newDetails.lastMoved = [pieceId, movedFrom, moved];
      }
    }

    //move = [id of pawn, type of piece to promote]
    case "promotion": {
      //Find piece id
      let pieceIndex;
      //Get index of piece on board
      for (let i = 0; i < newDetails.boardLayout.length; i++) {
        if (newDetails.boardLayout[i].id === action.move[0]) {
          pieceIndex = i;
        }
      }
      //update new piece
      newDetails.boardLayout[pieceIndex].type = action.move[1];
      //remove promotion selection after selection is done
      newDetails.promotion = null;

      //update status
      const occupiedMatrix = getOccupiedMatrix(newDetails.boardLayout);
      updateGameStatus(occupiedMatrix);

      //change side
      newDetails.currentSide = !newDetails.currentSide;

      return newDetails;
    }

    case "restart": {
      newDetails = {
        boardLayout: action.boardLayout,
        moveables: [null, null],
        clickedSquare: null,
        currentSide: true,
        lastMoved: [null, null, null],
        eatenPieces: [],
        checked: 0,
        stalemated: 0,
        checkmated: 0,
        promotion: null,
      };
      return newDetails;
    }

    default:
      {
        throw new Error("type not specified");
      }

      function updateGameStatus(occupiedMatrix) {
        updateChecks(occupiedMatrix);
        updateStalemates(occupiedMatrix);
        updateCheckmates();
      }

      function updateChecks(occupiedMatrix) {
        if (state.currentSide) {
          if (checkCheck(newDetails.boardLayout, occupiedMatrix, false)) {
            newDetails.checked = 2;
          } else {
            newDetails.checked = 0;
          }
        } else {
          if (checkCheck(newDetails.boardLayout, occupiedMatrix, true)) {
            newDetails.checked = 1;
          } else {
            newDetails.checked = 0;
          }
        }
      }

      function updateStalemates(occupiedMatrix) {
        //Check stalemate for white
        //Check for valid moves of all pieces
        if (newDetails.currentSide === false) {
          let whiteStalemated = true;
          for (let piece of newDetails.boardLayout) {
            //Check for piece to be on white's side
            if (piece.side === true) {
              if (
                validMoves(
                  piece,
                  newDetails.boardLayout,
                  occupiedMatrix,
                  newDetails.lastMoved
                )[0].length
              ) {
                whiteStalemated = false;
                break;
              }
            }
          }
          newDetails.stalemated = 0;
          if (whiteStalemated) {
            newDetails.stalemated = 1;
          }
        }

        //Check stalemate for black
        //Check for valid moves of all pieces
        else {
          let blackStalemated = true;
          for (let piece of newDetails.boardLayout) {
            //Check for piece to be on white's side
            if (piece.side === false) {
              if (
                validMoves(
                  piece,
                  newDetails.boardLayout,
                  occupiedMatrix,
                  newDetails.lastMoved
                )[0].length
              ) {
                blackStalemated = false;
                break;
              }
            }
          }
          newDetails.stalemated = 0;
          if (blackStalemated) {
            newDetails.stalemated = 2;
          }
        }
      }

      function updateCheckmates() {
        if (newDetails.checked === newDetails.stalemated) {
          newDetails.checkmated = newDetails.checked;
          //remove stalemate
          newDetails.stalemated = 0;
        } else {
          newDetails.checkmated = 0;
        }
      }
  }
}

function useChessMove(boardLayout, saved) {
  let initialDetails;
  if (saved) {
    initialDetails = saved.gameDetails;
  } else {
    initialDetails = {
      boardLayout: boardLayout,
      moveables: [null, null],
      clickedSquare: null,
      currentSide: true,
      lastMoved: [null, null, null],
      eatenPieces: [],
      checked: 0,
      stalemated: 0,
      checkmated: 0,
      promotion: null,
    };
  }
  return useReducer(chessMovesReducer, initialDetails);
}

export { useChessMove, chessMovesReducer };
