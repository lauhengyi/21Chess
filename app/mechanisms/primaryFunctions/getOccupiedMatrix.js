//Function that returns an array of 64 and each element of that array is a boolean of whether that indexed position on the board is occupied
function getOccupiedMatrix(board) {
  //Initialise matrix
  let matrix = [];
  for (let i = 0; i < 64; i++) {
    matrix.push([false, null, null]);
  }
  //Turns true if occupied
  for (let piece of board) {
    //For Var 11
    if (piece.age !== undefined) {
      matrix[piece.position] = [true, piece.side, piece.id, piece.age];
    } else {
      matrix[piece.position] = [true, piece.side, piece.id];
    }
  }
  return matrix;
}
export default getOccupiedMatrix;
