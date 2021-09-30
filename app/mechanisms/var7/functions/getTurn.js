//Get the next turn, depending on the previous few moves to minimize too many simultaneous moves
//Each simultaneous move before halfs the change that the next move will be the same as before
function getTurn(turnBefore) {
  const strictIndex = 0.8;
  if (turnBefore) {
    return Math.random() > strictIndex;
  } else {
    return Math.random() < strictIndex;
  }
}

export default getTurn;
