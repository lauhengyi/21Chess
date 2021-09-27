import getHighlighted from "./getHighlighted";

//Create a random board that fits within the rules of making a board
function makeBoard(choosingDetails, choosingActions) {
  //Make an array of 64 of whether a position is occupied or not
  let occupiedMatrix = [];
  for (let i = 0; i < 64; i++) {
    occupiedMatrix.push(false);
  }

  //Make king and highlighted pieces
  //Choosing position of king
  let kingPosition = Math.floor(Math.random() * 16);
  kingPosition = choosingDetails.side ? kingPosition : kingPosition + 32;
  choosingActions({
    type: "click",
    position: kingPosition,
    pieceType: "k",
  });
  occupiedMatrix[kingPosition] = true;

  //Randomize highlighted pieces
  const pieceList = [
    "p",
    "p",
    "p",
    "p",
    "p",
    "p",
    "p",
    "p",
    "r",
    "r",
    "n",
    "n",
    "b",
    "b",
    "q",
  ];

  const randomizedPieceList = shuffle(pieceList);
  const highlighted = getHighlighted(kingPosition, choosingDetails.side);
  for (let i = 0; i < highlighted.length; i++) {
    const position = highlighted[i];
    const pieceType = randomizedPieceList.pop();
    occupiedMatrix[highlighted[i]] = true;
    choosingActions({
      type: "click",
      position: position,
      pieceType: pieceType,
    });
  }

  //Add rest of pieces
  while (randomizedPieceList.length != 0) {
    let randomPos = Math.floor(Math.random() * 24);
    randomPos = choosingDetails.side ? randomPos : randomPos + 32;
    console.log({ randomPos });
    //Make sure not already occupied;
    if (!occupiedMatrix[randomPos]) {
      occupiedMatrix[randomPos] = true;
      const pieceType = randomizedPieceList.pop();
      choosingActions({
        type: "click",
        position: randomPos,
        pieceType: pieceType,
      });
    }
  }

  //Submit
  choosingActions({
    type: "submit",
  });
}

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

export default makeBoard;
