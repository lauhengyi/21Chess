import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import changeTimeValue from "../functions/changeTimeValue";
import TimeText from "../components/TimeText";
import colorPalatte from "../../config/colorPalatte";

function TimeController(props) {
  const { text, largeChange, smallChange, value, setFunction, type, isTime } =
    props;
  const fastIncrementText = ">";
  const slowIncrementText = ":";
  const fastDecrementText = "?";
  const slowDecrementText = ";";
  function handlePress(value, change, setFunction) {
    if (isTime) {
      return setTimePress(value, change, setFunction);
    } else {
      return setOtherPress(value, change, setFunction);
    }
  }

  const styles = getStyles(props.settings, colorPalatte);
  if (type === "both") {
    return (
      <>
        <Text style={styles.valueText}>{text}</Text>
        <View style={styles.controller}>
          <Pressable
            onPress={() => handlePress(value, "-" + largeChange, setFunction)}
          >
            <Text style={styles.buttonText}>{fastDecrementText}</Text>
          </Pressable>
          <Pressable
            onPress={() => handlePress(value, "-" + smallChange, setFunction)}
          >
            <Text style={styles.buttonText}>{slowDecrementText}</Text>
          </Pressable>
          <View style={styles.valueTextContainer}>
            <TimeText value={value} style={styles.valueText} />
          </View>
          <Pressable
            onPress={() => handlePress(value, smallChange, setFunction)}
          >
            <Text style={styles.buttonText}>{slowIncrementText}</Text>
          </Pressable>
          <Pressable
            onPress={() => handlePress(value, largeChange, setFunction)}
          >
            <Text style={styles.buttonText}>{fastIncrementText}</Text>
          </Pressable>
        </View>
      </>
    );
  } else if (type === "perPlayer") {
    return (
      <View style={styles.perPlayerControllerContainer}>
        <Text style={styles.valueText}>{text}</Text>
        <View style={styles.controller}>
          <Pressable
            onPress={() => handlePress(value, "-" + largeChange, setFunction)}
          >
            <Text style={styles.perPlayerButtonText}>{fastDecrementText}</Text>
          </Pressable>
          <Pressable
            onPress={() => handlePress(value, "-" + smallChange, setFunction)}
          >
            <Text style={styles.perPlayerButtonText}>{slowDecrementText}</Text>
          </Pressable>
          <View style={styles.perPlayerValueTextContainer}>
            <TimeText value={value} style={styles.perPlayerValueText} />
          </View>
          <Pressable
            onPress={() => handlePress(value, smallChange, setFunction)}
          >
            <Text style={styles.perPlayerButtonText}>{slowIncrementText}</Text>
          </Pressable>
          <Pressable
            onPress={() => handlePress(value, largeChange, setFunction)}
          >
            <Text style={styles.perPlayerButtonText}>{fastIncrementText}</Text>
          </Pressable>
        </View>
      </View>
    );
  }
  //Note: both value and change are strings of numbers i.e. NaN
  function setTimePress(value, change, setFunction) {
    const actualValue = parseInt(value);
    const actualChange = parseInt(change);
    let setValue;

    if (-actualChange >= actualValue && actualValue > 30) {
      setValue = "30";
    } else if (actualChange > 0 && actualValue === 30) {
      setValue = change;
    } else if (actualValue === 0 && actualChange === 100) {
      setValue = "30";
    } else {
      setValue = changeTimeValue(value, change);
    }

    setFunction(setValue);
  }

  function setOtherPress(value, change, setFunction) {
    const setValue = changeTimeValue(value, change);
    setFunction(setValue);
  }
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];

  return StyleSheet.create({
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

    valueTextContainer: {
      width: 100,
      alignItems: "center",
    },

    valueText: {
      fontFamily: "ELM",
      fontSize: 20,
      color: colors.black,
    },

    perPlayerControllerContainer: {},

    perPlayerValueTextContainer: {
      alignItems: "center",
      width: 80,
    },

    perPlayerButtonText: {
      marginHorizontal: 1,
      fontFamily: "ElegantIcons",
      fontSize: 20,
      color: colors.black,
    },

    perPlayerValueText: {
      fontFamily: "ELM",
      fontSize: 15,
      color: colors.black,
    },
  });
}

export default TimeController;
