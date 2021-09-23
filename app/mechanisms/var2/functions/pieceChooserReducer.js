import clone from "just-clone";
import callError from "./callError";

function pieceChooserReducer(state, action) {
  const details = clone(state);
  switch (action.type) {
    case "click": {
      //Check if piece is not already all used
      if (action.side === true) {
        if (state.whiteLeft[action.pieceType] === 0) {
          callError("That piece is all already on the board", details);
          return details;
        }
      } else {
        if (state.blackLeft[action.pieceType] === 0) {
          callError("That piece is all already on the board", details);
          return details;
        }
      }

      //Check if a piece already occupies that spot on the board
      for (let piece of details.boardLayout) {
        if (piece.position === action.position) {
          callError("A piece already occupies that position", details);
          return details;
        }
      }

      //Check if its a king placed on the 3rd row of the board
      if (action.type === "k") {
        if (action.side) {
          if (action.position > 15 && action.position < 24) {
            callError("The King cannot be on the furthest row", details);
            return details;
          }
        } else {
          if (action.position > 39 && action.position < 48) {
            callError("The King cannot be on the furthest row", details);
            return details;
          }
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

      //Update highlights if king is placed
      if (action.type === "k") {
        let front;
        let leftD;
        let rightD;
        if (action.side) {
          front = action.position + 8;
          leftD = action.position + 7;
          rightD = action.position + 9;
        } else {
          front = action.position - 8;
          leftD = action.position - 9;
          rightD = action.position - 7;
        }
        //Add highlights
        details.highlighted.push(front);

        //Add left highlights
        if (!((action.position + 8) % 8 === 0)) {
          details.highlighted.push(leftD);
        }

        //Add right highlights
        if (!((action.position + 9) % 8 === 0)) {
          details.highlighted.push(rightD);
        }
      }

      return details;
    }

    case "delete":
      {
        //Check whether square is empty
        let occupied = false;
        for (let piece of state.boardLayout) {
          if (piece.position === action.position) {
            occupied = true;
          }
        }
        if (occupied === false) {
          callError("Square is already empty", details);
          return details;
        }

        //Delete piece
        //Get index
        let index;
        let type;
        for (let i; i < state.boardLayout.length; i++) {
          if (state.boardLayout[i].position === action.position) {
            index = i;
            type = state.boardLayout[i].type;
            break;
          }
        }
        details.boardLayout.splice(index, 1);
      }

      //Remove highlighted if king removed
      if (type === "k") {
        details.highlighted = [];
      }

      //Add back to count
      if (details.side) {
        details.whiteLeft[type] += 1;
      } else {
        details.blackLeft[type] += 1;
      }

      return details;

    case "submit": {
    }
  }
}

export default pieceChooserReducer;
