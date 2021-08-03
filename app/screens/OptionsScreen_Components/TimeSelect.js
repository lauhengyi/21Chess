import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import TimeControlButton from "./TimeControlButton";
import colors from "../../config/colors";
import getTimeControlText from "../functions/getTimeControlText";

function TimeSelect(props) {
  const {
    isTimeLock,
    p1Time,
    setP1Time,
    p2Time,
    setP2Time,
    p1Increment,
    setP1Increment,
    p2Increment,
    setP2Increment,
    p1Delay,
    setP1Delay,
    p2Delay,
    setP2Delay,
  } = props.timeDetails;

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

  const p1TimeControlText = getTimeControlText(p1Time, p1Increment, p1Delay);
  const p2TimeControlText = getTimeControlText(p2Time, p2Increment, p2Delay);
  const [clickedButton, setClickedButton] = useState(6);

  return (
    <View>
      <View style={styles.timeControlContainer}>
        <View style={styles.perPlayerTimeControlContainer}>
          <Text
            style={
              isTimeLock
                ? styles.timeControlText
                : styles.perPlayerTimeControlText
            }
            adjustsFontSizeToFit={true}
          >
            {p1TimeControlText}
          </Text>
          {!isTimeLock ? (
            <Text style={styles.timeControlCaption}>P1</Text>
          ) : null}
        </View>
        {!isTimeLock ? (
          <View style={styles.perPlayerTimeControlContainer}>
            <Text
              style={
                isTimeLock
                  ? styles.timeControlText
                  : styles.perPlayerTimeControlText
              }
              adjustsFontSizeToFit={true}
            >
              {p2TimeControlText}
            </Text>
            <Text style={styles.timeControlCaption}>P2</Text>
          </View>
        ) : null}
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
                  button.id
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
                  button.id
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
                  button.id
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

  function onButtonPress(time, increment, delay, id) {
    setP1Time(time);
    setP1Increment(increment);
    setP1Delay(delay);
    setP2Time(time);
    setP2Increment(increment);
    setP2Delay(delay);
    setClickedButton(id);
  }

  function checkChanged(t, i, d) {
    let isChanged = true;
    if (
      p1Time === t &&
      p1Increment === i &&
      p1Delay === d &&
      p2Time === t &&
      p2Increment === i &&
      p2Delay === d
    ) {
      isChanged = false;
    }
    return isChanged;
  }
}

const styles = StyleSheet.create({
  timeControlContainer: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },

  perPlayerTimeControlContainer: {
    alignItems: "center",
  },

  timeControlText: {
    fontFamily: "FogtwoNo5",
    fontSize: 60,
    color: colors.black,
  },

  perPlayerTimeControlText: {
    fontFamily: "FogtwoNo5",
    fontSize: 50,
    color: colors.black,
  },

  timeControlCaption: {
    fontFamily: "ELM",
    fontSize: 18,
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
