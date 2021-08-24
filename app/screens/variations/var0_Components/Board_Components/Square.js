import React from "react";
import colorPalatte from "../../../../config/colorPalatte";
import { View, Pressable } from "react-native";
import Piece from "./Piece";
import checkCollision from "../../../../mechanisms/var0/functions/checkCollision";

function Square(props) {
  const settings = props.settings;
  function onAction(action) {
    props.onAction(action);
  }

  const [
    isClicked,
    isLastMoveOnSquare,
    isPieceOnSquare,
    pieceId,
    isMoveableOnSquare,
    moveableMove,
    castling,
  ] = checkSquare(props.gameDetails, props.position);

  const styles = getStyle(
    settings,
    colorPalatte,
    props.color,
    isMoveableOnSquare,
    isLastMoveOnSquare,
    isClicked
  );

  function PieceWithProps() {
    return (
      <Piece
        gameDetails={props.gameDetails}
        options={props.options}
        pieceId={pieceId}
        onAction={(moves) => props.onAction(moves)}
        boardOrientation={props.boardOrientation}
        settings={settings}
      />
    );
  }
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
        <View style={styles}>
          {isPieceOnSquare ? <PieceWithProps /> : null}
        </View>
      </Pressable>
    );
  } else {
    return (
      <View style={styles}>{isPieceOnSquare ? <PieceWithProps /> : null}</View>
    );
  }
}

function getStyle(
  settings,
  colorPalatte,
  colorId,
  isMoveableOnSquare,
  isLastMoveOnSquare,
  isClicked
) {
  const colors = colorPalatte[settings.theme];
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
        ? [colors.squareBlack, colors.moveableSquareBlack]
        : [colors.squareWhite, colors.moveableSquareWhite];
  }
  //Determines the border length of a square
  const clickedIndicator = isClicked ? 2 : 0;

  const squareLength = 46;
  const squareColor = isMoveableOnSquare ? color[1] : color[0];
  const style = {
    height: squareLength,
    width: squareLength,
    backgroundColor: squareColor,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: clickedIndicator,
    borderColor: color[1],
  };
  return style;
}

//returns [isClicked, whether piece on square, piece ID, whether moveable on square, moveableMove, whether moveable is a castle move]
function checkSquare(gameDetails, position) {
  // Passing down constants
  const boardLayout = gameDetails.boardLayout;
  const moveables = gameDetails.moveables;
  const lastMoved = gameDetails.lastMoved;

  // Find isClicked
  const isClicked = gameDetails.clickedSquare === position ? true : false;

  // Find whether there is a piece on the square
  const [isPieceOnSquare, , pieceId] = checkCollision(position, boardLayout);

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

  //Check
  if (lastMoved[0]) {
    if (lastMoved[1] === position || lastMoved[2] === position) {
      isLastMoveOnSquare = true;
    }
  }

  return [
    isClicked,
    isLastMoveOnSquare,
    isPieceOnSquare,
    pieceId,
    isMoveableOnSquare,
    moveableMove,
    castling,
  ];
}

export default Square;
