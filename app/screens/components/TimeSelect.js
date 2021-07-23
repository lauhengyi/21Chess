import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Icon } from "react-native-elements";

function TimeSelect(props) {
  let { isTimeLock, toggleTimeLock, p1, p2, setP1, setP2 } = props.timeDetails;
  return (
    <View>
      <TextInput
        style={styles.textInput}
        keyboardType="phone-pad"
        maxLength={9}
        onChangeText={(time) => setP1(time)}
        value={formatStringtoTime(p1)}
      />
      <Icon class="fa fa-lock" aria-hidden="true" />
    </View>
  );
  function formatStringtoTime(text) {
    //replace text to only numbers
    let number = text.replace(/[^0-9]/g, "");

    //format numbers so that length always == 6
    while (number.length != 6) {
      number = "0" + number;
    }
    return (
      number[0] +
      number[1] +
      ":" +
      number[2] +
      number[3] +
      ":" +
      number[4] +
      number[5]
    );
  }
}

const styles = StyleSheet.create({
  textInput: {},
});
export default TimeSelect;
