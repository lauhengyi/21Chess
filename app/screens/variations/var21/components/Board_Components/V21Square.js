import React from "react";
import colorPalatte from "../../../../../config/colorPalatte";
import { View, Text } from "react-native";
import Clickable from "../../../../components/Clickable";
import Piece from "../../../var0/components/Board_Components/Piece";
import checkDarkTheme from "../../../../functions/checkDarkTheme";
import updateZoneBorder from "../../functions/updatePortalStyles";

function V21Square(props) {
  const { settings, boardOrientation, gameDetails, options } = props;
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

  const [squareColors, colors] = getColors(
    settings,
    colorPalatte,
    props.colorId,
    isLastMoveOnSquare
  );

  let rotateAmount = "0deg";
  if (boardOrientation && options.isFlipped) {
    //starting white
    if (gameDetails.currentSide === false) {
      rotateAmount = "180deg";
    }
  }
  if (boardOrientation === false) {
    rotateAmount = "180deg";
    if (gameDetails.currentSide === true && options.isFlipped) {
      rotateAmount = "0deg";
    }
  }

  let styles = getStyles(
    squareColors,
    colors,
    rotateAmount,
    isMoveableOnSquare,
    isClicked
  );

  const killZone = props.gameDetails.killZone;
  const isKillZone = killZone.matrix[props.position];
  if (isKillZone) {
    updateZoneBorder(
      styles.square,
      colors.accent,
      props.position,
      killZone.matrix
    );
  }

  function PieceWithProps() {
    return (
      <Piece
        gameDetails={props.gameDetails}
        options={props.options}
        pieceId={pieceId}
        onAction={(moves) => props.onAction(moves)}
        boardOrientation={props.boardOrientation}
        isMoveableOnSquare={isMoveableOnSquare}
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
          {isPieceOnSquare ? <PieceWithProps /> : null}
          {!isPieceOnSquare && isKillZone && (
            <Text style={styles.countDown}>{killZone.countDown}</Text>
          )}
        </View>
      </Clickable>
    );
  } else {
    return (
      <View style={styles.square}>
        {isPieceOnSquare ? <PieceWithProps /> : null}
        {!isPieceOnSquare && isKillZone && (
          <Text style={styles.countDown}>{killZone.countDown}</Text>
        )}
      </View>
    );
  }
}

function getStyles(
  squareColors,
  colors,
  rotateAmount,
  isMoveableOnSquare,
  isClicked
) {
  //Determines the border length of a square
  const clickedIndicator = isClicked ? 2 : 0;

  const squareLength = 46;
  //Get square color (Switch square color around if theme is dark)
  const squareColor = isMoveableOnSquare ? squareColors[1] : squareColors[0];

  const styles = {
    square: {
      height: squareLength,
      width: squareLength,
      backgroundColor: squareColor,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: clickedIndicator,
      borderLeftColor: squareColors[1],
      borderRightColor: squareColors[1],
      borderTopColor: squareColors[1],
      borderBottomColor: squareColors[1],
    },

    countDown: {
      transform: [{ rotate: rotateAmount }],
      fontFamily: "ELM",
      fontSize: 30,
      color: colors.accent,
    },
  };
  return styles;
}

function getColors(settings, colorPalatte, colorId, isLastMoveOnSquare) {
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
    color =
      colorType === "black"
        ? [colors.grey1, colors.moveableSquareBlack]
        : [colors.secondary, colors.moveableSquareWhite];
  }
  return [color, colors];
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

export default V21Square;
