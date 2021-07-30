import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TimeText from "../components/TimeText";

function AdditionTimeControls(props) {
  const { p1, setP1, p2, setP2, increment, setIncrement, delay, setDelay } =
    props.timeDetails;
  const subHeaderStyle = props.textStyle;

  return (
    <View style={styles.controllerContainer}>
      <Text style={subHeaderStyle}>Time per player</Text>
      <View style={styles.controller}>
        <TimeText value={p1} style={subHeaderStyle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controllerContainer: {
    height: "100%",
    margin: 5,
  },

  controller: {
    flex: 1,
  },

  timeText: {},
});

export default AdditionTimeControls;
