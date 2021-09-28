import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import colorPalatte from "../../../../config/colorPalatte";
import V6SquaresRow from "./Board_Components/V6SquaresRow";

function V6Board(props) {
  const options = props.options;
  //Mapping rows
  const rows = [0, 1, 2, 3, 4, 5, 6, 7];

  //Integrate pausing for autoturn
  const actualGame = props.gameDetails.currentGame;
  const currentSide = props.gameDetails[actualGame].currentSide;
  const sideTimer = useRef();
  const gameTimer = useRef();
  const [currentGame, setCurrentGame] = useState(actualGame);
  const [boardOrientation, setBoardOrientation] = useState(getOrientation());

  //Rotate board for orientation
  useEffect(() => {
    sideTimer.current = setTimeout(
      () => setBoardOrientation(getOrientation()),
      400
    );
    return () => clearTimeout(sideTimer.current);
  }, [currentSide]);

  useEffect(() => {
    gameTimer.current = setTimeout(() => {
      setCurrentGame(props.gameDetails.currentGame);
      setBoardOrientation(getOrientation());
    }, 400);
    return () => clearTimeout(gameTimer.current);
  }, [actualGame]);

  const styles = getStyle(props.settings, currentGame, colorPalatte);

  return (
    //make board
    <View style={styles.boardContainer}>
      <View style={boardOrientation ? styles.orientWhite : styles.orientBlack}>
        <View style={styles.board}>
          {rows.map((index) => (
            <V6SquaresRow
              key={index}
              index={index}
              gameDetails={props.gameDetails[currentGame]}
              options={props.options}
              onAction={(action) => props.onAction(action)}
              boardOrientation={boardOrientation}
              settings={props.settings}
            />
          ))}
        </View>
      </View>
    </View>
  );

  function getOrientation() {
    let boardOrientation = options.startingSide ? true : false;
    if (options.isAutoturn) {
      boardOrientation = props.gameDetails[props.gameDetails.currentGame]
        .currentSide
        ? true
        : false;
    }
    if (!options.isAutoturn && actualGame === false) {
      boardOrientation = !boardOrientation;
    }
    return boardOrientation;
  }
}

function getStyle(settings, currentGame, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return StyleSheet.create({
    boardContainer: {
      alignSelf: "center",
      borderWidth: 10,
      borderColor: currentGame ? colors.tertiary : colors.grey3,
    },
    orientWhite: {},

    orientBlack: {
      transform: [{ rotate: "180deg" }],
    },

    board: {
      flexDirection: "column-reverse",
    },
  });
}

export default V6Board;
