function clearStunned(side, board) {
  for (let i = 0; i < board.length; i++) {
    const piece = board[i];
    if (piece.side === side) {
      board[i].stunned = false;
    }
  }
}

export default clearStunned;
