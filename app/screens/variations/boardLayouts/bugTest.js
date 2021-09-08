export default [
  // Position refers to the position of the piece on the board
  // Type refers to the type of piece on the board:
  // p = pawn, r = rook, n = knight, b = bishop, q = queen, k = king
  // Side refers to the color of the pieces. true = white, false = black
  // Moved refers to whether a piece has been moved or not.
  {
    id: 0,
    position: 0,
    type: "k",
    side: true,
    moved: false,
  },

  {
    id: 1,
    position: 10,
    type: "p",
    side: false,
    moved: true,
  },

  {
    id: 2,
    position: 48,
    type: "k",
    side: false,
    moved: true,
  },
];
