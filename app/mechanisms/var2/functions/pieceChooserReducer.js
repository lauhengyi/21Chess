import clone from "just-clone";

function pieceChooserReducer(state, action) {
  const details = clone(state);
  switch (action.type) {
    case "click": {
      //Check if something is selected
      if (action.type === null) {
        details.error = "Select something before clicking a square";
        return details;
      }

      //Check if piece is placed on the forth row
      else if (action.position > 23 && action.position < 40) {
        details.error = "Pieces can only be placed up to the third row";
        return details;
      }

      //Check if piece is not already all used
      else if (state.side === true) {
        if (state.whiteLeft[action.pieceType] === 0) {
          details.error = "That piece is all already on the board";
          return details;
        }
      } else {
        if (state.blackLeft[action.pieceType] === 0) {
          details.error = "That piece is all already on the board";
          return details;
        }
      }

      //Check if a piece already occupies that spot on the board
      for (let piece of details.boardLayout) {
        if (piece.position === action.position) {
          details.error = "A piece already occupies that position";
          return details;
        }
      }

      //Check if its a king placed on the 3rd row of the board
      if (action.pieceType === "k") {
        if (state.side) {
          if (action.position > 15) {
            details.error = "The King cannot be on the furthest row";
            return details;
          }
        } else {
          if (action.position < 48) {
            details.error = "The King cannot be on the furthest row";
            return details;
          }
        }
      }

      //Place piece on board
      details.boardLayout.push({
        id: makeRandomId(),
        position: action.position,
        type: action.pieceType,
        side: state.side,
        moved: false,
      });
      function makeRandomId() {
        return Math.floor(Math.random() * 100000);
      }

      //Update left
      if (state.side === true) {
        details.whiteLeft[action.pieceType] -= 1;
      } else {
        details.blackLeft[action.pieceType] -= 1;
      }

      //Update highlights if king is placed
      if (action.pieceType === "k") {
        let front;
        let leftD;
        let rightD;
        if (state.side) {
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

    case "delete": {
      //Check whether square is empty
      let occupied = false;
      for (let piece of state.boardLayout) {
        if (piece.position === action.position) {
          occupied = true;
        }
      }
      if (occupied === false) {
        details.error = "Square is already empty";
        return details;
      }

      //Delete piece
      //Get index
      let index;
      let pieceType;
      for (let i = 0; i < details.boardLayout.length; i++) {
        if (details.boardLayout[i].position === action.position) {
          index = i;
          pieceType = state.boardLayout[i].type;
          break;
        }
      }
      details.boardLayout.splice(index, 1);

      //Remove highlighted if king removed
      if (pieceType === "k") {
        details.highlighted = [];
      }

      //Add back to count
      if (state.side) {
        details.whiteLeft[pieceType] += 1;
      } else {
        details.blackLeft[pieceType] += 1;
      }

      return details;
    }

    case "submit": {
      //Check for all pieces being used up
      const typeList = ["p", "r", "n", "b", "q", "k"];
      let piecesLeft;
      if (state.side) {
        piecesLeft = state.whiteLeft;
      } else {
        piecesLeft = state.blackLeft;
      }
      for (let type of typeList) {
        if (piecesLeft[type] !== 0) {
          details.error = "Not all the pieces are on the board";
          return details;
        }
      }

      //Check whetber the all the highlighted spots on the king is occupied
      let highlightedOccupied = 0;
      for (const highlight of state.highlighted) {
        for (const piece of state.boardLayout) {
          if (piece.position === highlight) {
            highlightedOccupied += 1;
          }
        }
      }
      if (highlightedOccupied !== state.highlighted.length) {
        details.error =
          "All the highlighted pieces on the board must be occupied";
        return details;
      }

      //Submit
      //Change side
      if (state.side) {
        //If white finished selecting, change side and remove highlighted
        details.side = false;
        details.highlighted = [];
      } else {
        //If black is finished, turn completed to true.
        details.completed = true;
      }

      return details;
    }

    case "clearError": {
      details.error = "";
      return details;
    }
  }
}

export default pieceChooserReducer;
