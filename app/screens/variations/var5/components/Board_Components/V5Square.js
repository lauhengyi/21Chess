import React from "react";
import colorPalatte from "../../../../../config/colorPalatte";
import { View } from "react-native";
import Clickable from "../../../../components/Clickable";
import Piece from "../../../var0/components/Board_Components/Piece";
import checkDarkTheme from "../../../../functions/checkDarkTheme";

function V5Square(props) {
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
    isBlank,
  ] = checkSquare(props.gameDetails, props.position);

  const color = getColor(
    settings,
    colorPalatte,
    props.colorId,
    isLastMoveOnSquare
  );

  const styles = getStyle(color, isMoveableOnSquare, isClicked, isBlank);

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
      <Clickable
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
      </Clickable>
    );
  } else if (isBlank) {
    return <View style={styles} />;
  } else {
    return (
      <View style={styles}>{isPieceOnSquare ? <PieceWithProps /> : null}</View>
    );
  }
}

function getStyle(color, isMoveableOnSquare, isClicked, isBlank) {
  //Determines the border length of a square
  const clickedIndicator = isClicked ? 2 : 0;

  const squareLength = 46;
  //Get square color (Switch square color around if theme is dark)
  let squareColor = isMoveableOnSquare ? color[1] : color[0];

  //If blank then square color is different
  if (isBlank) {
    squareColor = color[2];
  }

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

function getColor(settings, colorPalatte, colorId, isLastMoveOnSquare) {
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
        ? [
            colors.lastMovedSquareBlack,
            colors.moveableSquareBlack,
            colors.black,
          ]
        : [
            colors.lastMovedSquareWhite,
            colors.moveableSquareWhite,
            colors.black,
          ];
  } else {
    color =
      colorType === "black"
        ? [colors.grey1, colors.moveableSquareBlack, colors.black]
        : [colors.secondary, colors.moveableSquareWhite, colors.black];
  }
  return color;
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

  //Check for whether the square is a blank or not
  let isBlank = false;
  for (let piece of boardLayout) {
    if (piece.type === null && piece.position === position) {
      isBlank = true;
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
    isBlank,
  ];
}

export default V5Square;
