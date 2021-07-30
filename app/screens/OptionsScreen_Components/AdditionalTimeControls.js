import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import colors from "../../config/colors";
import TimeText from "../components/TimeText";
import convertTimeToNum from "../functions/convertTimetoNum";

function AdditionTimeControls(props) {
  const { p1, setP1, p2, setP2, increment, setIncrement, delay, setDelay } =
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
          <Pressable onPress={() => handleTimePress(p1, "-500", setP1)}>
            <Text style={styles.buttonText}>{fastDecrementText}</Text>
          </Pressable>
          <Pressable onPress={() => handleTimePress(p1, "-100", setP1)}>
            <Text style={styles.buttonText}>{slowDecrementText}</Text>
          </Pressable>
          <View style={styles.valueText}>
            <TimeText value={p1} style={subHeaderStyle} />
          </View>
          <Pressable onPress={() => handleTimePress(p1, "100", setP1)}>
            <Text style={styles.buttonText}>{slowIncrementText}</Text>
          </Pressable>
          <Pressable onPress={() => handleTimePress(p1, "500", setP1)}>
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

  function changeTimeValue(value, change) {
    //get hours, minutes, seconds
    let [hours, minutes, seconds] = convertTimeToNum(value);

    //categoriseChange
    //Check for add or minus
    let changeString = change;
    let isNegative = false;
    if (changeString[0] === "-") {
      changeString = changeString.slice(-(changeString.length - 1));
      isNegative = true;
    }

    let [changeHours, changeMinutes, changeSeconds] =
      convertTimeToNum(changeString);

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
      minutes = 0;
      seconds = 0;
    }

    if (hours > 99) {
      hours = 99;
      minutes = 99;
      seconds = 99;
    }

    return formatNum(hours) + formatNum(minutes) + formatNum(seconds);
  }

  function formatNum(num) {
    let numString = String(num);
    while (numString.length < 2) {
      numString = "0" + numString;
    }
    return numString;
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
