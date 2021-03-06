import V16ExecuteMove from "./V16ExecuteMove.js";
import V16CheckCheck from "./V16CheckCheck.js";
import getPiece from "../../primaryFunctions/getPiece.js";
import V16GetChessMoves from "../V16GetChessMoves.js";
import clone from "just-clone";
import "react-native-console-time-polyfill";
import getOccupiedMatrix from "../../primaryFunctions/getOccupiedMatrix.js";

function V16ChessMovesReducer(state, action) {
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
      const moves = V16GetChessMoves(
        piece,
        state.boardLayout,
        occupiedMatrix,
        state.lastMoved,
        "moves"
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
      newDetails.boardLayout = V16ExecuteMove(
        action.move,
        state.boardLayout,
        action.castling
      );
      const movedPiece = getPiece(pieceId, newDetails.boardLayout);

      //Add eaten pieces
      if (action.move.length > 2) {
        for (let i = 2; i < action.move.length; i++) {
          const piece = getPiece(action.move[i], state.boardLayout);
          newDetails.eatenPieces.push([side, piece]);
        }
      }

      //Add to previous board to identify loss by repetition(store a max of 6 and only for boards when its white's turn)
      updateRepetition();

      //Remove moveables
      newDetails.moveables = [null, null];

      //Removed clickedSquare
      newDetails.clickedSquare = null;

      //update status
      //Initialised occupiedMatrix
      const occupiedMatrix = getOccupiedMatrix(newDetails.boardLayout);
      updateGameStatus(occupiedMatrix);

      //Check promotion
      //Promotion = [pieceId, piecePosition]
      if (movedPiece.type === "p") {
        if ((side === true && moved > 55) || (side === false && moved < 8)) {
          newDetails.promotion = pieceId;
        }
      }

      //Change Side (only if no promotion)
      if (!newDetails.promotion) {
        if (action.move.length > 2) {
          //Check for upgradable (only change side if no upgrade)
          if (movedPiece.level === 3 && movedPiece.perk === null) {
            newDetails.upgradable = pieceId;
          }
        }
        if (newDetails.upgradable === null) {
          newDetails.currentSide = !state.currentSide;
        }
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

      function updateRepetition() {
        //Add new board
        const previousBoard = newDetails.boardLayout.map((piece) => {
          return {
            id: piece.id,
            position: piece.position,
            type: piece.type,
            side: piece.side,
          };
        });
        newDetails.previousBoards.push(previousBoard);
        //Remove oldest board if all 4 repetitions are done
        if (newDetails.previousBoards.length > 9) {
          newDetails.previousBoards.splice(0, 1);
        }
        //Check for loss by repetition
        if (newDetails.previousBoards.length > 8) {
          const rep = JSON.stringify(newDetails.previousBoards[8]);
          let repCount = 1;
          //Check rep 1
          for (let i = 4; i > -1; i -= 4) {
            if (JSON.stringify(newDetails.previousBoards[i]) === rep) {
              repCount++;
            }
          }
          //Check rep 2
          if (repCount === 3) {
            newDetails.repetition = true;
          }
        }
      }
    }

    //move = [id of pawn, type of piece to promote]
    case "promotion": {
      //Find piece id
      let pieceIndex;
      let promotedPiece;
      //Get index of piece on board
      for (let i = 0; i < newDetails.boardLayout.length; i++) {
        if (state.boardLayout[i].id === action.move[0]) {
          pieceIndex = i;
          promotedPiece = state.boardLayout[i];
          break;
        }
      }
      //update new piece
      newDetails.boardLayout[pieceIndex].type = action.move[1];
      //remove promotion selection after selection is done
      newDetails.promotion = null;

      //update status
      const occupiedMatrix = getOccupiedMatrix(newDetails.boardLayout);
      updateGameStatus(occupiedMatrix);

      //Check for upgradable
      if (promotedPiece.level === 3 && promotedPiece.perk === null) {
        newDetails.upgradable = promotedPiece.id;
      } else {
        //change side
        newDetails.currentSide = !newDetails.currentSide;
      }

      return newDetails;
    }

    case "upgrade":
      {
        for (let i = 0; i < state.boardLayout.length; i++) {
          const piece = state.boardLayout[i];
          if (piece.id === state.upgradable) {
            newDetails.boardLayout[i].perk = action.perk;
            break;
          }
        }

        //Clear upgrades
        newDetails.upgradable = null;

        const occupiedMatrix = getOccupiedMatrix(newDetails.boardLayout);
        updateGameStatus(occupiedMatrix);

        newDetails.currentSide = !state.currentSide;
      }

      return newDetails;

    case "restart": {
      newDetails = {
        boardLayout: action.boardLayout,
        moveables: [null, null],
        clickedSquare: null,
        currentSide: true,
        lastMoved: [null, null, null],
        eatenPieces: [],
        previousBoards: [],
        checked: 0,
        stalemated: 0,
        checkmated: 0,
        repetition: false,
        promotion: null,
        upgradable: null,
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
          if (V16CheckCheck(newDetails.boardLayout, occupiedMatrix, false)) {
            newDetails.checked = 2;
          } else {
            newDetails.checked = 0;
          }
        } else {
          if (V16CheckCheck(newDetails.boardLayout, occupiedMatrix, true)) {
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
          for (const piece of newDetails.boardLayout) {
            //Check for piece to be on white's side
            if (piece.side === true) {
              if (
                V16GetChessMoves(
                  piece,
                  newDetails.boardLayout,
                  occupiedMatrix,
                  newDetails.lastMoved,
                  "moves"
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
          for (const piece of newDetails.boardLayout) {
            //Check for piece to be on white's side
            if (piece.side === false) {
              if (
                V16GetChessMoves(
                  piece,
                  newDetails.boardLayout,
                  occupiedMatrix,
                  newDetails.lastMoved,
                  "moves"
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

export default V16ChessMovesReducer;
