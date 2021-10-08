export default function getRevenue(boardLayout, side) {
  let revenue = 0;
  for (const piece of boardLayout) {
    revenue += getMoney(piece);
  }
  return revenue;
}

function getMoney(piece) {
  switch (piece.type) {
    case "p":
      return 1;
    case "r":
      return 5;
    case "n":
      return 3;
    case "b":
      return 3;
    case "q":
      return 10;
    case "k":
      return 0;
  }
}
