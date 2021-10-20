export default function accountExplosion(newDetails, move) {
  //Check if landed on mine
  if (newDetails.mineMatrix[move[1]][1]) {
    //Remove piece from board
    newDetails.boardLayout = newDetails.boardLayout.filter(
      (piece) => piece.id !== move[0]
    );

    //Remove mine from matrix
    newDetails.mineMatrix[move[1]] = [false, true];
  }
}
