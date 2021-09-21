function getPieceMap() {
  const pieces = ["p", "r", "n", "b", "q", "k"];
  let shuffledPieces = shuffle(pieces);
  const whiteMap = {
    p: shuffledPieces[0],
    r: shuffledPieces[1],
    n: shuffledPieces[2],
    b: shuffledPieces[3],
    q: shuffledPieces[4],
    k: shuffledPieces[5],
  };
  shuffledPieces = shuffle(pieces);
  const blackMap = {
    p: shuffledPieces[0],
    r: shuffledPieces[1],
    n: shuffledPieces[2],
    b: shuffledPieces[3],
    q: shuffledPieces[4],
    k: shuffledPieces[5],
  };
  return {
    true: whiteMap,
    false: blackMap,
  };
}

//Accepts an array and returns it shuffled
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default getPieceMap;
