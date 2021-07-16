import { useReducer } from "react";
import { executeMove, checkCheck, validMoves } from "./normalChess";

function chessMovesReducer(state, action) {
  //Making deep copy
  let newDetails = Object.assign({}, state);
  switch (action.type) {
    case "pieceClick": {
      //Check for pawn promoting, if so, prevent other pieces from moving until promotion
      if (state.promotion) {
        return state;
      }
      let moves = validMoves(
        action.pieceId,
        state.boardLayout,
        state.lastMoved
      );

      if (JSON.stringify(moves) == JSON.stringify(state.moveables)) {
        newDetails.moveables = [null, null];
      } else {
        newDetails.moveables = moves;
      }
      return newDetails;
    }
    case "makeTurn": {
      //Add last moved
      //Save initial position (for last moved)
      let pieceId;
      let moved;
      if (action.castling) {
        pieceId = action.move[0][0];
        moved = action.move[0][1];
      } else {
        pieceId = action.move[0];
        moved = action.move[1];
      }
      let movedFrom = state.boardLayout[pieceId].position;
      newDetails.lastMoved = [pieceId, movedFrom, moved];

      //Make move
      newDetails.boardLayout = executeMove(
        action.move,
        state.boardLayout,
        action.castling
      );
      //Add eaten length
      if (action.move.length > 2) {
        let side = state.boardLayout[action.move[0]].side;
        let piece = state.boardLayout[action.move[2]];
        newDetails.eatenPieces.push([side, piece]);
      }
      //Change Side
      newDetails.currentSide = !state.currentSide;

      //Remove moveables
      newDetails.moveables = [null, null];

      //Check and update checks (only check checked of opposite side of moved pieces)
      let side;
      if (action.castling) {
        side = state.boardLayout[action.move[0][0]].side;
      } else {
        side = state.boardLayout[action.move[0]].side;
      }
      if (side) {
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

      //Check and update checkmates
      if (newDetails.checked === 1) {
        //Check for valid moves of all pieces
        let checkmated = true;
        for (let i = 0; i < newDetails.boardLayout.length; i++) {
          //Check for piece to be on white's side
          if (newDetails.boardLayout[i].side === true) {
            if (validMoves(i, newDetails.boardLayout, newDetails.lastMoved)) {
              checkmated = false;
            }
          }
        }
        newDetails.checkmated = 0;
        if (checkmated) {
          newDetails.checkmated = 1;
        }
      }

      //Check and update checkmates
      if (newDetails.checked === 2) {
        //Check for valid moves of all pieces
        let checkmated = true;
        for (let i = 0; i < newDetails.boardLayout.length; i++) {
          //Check for piece to be on white's side
          if (newDetails.boardLayout[i].side === false) {
            if (validMoves(i, newDetails.boardLayout, newDetails.lastMoved)) {
              checkmated = false;
            }
          }
        }
        newDetails.checkmated = 0;
        if (checkmated) {
          newDetails.checkmated = 2;
        }
      }

      //Check promotion
      //Promotion = [pieceId, piecePosition]
      if (newDetails.boardLayout[pieceId].type === "p") {
        if ((side === true && moved > 55) || (side === false && moved < 8)) {
          newDetails.promotion = pieceId;
        }
      }

      return newDetails;
    }
    //move = [id of pawn, type of pawn]
    case "promotion": {
      newDetails.boardLayout = state.boardLayout.map((a) => ({ ...a }));
      newDetails.boardLayout[action.move[0]].type = action.move[1];
      newDetails.promotion = null;
    }

    default: {
      console.log("type not specified");
      return state;
    }
  }
}

function useChessMove(initialBoard, initialSide) {
  const initialDetails = {
    boardLayout: initialBoard,
    moveables: [null, null],
    currentSide: initialSide,
    lastMoved: [null, null, null],
    eatenPieces: [],
    checked: 0,
    checkmated: 0,
    promotion: null,
  };
  return useReducer(chessMovesReducer, initialDetails);
}

export default useChessMove;
