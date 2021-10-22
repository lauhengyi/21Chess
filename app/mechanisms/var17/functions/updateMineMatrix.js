import accountClearSquares from "./accountClearSquares";
import accountExplosion from "./accountExplosion";

export default function updateMineMatrix(newDetails, move, castling) {
  //Clear square in matrix
  if (castling) {
    newDetails.mineMatrix[move[0][1]][1] = true;
    newDetails.mineMatrix[move[1][1]][1] = true;
  } else {
    newDetails.mineMatrix[move[1]][1] = true;
  }

  //If surrounding squares are clear, then clear them as well
  if (castling) {
    accountClearSquares(newDetails.mineMatrix, move[0][1]);
    accountClearSquares(newDetails.mineMatrix, move[1][1]);
  } else {
    accountClearSquares(newDetails.mineMatrix, move[1]);
  }

  if (castling) {
    accountExplosion(newDetails, move[0]);
    accountExplosion(newDetails, move[1]);
  } else {
    accountExplosion(newDetails, move);
  }
}
