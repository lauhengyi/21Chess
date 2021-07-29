import React from "react";
import { Text } from "react-native";

function TimeText(props) {
  const value = props.value;
  const time = formatValue(value);
  return <Text style={props.style}>{time}</Text>;

  function formatValue(value) {
    let normalisedTime = value;
    while (normalisedTime.length < 6) {
      normalisedTime = "0" + normalisedTime;
    }

    return (
      normalisedTime[0] +
      normalisedTime[1] +
      ":" +
      normalisedTime[2] +
      normalisedTime[3] +
      ":" +
      normalisedTime[4] +
      normalisedTime[5]
    );
  }
}

export default TimeText;
