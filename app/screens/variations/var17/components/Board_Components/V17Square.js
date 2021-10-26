import React from "react";
import colorPalatte from "../../../../../config/colorPalatte";
import { View, Text, StyleSheet } from "react-native";
import Clickable from "../../../../components/Clickable";
import V17Piece from "./V17Piece";
import checkDarkTheme from "../../../../functions/checkDarkTheme";
import getSquareNumber from "../../../../../mechanisms/var17/functions/getSquareNumber";

function V17Square(props) {
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

  const isCleared = props.gameDetails.mineMatrix[props.position][1];
  let squareNum = getSquareNumber(props.position, props.gameDetails.mineMatrix);
  //Make squareNum not show when its 0
  squareNum = squareNum === 0 ? null : squareNum;

  const colors = getColors(
    settings,
    colorPalatte,
    props.colorId,
    isCleared,
    isLastMoveOnSquare
  );

  const styles = getStyles(
    colors,
    isMoveableOnSquare,
    isClicked,
    props.options,
    props.boardOrientation,
    props.gameDetails.currentSide
  );

  function PieceWithProps() {
    return (
      <V17Piece
        gameDetails={props.gameDetails}
        options={props.options}
        pieceId={pieceId}
        onAction={(moves) => props.onAction(moves)}
        boardOrientation={props.boardOrientation}
        isMoveableOnSquare={isMoveableOnSquare}
        squareNum={squareNum}
        settings={settings}
      />
    );
  }
  // Render moveables and render pieces
  if (isMoveableOnSquare) {
    return (
      <Clickable
        onPress={() => {
          onAction({
            type: "makeTurn",
            move: moveableMove,
            castling: castling,
          });
        }}
      >
        <View style={styles.square}>
          {isPieceOnSquare ? (
            <PieceWithProps />
          ) : (
            <Text style={styles.squareNum}>{squareNum}</Text>
          )}
        </View>
      </Clickable>
    );
  } else {
    return (
      <View style={styles.square}>
        {isPieceOnSquare ? (
          <PieceWithProps />
        ) : (
          <Text style={styles.squareNum}>{squareNum}</Text>
        )}
      </View>
    );
  }
}

function getStyles(
  colors,
  isMoveableOnSquare,
  isClicked,
  options,
  currentOrientation,
  currentSide
) {
  //Determines the border length of a square
  const clickedIndicator = isClicked ? 2 : 0;

  const squareLength = 46;
  //Get square color (Switch square color around if theme is dark)
  const squareColor = isMoveableOnSquare
    ? colors.squareColor[1]
    : colors.squareColor[0];

  //Check squareNum orientation
  let rotateAmount = "0deg";
  if (currentOrientation && options.isFlipped) {
    //starting white
    if (currentSide === false) {
      rotateAmount = "180deg";
    }
  }
  if (currentOrientation === false) {
    rotateAmount = "180deg";
    if (currentSide === true && options.isFlipped) {
      rotateAmount = "0deg";
    }
  }
  const style = StyleSheet.create({
    square: {
      height: squareLength,
      width: squareLength,
      backgroundColor: squareColor,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: clickedIndicator,
      borderColor: colors.squareColor[1],
    },

    squareNum: {
      transform: [{ rotate: rotateAmount }],
      fontFamily: "ELM",
      fontSize: 30,
      color: colors.colors.black,
    },
  });
  return style;
}

function getColors(
  settings,
  colorPalatte,
  colorId,
  isCleared,
  isLastMoveOnSquare
) {
  const colors = colorPalatte[settings.theme];
  const isDark = checkDarkTheme(settings.theme);
  const colorType = (function () {
    if (isDark) {
      return colorId === 1 ? "white" : "black";
    } else {
      return colorId === 1 ? "black" : "white";
    }
  })();
  let color;
  if (isLastMoveOnSquare) {
    color =
      colorType === "black"
        ? [colors.lastMovedSquareBlack, colors.moveableSquareBlack]
        : [colors.lastMovedSquareWhite, colors.moveableSquareWhite];
  } else {
    if (isCleared) {
      color =
        colorType === "black"
          ? [colors.grey1, colors.moveableSquareBlack]
          : [colors.secondary, colors.moveableSquareWhite];
    } else {
      color =
        colorType === "black"
          ? [colors.grey3, colors.moveableSquareBlack]
          : [colors.grey2, colors.moveableSquareWhite];
    }
  }
  return {
    squareColor: color,
    colors: colors,
  };
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
  const [isPieceOnSquare, , pieceId] = (function () {
    for (const piece of boardLayout) {
      if (piece.position === position) {
        return [true, piece.side, piece.id];
      }
    }
    return [false, null, null];
  })();

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
  if (lastMoved[0] !== null) {
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

export default V17Square;
