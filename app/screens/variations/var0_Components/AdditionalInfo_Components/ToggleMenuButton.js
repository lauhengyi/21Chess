import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { colors } from "react-native-elements";

function ToggleMenuButton(props) {
  const buttonText = "b";
  return (
    <Pressable onPress={() => {}}>
      <View style={styles.buttonContainer}>
        <Text
          onPress={() => props.onButtonPress(true)}
          style={styles.buttonText}
        >
          {buttonText}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  buttonText: {
    fontFamily: "ElegantIcons",
    fontSize: 30,
    color: colors.black,
  },
});

export default ToggleMenuButton;
