import executeMove from "../../var0/functions/executeMove.js";
import checkCheck from "../../var0/functions/checkCheck.js";
import getPiece from "../../primaryFunctions/getPiece.js";
import getChessMoves from "../../var0/getChessMoves.js";
import clone from "just-clone";
import getOccupiedMatrix from "../../primaryFunctions/getOccupiedMatrix.js";
import getPrice from "./getPrice.js";
import getRevenue from "./getRevenue.js";
import getOrders from "./getOrders.js";

function V15ChessMovesReducer(state, action) {
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
      const moves = getChessMoves(
        piece,
        state.boardLayout,
        occupiedMatrix,
        state.lastMoved,
        "moves"
      );

      //Remove orders
      newDetails.orders = [];

      //Remove clicked orders
      newDetails.clickedOrder = null;

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
      if (getPiece(pieceId, newDetails.boardLayout).type === "p") {
        if ((side === true && moved > 55) || (side === false && moved < 8)) {
          newDetails.promotion = pieceId;
        }
      }

      //Change Side (only if no promotion)
      if (!newDetails.promotion) {
        //Add money (to opposite side after making a move)
        if (state.currentSide) {
          newDetails.blackMoney += getRevenue(
            newDetails.boardLayout,
            !state.currentSide
          );
        } else {
          newDetails.whiteMoney += getRevenue(
            newDetails.boardLayout,
            !state.currentSide
          );
        }
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
      //Get index of piece on board
      for (let i = 0; i < newDetails.boardLayout.length; i++) {
        if (state.boardLayout[i].id === action.move[0]) {
          pieceIndex = i;
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

      //Add money (to opposite side after making a move)
      if (state.currentSide) {
        newDetails.blackMoney += getRevenue(
          newDetails.boardLayout,
          !state.currentSide
        );
      } else {
        newDetails.whiteMoney += getRevenue(
          newDetails.boardLayout,
          !state.currentSide
        );
      }

      //change side
      newDetails.currentSide = !newDetails.currentSide;

      return newDetails;
    }

    case "order": {
      //Make a list of moves of purchases
      //Remove order if clicked again
      if (state.clickedOrder === action.pieceType) {
        newDetails.clickedOrder = null;
        newDetails.orders = [];
        return newDetails;
      }
      newDetails.orders = getOrders(state, action.pieceType);

      //Remove moveables and clickedSquare
      newDetails.moveables = [];
      newDetails.clickedSquare = null;

      //Add clicked
      newDetails.clickedOrder = action.pieceType;

      return newDetails;
    }

    case "purchase": {
      //Make the order
      //Deduct money
      if (state.currentSide) {
        newDetails.whiteMoney -= getPrice(action.order[1]);
      } else {
        newDetails.blackMoney -= getPrice(action.order[1]);
      }
      //Add piece
      const id = Math.floor(Math.random() * 10000);
      const piece = {
        id: id,
        position: action.order[0],
        type: action.order[1],
        side: state.currentSide,
        moved: false,
      };
      newDetails.boardLayout.push(piece);

      //Remove rest of orders
      newDetails.orders = [];

      //Remove Clicked
      newDetails.clickedOrder = null;

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
        previousBoards: [],
        checked: 0,
        stalemated: 0,
        checkmated: 0,
        repetition: false,
        promotion: null,
        orders: [],
        whiteMoney: 30,
        blackMoney: 30,
        clickedOrder: null,
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
          for (const piece of newDetails.boardLayout) {
            //Check for piece to be on white's side
            if (piece.side === true) {
              if (
                getChessMoves(
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
                getChessMoves(
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

export default V15ChessMovesReducer;
