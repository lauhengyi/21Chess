import clone from "just-clone";
import callError from "./callError";

function pieceChooserReducer(state, action) {
  const details = clone(state);
  switch (action.type) {
    case "click": {
      //Check if piece is not already all used
      if (action.side === true) {
        if (state.whiteLeft[action.pieceType] === 0) {
          callError("That piece is all already on the board");
          return details;
        }
      } else {
        if (state.blackLeft[action.pieceType] === 0) {
          callError("That piece is all already on the board");
          return details;
        }
      }

      //Check if a piece already occupies that spot on the board
      for (let piece of details.boardLayout) {
        if (piece.position === action.position) {
          callError("A piece already occupies that position");
          return details;
        }
      }

      //Place piece on board
      details.boardLayout.push({
        id: makeRandomId(),
        position: action.position,
        type: action.type,
        side: action.side,
        moved: false,
      });
      function makeRandomId() {
        return Math.floor(Math.random() * 100000);
      }

      //Update left
      if (action.side === true) {
        details.whiteLeft[action.type] -= 1;
      } else {
        details.blackLeft[action.type] -= 1;
      }
      return details;
    }

    case "submit": {
    }
  }
}

export default pieceChooserReducer;
