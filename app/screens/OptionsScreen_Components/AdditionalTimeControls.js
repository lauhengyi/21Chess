import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import colors from "../../config/colors";
import TimeText from "../components/TimeText";

function AdditionTimeControls(props) {
  const { p1, setP1, p2, setP2, increment, setIncrement, delay, setDelay } =
    props.timeDetails;
  const subHeaderStyle = props.textStyle;
  const fastIncrementText = ">";
  const slowIncrementText = ":";
  const fastDecrementText = "?";
  const slowDecrementText = ";";

  return (
    <View style={styles.controllerContainer}>
      <Text style={subHeaderStyle}>Time per player</Text>
      <View style={styles.controller}>
        <Pressable>
          <Text style={styles.buttonText}>{fastDecrementText}</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.buttonText}>{slowDecrementText}</Text>
        </Pressable>
        <TimeText value={p1} style={subHeaderStyle} />
        <Pressable>
          <Text style={styles.buttonText}>{slowIncrementText}</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.buttonText}>{fastIncrementText}</Text>
        </Pressable>
      </View>
    </View>
  );

  //Note: both value and change are strings of numbers i.e. NaN
  function changeTimeValue(value, change) {
    //get hours, minutes, seconds
    let [hours, minutes, seconds] = convertTimetoNum(value);

    //categoriseChange
    //Check for add or minus
    let changeString = change;
    let isNegative = false;
    if (changeLeft[0] === "-") {
      changeString = changeString.slice(-(changeString.length - 1));
      isNegative = true;
    }

    let [changeHours, changeMinutes, changeSeconds] = convertTimetoNum(change);

    //Factor in negative
    if (isNegative) {
      changeHours = -changeHours;
      changeMinutes = -changeMinutes;
      changeSeconds = -changeSeconds;
    }

    //Carry out change
    hours += changeHours;
    minutes += changeMinutes;
    seconds += changeSeconds;

    //account for excess and negatives
    while (seconds < 0) {
      minutes -= 1;
      seconds += 60;
    }
    while (seconds > 59) {
      minutes += 1;
      seconds -= 60;
    }

    while (minutes < 0) {
      hours -= 1;
      minutes += 60;
    }
    while (minutes > 59) {
      hours += 1;
      minutes -= 60;
    }

    if (hours < 0) {
      hours = 0;
    }

    if (hours > 99) {
      hours = 99;
      minutes = 99;
      seconds = 99;
    }

    return String(hours) + String(minutes) + String(seconds);
  }
}

const styles = StyleSheet.create({
  controllerContainer: {
    height: "100%",
    margin: 5,
  },

  controller: {
    flex: 1,
    flexDirection: "row",
  },

  buttonText: {
    fontFamily: "ElegantIcons",
    fontSize: 30,
  },

  timeText: {},
});

export default AdditionTimeControls;
