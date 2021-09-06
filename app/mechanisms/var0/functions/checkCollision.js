// function that returns a list, [boolean of whether position is occupied, boolean of side of piece occupying, pieceId]
function checkCollision(position, occupiedMatrix) {
  return occupiedMatrix[position];
}
export default checkCollision;
