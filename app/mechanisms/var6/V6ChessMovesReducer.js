import V6ExecuteMove from "./functions/V6ExecuteMove.js";
import checkCheck from "../var0/functions/checkCheck.js";
import getPiece from "../primaryFunctions/getPiece.js";
import getChessMoves from "../var0/getChessMoves.js";
import clone from "just-clone";
import "react-native-console-time-polyfill";
import getOccupiedMatrix from "../primaryFunctions/getOccupiedMatrix.js";
function V6ChessMovesReducer(state, action) {
  //Making deep copy
  let newDetails = clone(state);
  let currentGame = state.currentGame;

  switch (action.type) {
    case "pieceClick": {
      //Check for pawn promoting, if so, prevent other pieces from moving until promotion
      if (state[currentGame].promotion) {
        return state;
      }

      //Get piece
      const piece = getPiece(action.pieceId, state[currentGame].boardLayout);

      //Initialised occupiedMatrix
      const occupiedMatrix = getOccupiedMatrix(state[currentGame].boardLayout);

      //Get clickedSquare
      const clickedSquare = piece.position;

      //Get moveableSquares
      const moves = getChessMoves(
        piece,
        state[currentGame].boardLayout,
        occupiedMatrix,
        state[currentGame].lastMoved,
        "moves"
      );

      if (clickedSquare === state[currentGame].clickedSquare) {
        newDetails[currentGame].clickedSquare = null;
        newDetails[currentGame].moveables = [null, null];
      } else {
        newDetails[currentGame].clickedSquare = clickedSquare;
        newDetails[currentGame].moveables = moves;
      }
      return newDetails;
    }
    case "makeTurn": {
      //Get pieceId and final position of piece
      const [pieceId, moved] = getPieceIdandMoved();
      //Get side of moved piece
      const side = state[currentGame].currentSide;

      updateLastMoved();

      //Make move
      [
        newDetails[currentGame].boardLayout,
        newDetails[!currentGame].boardLayout,
      ] = V6ExecuteMove(
        action.move,
        state[currentGame].boardLayout,
        state[!currentGame].boardLayout,
        action.castling
      );

      //Add eaten pieces
      if (action.move.length > 2) {
        let piece = getPiece(action.move[2], state[currentGame].boardLayout);
        let side = !piece.side;
        newDetails[currentGame].eatenPieces.push([side, piece]);
      }

      //Add to previous board to identify loss by repetition(store a max of 6 and only for boards when its white's turn)
      updateRepetition();

      //Remove moveables
      newDetails[currentGame].moveables = [null, null];

      //Removed clickedSquare
      newDetails[currentGame].clickedSquare = null;

      //update status
      //Initialised occupiedMatrix
      const occupiedMatrix = getOccupiedMatrix(
        newDetails[currentGame].boardLayout
      );
      updateGameStatus(occupiedMatrix, currentGame);

      //Update status of other board if move is a capture move
      if (action.move.length > 2) {
        const occupiedMatrix2 = getOccupiedMatrix(
          newDetails[!currentGame].boardLayout
        );
        updateGameStatus(occupiedMatrix2, !currentGame);
      }
      //Check promotion
      //Promotion = [pieceId, piecePosition]
      if (getPiece(pieceId, newDetails[currentGame].boardLayout).type === "p") {
        if ((side === true && moved > 55) || (side === false && moved < 8)) {
          newDetails[currentGame].promotion = pieceId;
        }
      }

      //Change Side (only if no promotion)
      if (!newDetails[currentGame].promotion) {
        newDetails[currentGame].currentSide = !state[currentGame].currentSide;
        //Change game if move is by black
        const { checkmated, stalemated, repetition } = newDetails[currentGame];
        if (
          state[currentGame].currentSide === false &&
          !checkmated &&
          !stalemated &&
          !repetition
        ) {
          newDetails.currentGame = !state.currentGame;
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
        let movedFrom = getPiece(
          pieceId,
          state[currentGame].boardLayout
        ).position;
        newDetails[currentGame].lastMoved = [pieceId, movedFrom, moved];
      }

      function updateRepetition() {
        //Add new board
        const previousBoard = newDetails[currentGame].boardLayout.map(
          (piece) => {
            return {
              id: piece.id,
              position: piece.position,
              type: piece.type,
              side: piece.side,
            };
          }
        );
        newDetails[currentGame].previousBoards.push(previousBoard);
        //Remove oldest board if all 4 repetitions are done
        if (newDetails[currentGame].previousBoards.length > 9) {
          newDetails[currentGame].previousBoards.splice(0, 1);
        }
        //Check for loss by repetition
        if (newDetails[currentGame].previousBoards.length > 8) {
          const rep = JSON.stringify(newDetails[currentGame].previousBoards[8]);
          let repCount = 1;
          //Check rep 1
          for (let i = 4; i > -1; i -= 4) {
            if (
              JSON.stringify(newDetails[currentGame].previousBoards[i]) === rep
            ) {
              repCount++;
            }
          }
          //Check rep 2
          if (repCount === 3) {
            newDetails[currentGame].repetition = true;
          }
        }
      }
    }

    //move = [id of pawn, type of piece to promote]
    case "promotion": {
      //Find piece id for board1
      let pieceIndex;
      //Get index of piece on board1
      for (let i = 0; i < newDetails[currentGame].boardLayout.length; i++) {
        if (state[currentGame].boardLayout[i].id === action.move[0]) {
          pieceIndex = i;
          break;
        }
      }
      //update new pieces
      newDetails[currentGame].boardLayout[pieceIndex].type = action.move[1];

      //Find piece id for board2
      let pieceIndex2;
      //Get index of piece on board2
      for (let i = 0; i < newDetails[!currentGame].boardLayout.length; i++) {
        if (state[!currentGame].boardLayout[i].id === action.move[0]) {
          pieceIndex2 = i;
          break;
        }
      }

      //update new pieces
      newDetails[!currentGame].boardLayout[pieceIndex2].type = action.move[1];

      //remove promotion selection after selection is done
      newDetails[currentGame].promotion = null;

      //update status
      const occupiedMatrix = getOccupiedMatrix(
        newDetails[currentGame].boardLayout
      );

      updateGameStatus(occupiedMatrix, currentGame);

      //update status for second board
      const occupiedMatrix2 = getOccupiedMatrix(
        newDetails[!currentGame].boardLayout
      );

      updateGameStatus(occupiedMatrix2, !currentGame);

      //change side
      newDetails[currentGame].currentSide =
        !newDetails[currentGame].currentSide;

      //Change game if move is by black
      const { checkmated, stalemated, repetition } = newDetails[currentGame];
      if (
        state[currentGame].currentSide === false &&
        !checkmated &&
        !stalemated &&
        !repetition
      ) {
        newDetails.currentGame = !state.currentGame;
      }

      return newDetails;
    }

    case "restart": {
      newDetails = {
        currentGame: true,
        true: {
          boardLayout: action.boardLayout1,
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
        },

        false: {
          boardLayout: action.boardLayout2,
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
        },
      };
      return newDetails;
    }

    default:
      {
        throw new Error("type not specified");
      }

      function updateGameStatus(occupiedMatrix, currentGame) {
        updateChecks(occupiedMatrix, currentGame);
        updateStalemates(occupiedMatrix, currentGame);
        updateCheckmates(currentGame);
      }

      function updateChecks(occupiedMatrix, currentGame) {
        if (
          checkCheck(newDetails[currentGame].boardLayout, occupiedMatrix, false)
        ) {
          newDetails[currentGame].checked = 2;
        } else {
          newDetails[currentGame].checked = 0;
        }
        if (
          checkCheck(newDetails[currentGame].boardLayout, occupiedMatrix, true)
        ) {
          newDetails[currentGame].checked = 1;
        } else {
          newDetails[currentGame].checked = 0;
        }
      }

      function updateStalemates(occupiedMatrix, currentGame) {
        //Check stalemate for white
        //Check for valid moves of all pieces
        let whiteStalemated = true;
        for (const piece of newDetails[currentGame].boardLayout) {
          //Check for piece to be on white's side
          if (piece.side === true) {
            if (
              getChessMoves(
                piece,
                newDetails[currentGame].boardLayout,
                occupiedMatrix,
                newDetails[currentGame].lastMoved,
                "moves"
              )[0].length
            ) {
              whiteStalemated = false;
              break;
            }
          }
        }
        newDetails[currentGame].stalemated = 0;
        if (whiteStalemated) {
          newDetails[currentGame].stalemated = 1;
        }

        //Check stalemate for black
        //Check for valid moves of all pieces
        let blackStalemated = true;
        for (const piece of newDetails[currentGame].boardLayout) {
          //Check for piece to be on white's side
          if (piece.side === false) {
            if (
              getChessMoves(
                piece,
                newDetails[currentGame].boardLayout,
                occupiedMatrix,
                newDetails[currentGame].lastMoved,
                "moves"
              )[0].length
            ) {
              blackStalemated = false;
              break;
            }
          }
        }
        newDetails[currentGame].stalemated = 0;
        if (blackStalemated) {
          newDetails[currentGame].stalemated = 2;
        }
      }

      function updateCheckmates(currentGame) {
        if (
          newDetails[currentGame].checked === newDetails[currentGame].stalemated
        ) {
          newDetails[currentGame].checkmated = newDetails[currentGame].checked;
          //remove stalemate
          newDetails[currentGame].stalemated = 0;
        } else {
          newDetails[currentGame].checkmated = 0;
        }
      }
  }
}

export default V6ChessMovesReducer;
