import React from "react";
import { View, ScrollView, Text, Modal, StyleSheet } from "react-native";
import Clickable from "./components/Clickable";
import colorPalatte from "../config/colorPalatte";

function RulesPopUp(props) {
  const varNum = props.varNum;
  const isVisible = props.isVisible;
  const setVisible = props.setVisible;
  const header = "Var. " + String(varNum);
  const exitText = "M";

  const styles = getStyles(props.settings, colorPalatte);

  return (
    <Modal visible={isVisible} transparent={true} animationType={"slide"}>
      <View style={styles.background}>
        <View style={styles.instructionsContainer}>
          <ScrollView contentContainerStyle={styles.instructionsScroll}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>{header}</Text>
              <View style={styles.exitContainer}>
                <Clickable onPress={() => setVisible(false)}>
                  <Text style={styles.exitButton}>{exitText}</Text>
                </Clickable>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    instructionsContainer: {
      alignSelf: "center",
      backgroundColor: colors.tertiary,
      width: "80%",
      height: "70%",
      borderColor: colors.grey1,
      borderWidth: 1,
    },

    instructionsScroll: {
      alignItems: "center",
      padding: 10,
    },

    headerContainer: {
      margin: 5,
      flexDirection: "row",
      width: "100%",
      justifyContent: "center",
    },

    header: {
      fontFamily: "FogtwoNo5",
      fontSize: 40,
      color: colors.black,
    },

    exitContainer: {
      position: "absolute",
      right: 7,
      alignSelf: "baseline",
      alignItems: "flex-end",
      alignSelf: "baseline",
    },

    exitButton: {
      fontFamily: "ElegantIcons",
      fontSize: 35,
      color: colors.black,
    },
  });
}

export default RulesPopUp;
