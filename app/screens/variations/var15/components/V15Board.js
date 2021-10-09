import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import V15SquaresRow from "./Board_Components/V15SquaresRow";

function V15Board(props) {
  const options = props.options;
  //Mapping rows
  const rows = [0, 1, 2, 3, 4, 5, 6, 7];

  //Integrate pausing for autoturn
  const currentSide = props.gameDetails.currentSide;
  const timer = useRef();
  const [boardOrientation, setBoardOrientation] = useState(getOrientation());
  useEffect(() => {
    let orientation = getOrientation();
    timer.current = setTimeout(() => setBoardOrientation(orientation), 400);
    return () => clearTimeout(timer.current);
  }, [currentSide]);

  return (
    //make board
    <View style={styles.boardContainer}>
      <View style={boardOrientation ? styles.orientWhite : styles.orientBlack}>
        <View style={styles.board}>
          {rows.map((index) => (
            <V15SquaresRow
              key={index}
              index={index}
              gameDetails={props.gameDetails}
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
      boardOrientation = props.gameDetails.currentSide ? true : false;
    }
    return boardOrientation;
  }
}
const styles = StyleSheet.create({
  boardContainer: {
    alignSelf: "center",
  },
  orientWhite: {},

  orientBlack: {
    transform: [{ rotate: "180deg" }],
  },

  board: {
    flexDirection: "column-reverse",
  },
});

export default V15Board;
