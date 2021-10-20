import accountClearSquares from "./accountClearSquares";
import accountExplosion from "./accountExplosion";

export default function updateMineMatrix(newDetails, move) {
  //Clear square in matrix
  newDetails.mineMatrix[move[1]][1] = true;

  //If surrounding squares are clear, then clear them as well
  accountClearSquares(newDetails, move[1]);

  accountExplosion(newDetails, move);
}
