import bugTest from "../../screens/variations/boardLayouts/bugTest.js";
import { validMoves } from "../var0/getChessMoves.js";
import getOccupiedMatrix from "./getOccupiedMatrix.js";
function test() {
  const occupiedMatrix = getOccupiedMatrix(bugTest);
  for (let piece of bugTest) {
    const moves = validMoves(piece, bugTest, occupiedMatrix, [null]);
    console.log({ piece, moves });
  }
}

test();
