import getOccupiedMatrix from "../../primaryFunctions/getOccupiedMatrix";
import accountClearSquares from "./accountClearSquares";

//Makes an array of 64 with a tuple of [whether bomb on board, whether cleared]
export default function makeMineMatrix(boardLayout) {
  const occupiedMatrix = getOccupiedMatrix(boardLayout);
  const numMines = 7 + Math.floor(Math.random() * 4);
  //Initialise minePositions and matrix
  let minePositions = [];
  let matrix = [];
  for (let i = 0; i < 64; i++) {
    if (occupiedMatrix[i][0]) {
      matrix.push([false, true]);
    } else {
      minePositions.push(i);
      matrix.push([false, false]);
    }
  }

  //Get randomized position
  for (let i = 0; i < numMines; i++) {
    const random = Math.floor(Math.random() * minePositions.length);
    //Swap the elements from index[i] and index[random]
    const temp = minePositions[i];
    minePositions[i] = minePositions[random];
    minePositions[random] = temp;
  }

  //Add mines to the first {numMines} elements to the position
  for (let i = 0; i < numMines; i++) {
    const minePosition = minePositions[i];
    matrix[minePosition][0] = true;
  }

  //Clear consecutive clear squares
  for (const piece of boardLayout) {
    accountClearSquares(matrix, piece.position);
  }

  return matrix;
}
