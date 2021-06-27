const initialState = [
]

function reducer(state, action) {
  piece = state[action.id];
  newBoard = Object.assign({}, state);
  newBoard[id] = {
    position: action.people,
    type: piece.type,
    move: false,
    side: piece.side,                
  };
  return newBoard;
};

//returns list of valid moves a piece can make with consideration of pinning
function validMoves(id) {
  //get moveable moves
  let moves = moveableMoves(boardLayout[id]);
  //Check whether move is pinned
  let result = [];
  for (let move in moves) {
    if (checkPin(id, move) == false) {
      result.push(move)
    };
  };
};

//returns list of positions that a piece can move without consideration of pinning
function moveableMoves(piece) {
  switch (piece.type) {
  case 'p':
    return pawnMoves(piece, boardLayout);
    break;
      
  case 'r':
    return rookMoves(piece, boardLayout);
    break;
      
  case 'n':
    return knightMoves(piece, boardLayout);
    break;
      
  case 'b':
    return bishopMoves(piece, boardLayout);
    break;
      
  case 'q':
    return queenMoves(piece, boardLayout);
    break;
      
  case 'k':
    return kingMoves(piece, boardLayout);
    break;
      
  default:
    throw new Error('Unknown type: ${piece.type}')
      
  };
};

//returns whether pieces will be pinned when moved
function checkPin(id, position) {
  // Create version of board with theoretically moved piece  
  newBoard = Object.assign({},boardLayout);
  newBoard[id] = {
    position: position,
    type: boardLayout[id].type,
    side: boardLayout[id].side,
    moved: true,
  };
  // move is pinned if new board is checked
  return checkChecked(newBoard, boardLayout[id].side);
  
};

// Check whether a board is checked
function checkCheck(board, side) {
  
  positions = [];
  
  // Compile list of positions where enemies attacks
  for (let piece of board) {
    // Isolate enemy pieces
    if (piece.side == !side) {
      positions.concat(attackedPostions(piece, board));
    };
  };
  
  // Find king's position
  let kingPos = 0;
  for (let piece of board) {
    
    if (piece.type == 'k' && piece.side == side) {
      kingPos = piece.position
    };
  };
  
  // Make sure the king's position is not under attack
  for (let position of positions) {
    if (kingPos == position) {
      return true;
    };
  };
  return false;
  
  // return positions where the piece attacks without consideration for pinning
  // ignore positions where there is an occupied piece, regardless of enemy or ally
  function attackedPositions(piece, board) {      
       
    switch (piece.type) {
    case 'p':
      return pawnAttacks(piece);
      break;
      
    case 'r':
      return rookMoves(piece, board);
      break;
      
    case 'n':
      return knightMoves(piece, board);
      break;
      
    case 'b':
      return bishopMoves(piece, board);
      break;
      
    case 'q':
      return queenMoves(piece, board);
      break;
      
    case 'k':
      return kingMoves(piece, board);
      break;
      
    default:
      throw new Error('Unknown type: ${piece.type}')
      
    };
  };
};

//returns a list of positions that the pawn can move and attack
function pawnMoves(piece, board) {
  //check for pawn
  if (piece.type != 'p') {
    throw new Error('input piece not pawn');
  };
  
  //get attack moves
  let Amoves = pawnAttacks(piece);
  //update attacks to only when there is an enemy
  let positions = [];
  for (let move of Amoves) {
    for (let otherPiece of board) {
      if ((move == otherPiece.position) && (otherPiece.side != piece.side)) {
        positions.push(move);
      };
    };
  };
  
  //compile forward movement (include double movement if pawn is untouched)
  let moves = [];
  if (pieces.moved == false) {
    //differentiate between white and black
    if (piece.side) {
      //piece is white
      moves.push(piece.position + 8, piece.position + 16);
    } else {
      //piece is black
      moves.push(piece.position - 8, piece.position - 16);
    };
  } else {
    //differentiate between white and black
    if (piece.side) {
      //piece is white
      moves.push(piece.position + 8);
    } else {
      //piece is black
      moves.push(piece.position - 8);
    };
  };
  
  for (let move of moves) {
    for (otherPieces of board) {
      if (move == otherPieces.position) {
        break;
      }; 
    };
    positions.push(move);
  };
  return positions;
};

//returns a list of positions that the pawn can attack, regardless of enemies and without accounting for pinning
function pawnAttacks(piece) {
  //check for pawn
  if (piece.type != 'p') {
    throw new Error('input piece not pawn');
  };
  // Need to differentiate from white and black due to assymetrical movement of pawns
  if (piece.side == true) {
    //pawn is white
    //consider edge cases
    //consider extreme left and extreme right respectively
    if ((piece.position + 8) % 8 == 0) {
      return [piece.position + 9];
    } else if ((piece.position + 9) % 8 == 0) {
      return [piece.position + 7]
    } else {
      return [piece.position + 7, piece.position + 9]
    };
  } else {
    //pawn is black
    //consider edge cases
    //consider extreme left and extreme right respectively
    if ((piece.position + 8) % 8 == 0) {
      return [piece.position - 7];
    } else if ((piece.position + 9) % 8 == 0) {
      return [piece.position - 9]
    } else {
      return [piece.position - 9, piece.position - 7]
    };
  };
};

