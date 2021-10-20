import getEmptyAdjacentPos from "./getEmptyAdjacentPos";

//Return null if not suppose to have number or if its a mine
export default function getSquareNumber(position, mineMatrix) {
  //Return null if not cleared
  if (mineMatrix[position][1] === false || mineMatrix[position][0]) {
    return null;
  }

  const positions = getEmptyAdjacentPos(position, mineMatrix);
  return 8 - positions.length;
}
