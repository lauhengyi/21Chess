import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import TimeControlButton from "./TimeControlButton";
import colors from "../../config/colors";
import convertTimeToNum from "../functions/convertTimeToNum";

function TimeSelect(props) {
  const { time, p2, setTime, setP2, increment, setIncrement, delay, setDelay } =
    props.timeDetails;

  const bulletButtons = [
    {
      id: 0,
      time: "100",
      increment: "0",
      delay: "0",
    },

    {
      id: 1,
      time: "100",
      increment: "1",
      delay: "0",
    },

    {
      id: 2,
      time: "200",
      increment: "1",
      delay: "0",
    },
  ];

  const blizButtons = [
    {
      id: 3,
      time: "300",
      increment: "0",
      delay: "0",
    },

    {
      id: 4,
      time: "300",
      increment: "2",
      delay: "0",
    },

    {
      id: 5,
      time: "500",
      increment: "0",
      delay: "0",
    },
  ];

  const rapidButton = [
    {
      id: 6,
      time: "1000",
      increment: "0",
      delay: "0",
    },

    {
      id: 7,
      time: "3000",
      increment: "0",
      delay: "0",
    },

    {
      id: 8,
      time: "1500",
      increment: "10",
      delay: "0",
    },
  ];

  const timeControlText = getTimeControlText(time, increment, delay);
  const [clickedButton, setClickedButton] = useState(6);

  return (
    <View>
      <View style={styles.timeControlTextContainer}>
        <Text style={styles.timeControlText}>{timeControlText}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsColumn}>
          <Text style={styles.timeTypeText}>Bullet</Text>
          {bulletButtons.map((button) => (
            <TimeControlButton
              key={button.id}
              id={button.id}
              text={getTimeControlText(
                button.time,
                button.increment,
                button.delay
              )}
              onButtonPress={() =>
                onButtonPress(
                  button.time,
                  button.increment,
                  button.delay,
                  button.id,
                  setTime
                )
              }
              clickedButton={clickedButton}
              isChanged={checkChanged(
                button.time,
                button.increment,
                button.delay
              )}
            />
          ))}
        </View>
        <View style={styles.buttonsColumnCenter}>
          <Text style={styles.timeTypeText}>Bliz</Text>
          {blizButtons.map((button) => (
            <TimeControlButton
              key={button.id}
              id={button.id}
              text={getTimeControlText(
                button.time,
                button.increment,
                button.delay
              )}
              onButtonPress={() =>
                onButtonPress(
                  button.time,
                  button.increment,
                  button.delay,
                  button.id,
                  setTime
                )
              }
              clickedButton={clickedButton}
              isChanged={checkChanged(
                button.time,
                button.increment,
                button.delay
              )}
            />
          ))}
        </View>
        <View style={styles.buttonsColumn}>
          <Text style={styles.timeTypeText}>Rapid</Text>
          {rapidButton.map((button) => (
            <TimeControlButton
              key={button.id}
              id={button.id}
              text={getTimeControlText(
                button.time,
                button.increment,
                button.delay
              )}
              onButtonPress={() =>
                onButtonPress(
                  button.time,
                  button.increment,
                  button.delay,
                  button.id,
                  setTime
                )
              }
              clickedButton={clickedButton}
              isChanged={checkChanged(
                button.time,
                button.increment,
                button.delay
              )}
            />
          ))}
        </View>
      </View>
    </View>
  );

  //show time control text for one player
  function getTimeControlText(time, increment, delay) {
    const [hours, minutes, seconds] = convertTimeToNum(time);

    //Add hours to minutes
    let timeText = String(hours * 60 + minutes);
    //Update time text for 30 seconds
    if (seconds === 30) {
      timeText = "0.5";
    }

    let incrementText = "";
    if (increment != "0") {
      incrementText = "|" + increment;
    }

    let delayText = "";
    if (delay != "0") {
      delayText = " d" + delay;
    }

    if (increment === "0" && delay === "0") {
      timeText = timeText + "min";
    } else if (increment === "0") {
      timeText = timeText + "|0";
    }

    return timeText + incrementText + delayText;
  }

  function onButtonPress(time, increment, delay, id, setTime) {
    setTime(time);
    setIncrement(increment);
    setDelay(delay);
    setClickedButton(id);
  }

  function checkChanged(t, i, d) {
    let isChanged = true;
    if (time === t && increment === i && delay === d) {
      isChanged = false;
    }
    return isChanged;
  }
}

const styles = StyleSheet.create({
  timeControlTextContainer: {
    alignItems: "center",
  },

  timeControlText: {
    fontFamily: "FogtwoNo5",
    fontSize: 60,
    color: colors.black,
  },

  timeText: {
    color: colors.black,
    fontSize: 25,
  },

  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
  },

  buttonsColumn: {
    flex: 1,
  },

  buttonsColumnCenter: {
    flex: 1,
    marginHorizontal: 5,
  },

  timeTypeText: {
    alignSelf: "center",
    fontFamily: "ELM",
    fontSize: 20,
    color: colors.grey3,
    textDecorationLine: "underline",
  },
});

export default TimeSelect;