//returns a list of positions that the rook can attack, without accounting for pinning
function rookMoves(piece, board) {
  
  //check for rook
  if (piece.type != 'r') {
    throw new Error('input piece not rook');
  }
  let up = [];
  let down = [];
  let left = [];
  let right = [];
  
  //Find up
  for (let i=piece.position + 8; i < 64; i + 8) {
    // Check for pieces blocking
    for (let otherPiece of board) {
      if (otherPiece.position == i) {
        // Check for enemy or ally
        if (otherPiece.side == piece.side) {
          break;
        } else {
          //enemy can be eaten
          up.push(i);
          break;
        };
      };
    };
    //add to up
    up.push();
  };
  
  //Find down
  for (let i=piece.position - 8; i < 0; i - 8) {
    // Check for pieces blocking
    for (let otherPiece of board) {
      if (otherPiece.position == i) {
        // Check for enemy or ally
        if (otherPiece.side == piece.side) {
          break;
        } else {
          //enemy can be eaten
          down.push(i);
          break;
        };
      };
    };
    //add to down
    down.push();
  }
  
  //find left
  let i = piece.position;
  while (true) {
    //Check for extreme left
    if ((i + 8) % 8 == 0) {
      break;
    };
    
    i--;
    
    //Check for blocking pieces
    for (let otherPiece of board) {
      if (otherPiece.position == i) {
        // Check for enemy or ally
        if (otherPiece.side == piece.side) {
          break;
        } else {
          //enemy can be eaten
          left.push(i);
          break;
        };
      };
    };
    
    //add to left
    left.push(i);
  };
  
  //find right
  i = piece.position;
  while (true) {
    //Check for extreme right
    if ((i + 9) % 8 == 0) {
      break;
    };
    
    i++;
    
    //Check for blocking pieces
    for (let otherPiece of board) {
      if (otherPiece.position == i) {
        // Check for enemy or ally
        if (otherPiece.side == piece.side) {
          break;
        } else {
          //enemy can be eaten
          right.push(i);
          break;
        };
      };
    };
    
    //add to right
    right.push(i);
  };
  
  //add directions together
  return (up.concat(down, left, right));
};

//returns a list of positions that the knight can attack, without considering pinning
function knightMoves(piece, board) {
  //check if piece is knight
  if (piece.type != 'n') {
    throw new Error('input piece is not knight');
  };
  
  // consider all eight possible moves:
  // ul, ur. dl, dr, lu, ld, ru, rd
  let ul = piece.position + 15;
  let ur = piece.position + 17;
  let dl = piece.position - 17;
  let dr = piece.position - 15;
  let lu = piece.position + 6;
  let ld = piece.position - 10;
  let ru = piece.position + 10;
  let rd = piece.position - 6;
  
  // compile moves before accounting for positions blocked by allies
  // consider edge cases (2 represents 2 squares from edge)
  let topEdge2 = false;
  let bottomEdge2 = false;
  let leftEdge2 = false;
  let rightEdge2 = false;
  let topEdge = false;
  let bottomEdge = false;
  let leftEdge = false;
  let rightEdge = false;
  
  // consider top and bottom edge respectively (2 square buffer)
  if (piece.position > 47) {
    topEdge2 = true;
    //consider 1 square edge
    if (piece.position > 55) {
      topEdge = true;
    };
  } else if (piece.position < 16) {
    bottomEdge2 = true;
    if (piece.position < 8) {
      bottomEdge = true;
    }
  };
  
  // consider left and right edges respectively (2 square buffer)
  if ((piece.position + 8) % 8 == 0) {
    leftEdge = true;
  };
  
  if ((piece.position + 7) % 8 == 0) {
    leftEdge2 = true;
  };
  
  if ((piece.position + 9) % 8 == 0) {
    rightEdge = true;
  };
  
  if ((piece.position + 10) % 8 == 0) {
    leftEdge2 = true;
  };
  
  // adding relevant moves depending on the pieces edge cases
  let moves = []
  
  // consider up moves
  if (topEdge2 == false) {
    if (leftEdge == false) {
      moves.push(ul);
    };
    if (rightEdge == false) {
      moves.push(ur);
    };
  };
  
  // consider down moves
  if (downEdge2 == false) {
    if (leftEdge == false) {
      moves.push(dl);
    };
    if (rightEdge == false) {
      moves.push(dr);
    };
  };
  
  // consider left moves
  if (leftEdge2 == false) {
    if (upEdge == false) {
      moves.push(lu);
    };
    if (downEdge == false) {
      moves.push(ld);
    };
  };

  // consider right moves
  if (rightEdge2 == false) {
    if (upEdge == false) {
      moves.push(ru);
    };
    if (downEdge == false) {
      moves.push(rd);
    };
  };
  
  //update positions which is moves - positions when knight is blocked by ally
  positions = [];
  for (let move of moves) {
    for (let otherPiece of board) {
      if ((otherPiece.position == move) && (otherPiece.side == piece.side)) {
        break;
      };
    };
    positions.push(move);
  };
};

