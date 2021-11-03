import checkCollision from "../../var0/functions/checkCollision";
//function that when given position of move, side of piece, and list of previously compiled moves,
//Last parameter, AorD, refers to whether accounting attacked squares, or checking defended squares, true for attack, false for defend
//will return [updated moves, whether the position is collided]
export default function accountCollidedPiece(
  position,
  piece,
  moves,
  occupiedMatrix,
  AorD
) {
  const [collided, collidedSide, eatenId] = checkCollision(
    position,
    occupiedMatrix
  );
  if (AorD === true) {
    if (collided) {
      if (piece.side === collidedSide) {
        return [moves, true];
      } else {
        moves.push([piece.id, position, eatenId]);
        return [moves, true];
      }
    } else {
      moves.push([piece.id, position]);
      return [moves, false];
    }
  } else {
    if (collided) {
      moves.push([piece.id, position, eatenId]);
      return [moves, true];
    } else {
      moves.push([piece.id, position]);
      return [moves, false];
    }
  }
}
