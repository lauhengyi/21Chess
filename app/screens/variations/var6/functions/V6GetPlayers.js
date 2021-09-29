//return [player, opponent]
function V6GetPlayers(position, options, currentSide, currentGame) {
  //Create Player and Opponent
  //Player will switch if autoturn is on
  let player;
  let opponent;
  if (position === "bottom") {
    player = [1, options.startingSide];
    opponent = [2, !options.startingSide];
  } else {
    player = [2, !options.startingSide];
    opponent = [1, options.startingSide];
  }

  //Player and opponent switches if autoturn is on
  if (options.isAutoturn) {
    if (currentSide !== options.startingSide) {
      const temp = opponent;
      opponent = player;
      player = temp;
    }
  }

  //If its the under game, then the sides changes
  if (currentGame === false) {
    opponent[1] = !opponent[1];
    player[1] = !player[1];
  }

  return [player, opponent];
}

export default V6GetPlayers;