//returns a list of positions that a bishop can attack without considering pinning
function bishopMoves(piece, board) {
  
  //check for bishop
  if (piece.type != 'b') {
    throw new Error('input piece not bishop');
  }
  let northE = [];
  let southW = [];
  let northW = [];
  let southE = [];
  
  //find northE
  let i = piece.position;
  while (true) {
    //Check for extreme right
    if ((i + 9) % 8 == 0) {
      break;
    };
    //Check for extreme top
    if (i > 55) {
      break;
    };
    
    i += 9;
    
    //Check for blocking pieces
    for (let otherPiece of board) {
      if (otherPiece.position == i) {
        // Check for enemy or ally
        if (otherPiece.side == piece.side) {
          break;
        } else {
          //enemy can be eaten
          northE.push(i);
          break;
        };
      };
    };
    
    //add to northE
    northE.push(i);
  };
  
  //find southW
  i = piece.position;
  while (true) {
    //Check for extreme left
    if ((i + 8) % 8 == 0) {
      break;
    };
    //Check for extreme bottom
    if (i < 8) {
      break;
    };
    
    i -= 9;
    
    //Check for blocking pieces
    for (let otherPiece of board) {
      if (otherPiece.position == i) {
        // Check for enemy or ally
        if (otherPiece.side == piece.side) {
          break;
        } else {
          //enemy can be eaten
          southW.push(i);
          break;
        };
      };
    };
    
    //add to northE
    southW.push(i);
  };
  
  //find northW
  i = piece.position;
  while (true) {
    //Check for extreme left
    if ((i + 8) % 8 == 0) {
      break;
    };
    //Check for extreme top
    if (i > 55) {
      break;
    };
    
    i += 7;
    
    //Check for blocking pieces
    for (let otherPiece of board) {
      if (otherPiece.position == i) {
        // Check for enemy or ally
        if (otherPiece.side == piece.side) {
          break;
        } else {
          //enemy can be eaten
          northW.push(i);
          break;
        };
      };
    };
    
    //add to northE
    northW.push(i);
  };
  
  //find southE
  i = piece.position;
  while (true) {
    //Check for extreme right
    if ((i + 9) % 8 == 0) {
      break;
    };
    //Check for extreme bottom
    if (i < 8) {
      break;
    };
    
    i -= 7;
    
    //Check for blocking pieces
    for (let otherPiece of board) {
      if (otherPiece.position == i) {
        // Check for enemy or ally
        if (otherPiece.side == piece.side) {
          break;
        } else {
          //enemy can be eaten
          southE.push(i);
          break;
        };
      };
    };
    
    //add to northE
    southE.push(i);
  };
  
  //add all four directions together
  return (northE.concat(southW, northW, southE));
};

//Returns a list of positions that the queen can attack, not considering pinning
function queenMoves(piece, board) {
  //check for queen
  if (piece.type != 'q') {
    throw new Error('input piece not queen');
  };
  //Get rook moves
  rm = rookMoves({position: piece.position, type: 'r', moved: piece.moved, side: piece.side}, board);
  //Get bishop moves
  bm = bishopMoves({position: piece.position, type: 'b', moved: piece.moved, side: piece.side}, board);
  
  return rm.concat(bm);
};

//Returns a list of positioins that the king can attack, not considering pinning
function kingMoves(piece, board) {
  //check for king
  if (piece.type != 'k') {
    throw new Error('input piece not king');
  };
  
  //consider edge cases
  let topEdge = false;
  let downEdge = false;
  let leftEdge = false;
  let rightEdge = false;
  
  //identify edges
  if (piece.position > 55) {
    topEdge = true;
  };
  if (piece.position < 8) {
    downEdge = true;
  };
  if ((piece.position + 8) % 8 == 0) {
    leftEdge = true;
  };
  if ((piece.position + 9) % 8 == 0) {
    rightEdge = true;
  };
  
  //list possible moves
  let u = piece.position + 8;
  let d = piece.position - 8;
  let l = piece.position - 1;
  let r = piece.position + 1;
  let ul = piece.position + 7;
  let ur = piece.position + 9;
  let dl = piece.position - 9;
  let dr = piece.position - 7;
  
  //compile moves
  moves = [];
  //considering up moves
  if (topEdge == false) {
    moves.push(u);
    if (leftEdge == false) {
      moves.push(ul);
    };
    if (rightEdge == false) {
      moves.push(ur);
    };
  };
  //consider down moves
  if (downEdge == false) {
    moves.push(d);
    if (leftEdge == false) {
      moves.push(dl);
    };
    if (rightEdge == false) {
      moves.push(dr);
    };
  };
  //consider side moves
  if (leftEdge == false) {
    moves.push(l);
  };
  if (rightEdge == false) {
    moves.push(r);
  };
  
  let positions = [];
  for (let move of moves) {
    for (let otherPiece of board) {
      if ((otherPiece.position == move) && (otherPiece.side == piece.side)) {
        break;
      };
    };
    positions.push(move);
  };
  
  return positions
};