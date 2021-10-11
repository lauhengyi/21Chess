//Function that returns an array of 64 and each element of that array is a boolean of whether that indexed position on the board is occupied
function getOccupiedMatrix(board) {
  //Initialise matrix
  let matrix = [];
  for (let i = 0; i < 64; i++) {
    matrix.push([false, null, null]);
  }
  //Turns true if occupied
  for (let piece of board) {
    if (piece.age !== undefined) {
      //For Var 11
      matrix[piece.position] = [true, piece.side, piece.id, piece.age];
    } else if (piece.stacked !== undefined) {
      //For Var 14
      matrix[piece.position] = [
        true,
        piece.side,
        piece.id,
        piece.stacked,
        piece.type,
      ];
    } else if (piece.perk !== undefined) {
      //For Var 16
      matrix[piece.position] = [true, piece.side, piece.id, piece.level];
    } else {
      matrix[piece.position] = [true, piece.side, piece.id];
    }
  }
  return matrix;
}
export default getOccupiedMatrix;
