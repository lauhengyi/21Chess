// function that returns a list, [boolean of whether position is occupied, boolean of side of piece occupying, pieceId]
function checkCollision(position, board) {
  for (let piece of board) {
    if (piece.position === position) {
      return [true, piece.side, piece.id];
    }
  }
  return [false, null, null];
}

export default checkCollision;
