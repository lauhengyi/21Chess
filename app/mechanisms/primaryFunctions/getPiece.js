function getPiece(id, board) {
  return board.find((piece) => piece.id === id);
}

export default getPiece;
