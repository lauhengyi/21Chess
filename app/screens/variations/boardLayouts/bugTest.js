export default [
  // Position refers to the position of the piece on the board
  // Type refers to the type of piece on the board:
  // p = pawn, r = rook, n = knight, b = bishop, q = queen, k = king
  // Side refers to the color of the pieces. true = white, false = black
  // Moved refers to whether a piece has been moved or not.
  {
    id: 0,
    position: 4,
    type: "b",
    side: false,
    moved: false,
  },

  {
    id: 1,
    position: 14,
    type: "k",
    side: true,
    moved: false,
  },

  {
    id: 2,
    position: 21,
    type: "p",
    side: true,
    moved: true,
  },

  {
    id: 3,
    position: 24,
    type: "p",
    side: true,
    moved: true,
  },

  {
    id: 4,
    position: 28,
    type: "b",
    side: true,
    moved: false,
  },

  {
    id: 5,
    position: 32,
    type: "p",
    side: false,
    moved: true,
  },

  {
    id: 6,
    position: 32,
    type: "p",
    side: false,
    moved: true,
  },

  {
    id: 7,
    position: 36,
    type: "k",
    side: false,
    moved: false,
  },

  {
    id: 8,
    position: 45,
    type: "n",
    side: false,
    moved: false,
  },

  {
    id: 9,
    position: 62,
    type: "b",
    side: false,
    moved: false,
  },
];
