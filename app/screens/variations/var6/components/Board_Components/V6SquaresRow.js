import React from "react";
import { View, StyleSheet } from "react-native";
import V6Square from "./V6Square";
import SquareLayout from "../../../var0/components/Board_Components/SquareLayout";

function V6SquaresRow(props) {
  // Passing down constants
  return (
    <View style={styles.row}>
      {SquareLayout[props.index].map((squares) => (
        <V6Square
          key={squares.position}
          position={squares.position}
          colorId={squares.color}
          gameDetails={props.gameDetails}
          options={props.options}
          onAction={(action) => props.onAction(action)}
          boardOrientation={props.boardOrientation}
          settings={props.settings}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});

export default V6SquaresRow;
