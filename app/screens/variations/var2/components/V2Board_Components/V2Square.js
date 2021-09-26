import React from "react";
import colorPalatte from "../../../../../config/colorPalatte";
import { View } from "react-native";
import Clickable from "../../../../components/Clickable";
import V2Piece from "./V2Piece";
import checkDarkTheme from "../../../../functions/checkDarkTheme";

function V2Square(props) {
  const settings = props.settings;

  const action =
    props.type === "x"
      ? { type: "delete", position: props.position }
      : { type: "click", position: props.position, pieceType: props.type };

  const [isPieceOnSquare, pieceId, isHighlighted, isBlocked] = checkSquare(
    props.choosingDetails,
    props.position
  );

  const color = getColor(settings, colorPalatte, props.colorId, isBlocked);

  const styles = getStyle(color, isHighlighted);

  function PieceWithProps() {
    return (
      <V2Piece
        pieceId={pieceId}
        choosingDetails={props.choosingDetails}
        choosingActions={props.choosingActions}
        settings={settings}
      />
    );
  }
  // Render moveables and render pieces
  if (isBlocked) {
    return <View style={styles} />;
  } else {
    return (
      <Clickable
        onPress={() => {
          props.choosingActions(action);
        }}
      >
        <View style={styles}>
          {isPieceOnSquare ? <PieceWithProps /> : null}
        </View>
      </Clickable>
    );
  }
}

function getStyle(color, isHighlighted) {
  const squareLength = 46;
  //Get square color (Switch square color around if theme is dark)
  const squareColor = isHighlighted ? color[1] : color[0];

  const style = {
    height: squareLength,
    width: squareLength,
    backgroundColor: squareColor,
    alignItems: "center",
    justifyContent: "center",
  };
  return style;
}

function getColor(settings, colorPalatte, colorId, isBlocked) {
  const colors = colorPalatte[settings.theme];
  const isDark = checkDarkTheme(settings.theme);
  const colorType = (function () {
    if (isDark) {
      return colorId === 1 ? "white" : "black";
    } else {
      return colorId === 1 ? "black" : "white";
    }
  })();
  let color =
    colorType === "black"
      ? [colors.grey1, colors.moveableSquareBlack]
      : [colors.secondary, colors.moveableSquareWhite];
  if (isBlocked) {
    color =
      colorType === "black"
        ? [colors.grey3, colors.moveableSquareBlack]
        : [colors.grey2, colors.moveableSquareWhite];
  }

  return color;
}

//returns [isClicked, whether piece on square, piece ID, whether moveable on square, moveableMove, whether moveable is a castle move]
function checkSquare(choosingDetails, position) {
  // Passing down constants
  const boardLayout = choosingDetails.boardLayout;

  // Find whether there is a piece on the square
  const [isPieceOnSquare, , pieceId] = (function () {
    for (const piece of boardLayout) {
      if (piece.position === position) {
        return [true, piece.side, piece.id];
      }
    }
    return [false, null, null];
  })();

  //Check highlighted
  const isHighlighted = choosingDetails.highlighted.includes(position);

  //Check blocked
  const isBlocked = choosingDetails.side ? position > 31 : position < 32;

  return [isPieceOnSquare, pieceId, isHighlighted, isBlocked];
}

export default V2Square;
