import React from "react";
import colors from "../../../config/colors";
import { View, Pressable } from "react-native";
import Piece from "./Piece";
import { checkCollision } from "../../../mechanisms/normalChess";

function Square(props) {
  function onAction(action) {
    props.onAction(action);
  }

  const [
    color,
    isPieceOnSquare,
    pieceId,
    isMoveableOnSquare,
    moveableMove,
    castling,
  ] = checkSquare(props.gameDetails, props.position, props.color);
  // Render moveables and render pieces
  if (isMoveableOnSquare) {
    return (
      <Pressable
        onPress={() => {
          onAction({
            type: "makeTurn",
            move: moveableMove,
            castling: castling,
          });
        }}
      >
        <View
          style={{
            height: 45,
            width: 45,
            backgroundColor: color[1],
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isPieceOnSquare ? (
            <Piece
              gameDetails={props.gameDetails}
              pieceId={pieceId}
              onAction={(moves) => props.onAction(moves)}
            />
          ) : null}
        </View>
      </Pressable>
    );
  } else {
    return (
      <View
        style={{
          height: 45,
          width: 45,
          backgroundColor: color[0],
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isPieceOnSquare ? (
          <Piece
            gameDetails={props.gameDetails}
            pieceId={pieceId}
            onAction={(moves) => props.onAction(moves)}
          />
        ) : null}
      </View>
    );
  }
}

//returns [color matrix of square, whether piece on square, piece ID, whether moveable on square, moveableMove, whether moveable is a castle move]
function checkSquare(gameDetails, position, colorId) {
  // Passing down constants
  const boardLayout = gameDetails.boardLayout;
  const moveables = gameDetails.moveables;
  const lastMoved = gameDetails.lastMoved;

  // Find whether there is a piece on the square
  let [isPieceOnSquare, , pieceId] = checkCollision(position, boardLayout);

  // Find whether these is a moveable on the square
  let isMoveableOnSquare = false;
  let castling = false;
  // The id of the piece which formed the moveable
  let moveableMove;
  // Check for normal moves
  if (moveables[0]) {
    for (let moveable of moveables[0]) {
      if (position === moveable[1]) {
        moveableMove = moveable;
        isMoveableOnSquare = true;
      }
    }
  }
  if (moveables[1]) {
    //Check castling moves
    for (let moveable of moveables[1]) {
      if (position === moveable[0][1]) {
        moveableMove = moveable;
        isMoveableOnSquare = true;
        castling = true;
      }
    }
  }

  //Check for last moved
  let isLastMoveOnSquare = false;

  //Check movedFrom
  if (lastMoved[0]) {
    if (lastMoved[1] === position || lastMoved[2] === position) {
      isLastMoveOnSquare = true;
    }
  }

  // Determine color of square: black and white, moveable or not
  let color;
  if (isLastMoveOnSquare) {
    color =
      colorId === 1
        ? [colors.lastMovedSquareBlack, colors.moveableSquareBlack]
        : [colors.lastMovedSquareWhite, colors.moveableSquareWhite];
  } else {
    color =
      colorId === 1
        ? [colors.grey1, colors.moveableSquareBlack]
        : [colors.secondary, colors.moveableSquareWhite];
  }

  return [
    color,
    isPieceOnSquare,
    pieceId,
    isMoveableOnSquare,
    moveableMove,
    castling,
  ];
}

export default Square;
