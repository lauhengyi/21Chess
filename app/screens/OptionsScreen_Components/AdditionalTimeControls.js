import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import colors from "../../config/colors";
import TimeText from "../components/TimeText";
import changeTimeValue from "../functions/changeTimeValue";

function AdditionTimeControls(props) {
  const { time, setTime, increment, setIncrement, delay, setDelay } =
    props.timeDetails;
  const subHeaderStyle = props.textStyle;
  const fastIncrementText = ">";
  const slowIncrementText = ":";
  const fastDecrementText = "?";
  const slowDecrementText = ";";

  return (
    <View style={styles.background}>
      <View style={styles.controllerContainer}>
        <Text style={subHeaderStyle}>Time per player:</Text>
        <View style={styles.controller}>
          <Pressable onPress={() => handleTimePress(time, "-500", setTime)}>
            <Text style={styles.buttonText}>{fastDecrementText}</Text>
          </Pressable>
          <Pressable onPress={() => handleTimePress(time, "-100", setTime)}>
            <Text style={styles.buttonText}>{slowDecrementText}</Text>
          </Pressable>
          <View style={styles.valueText}>
            <TimeText value={time} style={subHeaderStyle} />
          </View>
          <Pressable onPress={() => handleTimePress(time, "100", setTime)}>
            <Text style={styles.buttonText}>{slowIncrementText}</Text>
          </Pressable>
          <Pressable onPress={() => handleTimePress(time, "500", setTime)}>
            <Text style={styles.buttonText}>{fastIncrementText}</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.controllerContainer}>
        <Text style={subHeaderStyle}>increment per player(min):</Text>
        <View style={styles.controller}>
          <Pressable
            onPress={() => handleOtherPress(increment, "-5", setIncrement)}
          >
            <Text style={styles.buttonText}>{fastDecrementText}</Text>
          </Pressable>
          <Pressable
            onPress={() => handleOtherPress(increment, "-1", setIncrement)}
          >
            <Text style={styles.buttonText}>{slowDecrementText}</Text>
          </Pressable>
          <View style={styles.valueText}>
            <Text style={subHeaderStyle}>{increment}</Text>
          </View>
          <Pressable
            onPress={() => handleOtherPress(increment, "1", setIncrement)}
          >
            <Text style={styles.buttonText}>{slowIncrementText}</Text>
          </Pressable>
          <Pressable
            onPress={() => handleOtherPress(increment, "5", setIncrement)}
          >
            <Text style={styles.buttonText}>{fastIncrementText}</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.controllerContainer}>
        <Text style={subHeaderStyle}>Delay per player(sec):</Text>
        <View style={styles.controller}>
          <Pressable onPress={() => handleOtherPress(delay, "-5", setDelay)}>
            <Text style={styles.buttonText}>{fastDecrementText}</Text>
          </Pressable>
          <Pressable onPress={() => handleOtherPress(delay, "-1", setDelay)}>
            <Text style={styles.buttonText}>{slowDecrementText}</Text>
          </Pressable>
          <View style={styles.valueText}>
            <Text style={subHeaderStyle}>{delay}</Text>
          </View>
          <Pressable onPress={() => handleOtherPress(delay, "1", setDelay)}>
            <Text style={styles.buttonText}>{slowIncrementText}</Text>
          </Pressable>
          <Pressable onPress={() => handleOtherPress(delay, "5", setDelay)}>
            <Text style={styles.buttonText}>{fastIncrementText}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  //Note: both value and change are strings of numbers i.e. NaN
  function handleTimePress(value, change, setFunction) {
    const actualValue = parseInt(value);
    const actualChange = parseInt(change);

    if (-actualChange >= actualValue && actualValue > 30) {
      setFunction("30");
    } else if (actualChange > 0 && actualValue === 30) {
      setFunction(change);
    } else if (actualValue === 0 && actualChange === 100) {
      setFunction("30");
    } else {
      setFunction(changeTimeValue(value, change));
    }
  }

  function handleOtherPress(value, change, setFunction) {
    const actualValue = parseInt(value);
    const actualChange = parseInt(change);

    if (-actualChange > actualValue) {
      setFunction("0");
    } else {
      setFunction(String(actualValue + actualChange));
    }
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  controllerContainer: {
    margin: 5,
  },

  controller: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    marginHorizontal: 5,
    fontFamily: "ElegantIcons",
    fontSize: 30,
    color: colors.black,
  },

  valueText: {
    width: 100,
    alignItems: "center",
  },
});

export default AdditionTimeControls;
