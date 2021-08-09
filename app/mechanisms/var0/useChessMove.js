import { useReducer } from "react";
import executeMove from "./functions/executeMove";
import checkCheck from "./functions/checkCheck";
import getPiece from "../primaryFunctions/getPiece";
import { validMoves } from "./getChessMoves";

function chessMovesReducer(state, action) {
  //Making deep copy
  let newDetails = Object.assign({}, state);

  switch (action.type) {
    case "pieceClick": {
      //Check for pawn promoting, if so, prevent other pieces from moving until promotion
      if (state.promotion) {
        return state;
      }

      //Get moveableSquares
      const moves = validMoves(
        action.pieceId,
        state.boardLayout,
        state.lastMoved
      );

      if (JSON.stringify(moves) == JSON.stringify(state.moveables)) {
        newDetails.moveables = [null, null];
      } else {
        newDetails.moveables = moves;
      }

      //Get clickedSquare
      const clickedSquare = getPiece(
        action.pieceId,
        state.boardLayout
      ).position;

      if (clickedSquare === state.clickedSquare) {
        newDetails.clickedSquare = null;
      } else {
        newDetails.clickedSquare = clickedSquare;
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
      updateGameStatus();

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
      newDetails.boardLayout = state.boardLayout.map((a) => ({ ...a }));
      //Find piece id
      let oldPiece;
      let pieceIndex;
      for (let i = 0; i < newDetails.boardLayout.length; i++) {
        if (newDetails.boardLayout[i].id === action.move[0]) {
          oldPiece = newDetails.boardLayout[i];
          pieceIndex = i;
        }
      }
      //update new piece
      newDetails.boardLayout[pieceIndex] = {
        id: oldPiece.id,
        position: oldPiece.position,
        type: action.move[1],
        side: oldPiece.side,
        moved: oldPiece.moved,
      };
      //remove promotion selection after selection is done
      newDetails.promotion = null;

      //update status
      updateGameStatus();

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
        console.log("type not specified");
        return state;
      }

      function updateGameStatus() {
        updateChecks();
        updateStalemates();
        updateCheckmates();
      }

      function updateChecks() {
        if (state.currentSide) {
          if (checkCheck(newDetails.boardLayout, false)) {
            newDetails.checked = 2;
          } else {
            newDetails.checked = 0;
          }
        } else {
          if (checkCheck(newDetails.boardLayout, true)) {
            newDetails.checked = 1;
          } else {
            newDetails.checked = 0;
          }
        }
      }

      function updateStalemates() {
        //Check stalemate for white
        //Check for valid moves of all pieces
        if (newDetails.currentSide === false) {
          let whiteStalemated = true;
          for (let piece of newDetails.boardLayout) {
            //Check for piece to be on white's side
            if (piece.side === true) {
              if (
                validMoves(
                  piece.id,
                  newDetails.boardLayout,
                  newDetails.lastMoved
                )[0].length
              ) {
                whiteStalemated = false;
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
        if (newDetails.currentSide === true) {
          let blackStalemated = true;
          for (let piece of newDetails.boardLayout) {
            //Check for piece to be on white's side
            if (piece.side === false) {
              if (
                validMoves(
                  piece.id,
                  newDetails.boardLayout,
                  newDetails.lastMoved
                )[0].length
              ) {
                blackStalemated = false;
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

function useChessMove(initialBoard) {
  const initialDetails = {
    boardLayout: initialBoard,
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

  return useReducer(chessMovesReducer, initialDetails);
}

export default useChessMove;
