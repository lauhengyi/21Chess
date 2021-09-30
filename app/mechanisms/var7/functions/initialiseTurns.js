import getTurn from "./getTurn";
//Returns a array of booleans indicating the turns order
//Number of turns = 10
function initialiseTurns() {
  let turnsOrder = [];
  let turnBefore = true;
  for (let i = 0; i < 10; i++) {
    const turn = getTurn(turnBefore);
    turnsOrder.push(turn);
    turnBefore = turn;
  }
  return turnsOrder;
}

export default initialiseTurns;
