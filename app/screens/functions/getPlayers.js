//return [player, opponent]
function getPlayers(position, options, currentSide) {
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

  return [player, opponent];
}

export default getPlayers;
