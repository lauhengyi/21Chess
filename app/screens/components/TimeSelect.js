import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import TimeControlButton from "./TimeControlButton";
import colors from "../../config/colors";
import TimeText from "./TimeText";

function TimeSelect(props) {
  const {
    isTimeLock,
    toggleTimeLock,
    p1,
    p2,
    setP1,
    setP2,
    increment,
    setIncrement,
    delay,
    setDelay,
  } = props.timeDetails;

  const bulletButtons = [
    {
      id: 0,
      time: "100",
      increment: "0",
    },

    {
      id: 1,
      time: "100",
      increment: "1",
    },

    {
      id: 2,
      time: "200",
      increment: "1",
    },
  ];

  const blizButtons = [
    {
      id: 3,
      time: "300",
      increment: "0",
    },

    {
      id: 4,
      time: "300",
      increment: "2",
    },

    {
      id: 5,
      time: "500",
      increment: "0",
    },
  ];

  const rapidButton = [
    {
      id: 6,
      time: "1000",
      increment: "0",
    },

    {
      id: 7,
      time: "3000",
      increment: "0",
    },

    {
      id: 8,
      time: "1500",
      increment: "10",
    },
  ];

  const timeControlText = getTimeControlText(p1, increment, delay);
  const [clickedButton, setClickedButton] = useState(0);

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
              text={getTimeControlText(button.time, button.increment, "0")}
              onButtonPress={() =>
                onButtonPress(button.time, button.increment, button.id, setP1)
              }
              clickedButton={clickedButton}
            />
          ))}
        </View>
        <View style={styles.buttonsColumnCenter}>
          <Text style={styles.timeTypeText}>Bliz</Text>
          {blizButtons.map((button) => (
            <TimeControlButton
              key={button.id}
              id={button.id}
              text={getTimeControlText(button.time, button.increment, "0")}
              onButtonPress={() =>
                onButtonPress(button.time, button.increment, button.id, setP1)
              }
              clickedButton={clickedButton}
            />
          ))}
        </View>
        <View style={styles.buttonsColumn}>
          <Text style={styles.timeTypeText}>Rapid</Text>
          {rapidButton.map((button) => (
            <TimeControlButton
              key={button.id}
              id={button.id}
              text={getTimeControlText(button.time, button.increment, "0")}
              onButtonPress={() =>
                onButtonPress(button.time, button.increment, button.id, setP1)
              }
              clickedButton={clickedButton}
            />
          ))}
        </View>
      </View>
      <TimeText style={styles.timeText} value={p1} />
      <Icon class="fa fa-lock" aria-hidden="true" />
    </View>
  );

  //show time control text for one player
  function getTimeControlText(time, increment, delay) {
    const [hours, minutes] = convertTimetoNum(time);

    //Add hours to minutes
    let timeText = String(hours * 60 + minutes);

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

  function convertTimetoNum(time) {
    //get time Text
    let timeString = time;

    //normalise time
    while (timeString.length < 6) {
      timeString = "0" + timeString;
    }

    const hours = parseInt(timeString[0] + timeString[1]);
    const minutes = parseInt(timeString[2] + timeString[3]);
    const seconds = parseInt(timeString[4] + timeString[5]);

    return [hours, minutes, seconds];
  }

  function onButtonPress(time, increment, id, setTime) {
    setTime(time);
    setIncrement(increment);
    setClickedButton(id);
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
