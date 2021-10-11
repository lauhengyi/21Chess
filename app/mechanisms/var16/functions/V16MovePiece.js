import clone from "just-clone";

// returns a board with the move made:
// move = [eaterId, position, eatenId]
function V16MovePiece(move, board) {
  // Create version of board with theoretically moved piece
  // Copy new board
  let newBoard = clone(board);
  let id = move[0];
  for (let i = 0; i < newBoard.length; i++) {
    if (newBoard[i].id === id) {
      if (newBoard[i].perk === null) {
        defaultMove(move, i, newBoard);
      }
      break;
    }
  }

  return newBoard;
}

function defaultMove(move, index, board) {
  board[index].position = move[1];
  board[index].moved = true;

  // Can eat
  if (move.length > 2) {
    board.filter((piece) => piece.id != move[2]);
    board[index].level += 1;
  }
}

export default V16MovePiece;
