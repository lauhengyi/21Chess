import React from "react";
import { View, ScrollView, Text, Modal, StyleSheet } from "react-native";
import Clickable from "./components/Clickable";
import colorPalatte from "../config/colorPalatte";
import varData from "./VarLoadScreen_Components/varData";
import Var0Rules from "./Rules_Components/Var0Rules";
import Var1Rules from "./Rules_Components/Var1Rules";
import Var2Rules from "./Rules_Components/Var2Rules";
import Var3Rules from "./Rules_Components/Var3Rules";
import Var4Rules from "./Rules_Components/Var4Rules";
import Var5Rules from "./Rules_Components/Var5Rules";
import Var6Rules from "./Rules_Components/Var6Rules";
import Var7Rules from "./Rules_Components/Var7Rules";
import Var8Rules from "./Rules_Components/Var8Rules";
import Var9Rules from "./Rules_Components/Var9Rules";
import Var10Rules from "./Rules_Components/Var10Rules";
import Var11Rules from "./Rules_Components/Var11Rules";

function RulesPopUp(props) {
  const varNum = props.varNum;
  const isVisible = props.isVisible;
  const setVisible = props.setVisible;
  const exitText = "M";

  //Load title and header
  const { title, header } = varData[varNum];

  const styles = getStyles(props.settings, colorPalatte);

  return (
    <Modal visible={isVisible} transparent={true} animationType={"slide"}>
      <View style={styles.background}>
        <View style={styles.instructionsContainer}>
          <ScrollView contentContainerStyle={styles.instructionsScroll}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.exitContainer}>
                <Clickable onPress={() => setVisible(false)}>
                  <Text style={styles.exitButton}>{exitText}</Text>
                </Clickable>
              </View>
            </View>
            <Text style={styles.header}>{header}</Text>
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
  const rulesList = [
    <Var0Rules settings={settings} />,
    <Var1Rules settings={settings} />,
    <Var2Rules settings={settings} />,
    <Var3Rules settings={settings} />,
    <Var4Rules settings={settings} />,
    <Var5Rules settings={settings} />,
    <Var6Rules settings={settings} />,
    <Var7Rules settings={settings} />,
    <Var8Rules settings={settings} />,
    <Var9Rules settings={settings} />,
    <Var10Rules settings={settings} />,
    <Var11Rules settings={settings} />,
  ];
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

    titleContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "center",
    },

    title: {
      fontFamily: "FogtwoNo5",
      fontSize: 40,
      color: colors.black,
    },

    header: {
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
