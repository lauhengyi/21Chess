function getPiece(id, board) {
  for (let piece of board) {
    if (piece.id === id) {
      return piece;
    }
  }
}

export default getPiece;
