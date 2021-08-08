import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import colors from "../../config/colors";

function TimeControlButton(props) {
  //checked whether clicked
  let isClicked = false;
  if (props.clickedButton === props.id) {
    isClicked = true;
  }
  return (
    <Pressable onPress={() => props.onButtonPress()}>
      <View style={isClicked ? styles.clickedContainer : styles.container}>
        <Text style={isClicked ? styles.clickedText : styles.text}>
          {props.isChanged && isClicked ? props.text + "*" : props.text}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  clickedContainer: {
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 5,
    alignContent: "center",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: colors.black,
  },

  clickedText: {
    fontFamily: "ELM",
    fontSize: 20,
    color: colors.white,
  },

  container: {
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 5,
    alignContent: "center",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: colors.white,
  },

  text: {
    fontFamily: "ELM",
    fontSize: 20,
    color: colors.black,
  },
});

export default TimeControlButton;