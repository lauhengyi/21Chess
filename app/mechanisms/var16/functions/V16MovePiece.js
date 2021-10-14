import clone from "just-clone";

// returns a board with the move made:
// move = [eaterId, position, eatenId]
function V16MovePiece(move, board) {
  // Create version of board with theoretically moved piece
  // Copy new board
  let id = move[0];
  for (let i = 0; i < board.length; i++) {
    if (board[i].id === id) {
      if (board[i].perk !== "c" && board[i].perk !== "d") {
        return defaultMove(move, i, board);
      } else if (board[i].perk === "d") {
        return decapitatorMove(move, i, board);
      } else if (board[i].perk === "c") {
        return clonerMove(move, i, board);
      }
    }
  }
}

function defaultMove(move, index, board) {
  let newBoard = clone(board);
  newBoard[index].position = move[1];
  newBoard[index].moved = true;

  // Can eat
  if (move.length > 2) {
    newBoard[index].level += 1;
    newBoard = newBoard.filter((piece) => piece.id != move[2]);
  }
  return newBoard;
}

function decapitatorMove(move, index, board) {
  let newBoard = clone(board);
  let newMove = clone(move);
  newBoard[index].position = move[1];
  newBoard[index].moved = true;

  // Can eat
  if (move.length > 2) {
    //Reset centre
    newBoard[index].perk = null;
    newBoard[index].level = 0;

    //Remove pieces
    const eatenList = newMove.splice(2, move.length - 2);
    newBoard = newBoard.filter((piece) => !eatenList.includes(piece.id));
  }
  return newBoard;
}

function clonerMove(move, index, board) {
  let newBoard = clone(board);
  //Piece before cloning
  let piece = clone(newBoard[index]);
  newBoard[index].position = move[1];
  newBoard[index].moved = true;
  newBoard[index].level = 0;
  newBoard[index].perk = null;

  // Can eat
  if (move.length > 2) {
    newBoard[index].level += 1;
    newBoard = newBoard.filter((piece) => piece.id != move[2]);
  }

  const pieceId = Math.floor(Math.random() * 10000);
  newBoard.push({ ...piece, id: pieceId, level: 0, perk: null });
  return newBoard;
}

export default V16MovePiece;
