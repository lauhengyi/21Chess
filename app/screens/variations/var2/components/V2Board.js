import React from "react";
import { View, StyleSheet } from "react-native";
import V2SquaresRow from "./V2Board_Components/V2SquaresRow";

function V2Board(props) {
  //Mapping rows
  const rows = [0, 1, 2, 3, 4, 5, 6, 7];
  const choosingDetails = props.choosingDetails;

  return (
    //make board
    <View style={styles.boardContainer}>
      <View
        style={choosingDetails.side ? styles.orientWhite : styles.orientBlack}
      >
        <View style={styles.board}>
          {rows.map((index) => (
            <V2SquaresRow
              key={index}
              index={index}
              choosingDetails={choosingDetails}
              choosingActions={props.choosingActions}
              type={props.type}
              settings={props.settings}
            />
          ))}
        </View>
      </View>
    </View>
  );
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

export default V2Board;
