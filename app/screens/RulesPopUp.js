import React from "react";
import { View, ScrollView, Text, Modal, StyleSheet } from "react-native";
import Clickable from "./components/Clickable";
import colorPalatte from "../config/colorPalatte";
import Var0Rules from "./Rules_Components/Var0Rules";

function RulesPopUp(props) {
  const varNum = props.varNum;
  const isVisible = props.isVisible;
  const setVisible = props.setVisible;
  const exitText = "M";

  const styles = getStyles(props.settings, colorPalatte);

  return (
    <Modal visible={isVisible} transparent={true} animationType={"slide"}>
      <View style={styles.background}>
        <View style={styles.instructionsContainer}>
          <ScrollView contentContainerStyle={styles.instructionsScroll}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>{props.title}</Text>
              <View style={styles.exitContainer}>
                <Clickable onPress={() => setVisible(false)}>
                  <Text style={styles.exitButton}>{exitText}</Text>
                </Clickable>
              </View>
            </View>
            <Text style={styles.subHeader}>{props.header}</Text>
            <View style={styles.rules}>
              <Rules varNum={varNum} settings={props.settings} />
            </View>
            <Text style={styles.endText}>~END~</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
function Rules(props) {
  const varNum = props.varNum;
  const settings = props.settings;
  const rulesList = [<Var0Rules settings={settings} />];
  return rulesList[varNum];
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
      padding: 15,
    },

    headerContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "center",
    },

    header: {
      fontFamily: "FogtwoNo5",
      fontSize: 40,
      color: colors.black,
    },

    subHeader: {
      fontFamily: "ELM",
      fontSize: 20,
      color: colors.black,
      marginBottom: 20,
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

    rules: {
      flex: 1,
    },

    endText: {
      fontFamily: "ELMB",
      fontSize: 15,
      color: colors.black,
    },
  });
}

export default RulesPopUp;
