import React, { useState } from "react";
import colorPalatte from "../../config/colorPalatte";
import { View, StyleSheet, Text, Image } from "react-native";
import Clickable from "../components/Clickable";
import { useNavigation } from "@react-navigation/native";
import varData from "./varData";
import RulesPopUp from "../RulesPopUp";

function VarContainer(props) {
  const navigation = useNavigation();
  const varNum = props.varNum;
  const { title, header, caption } = varData[varNum];
  const settings = props.settings;
  const [isRules, setRules] = useState(false);
  const styles = getStyles(settings, colorPalatte);

  return (
    <>
      <RulesPopUp
        varNum={varNum}
        isVisible={isRules}
        setVisible={setRules}
        settings={settings}
      />
      <View style={styles.variationOuterContainer}>
        <View style={styles.variationInnerContainer}>
          <Text style={styles.varTitle}>{title}</Text>
          <Image
            style={styles.varPreview}
            source={require("../../assets/images/previews/placeHolder.jpg")}
          />
          <Text style={styles.varHeader}>{header}</Text>
          <Text style={styles.varCaption}>{caption}</Text>
          <View style={styles.varButtonsContainer}>
            <Clickable
              onPress={() =>
                navigation.navigate("VarLoad", {
                  varNum: varNum,
                  settings: settings,
                })
              }
            >
              <View style={styles.varButton}>
                <Text style={styles.varButtonText}>Play</Text>
              </View>
            </Clickable>
            <Clickable onPress={() => setRules(true)}>
              <View style={styles.varButton}>
                <Text style={styles.varButtonText}>Rules</Text>
              </View>
            </Clickable>
          </View>
        </View>
      </View>
    </>
  );
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return StyleSheet.create({
    variationOuterContainer: {
      backgroundColor: colors.secondary,
      width: "90%",
      height: 330,
      alignItems: "center",
      marginBottom: 30,
      marginTop: 20,
    },

    variationInnerContainer: {},

    varTitle: {
      fontFamily: "FogtwoNo5",
      fontSize: 30,
      alignSelf: "flex-start",
      color: colors.black,
      marginTop: 5,
    },

    varPreview: {
      height: 150,
      width: 300,
      resizeMode: "cover",
    },

    varHeader: {
      fontFamily: "ELM",
      fontSize: 25,
      alignSelf: "center",
      color: colors.black,
    },

    varOrnament: {},

    varCaption: {
      fontFamily: "ELM",
      fontSize: 18,
      alignSelf: "center",
      color: colors.black,
      paddingBottom: 15,
    },

    varButtonsContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginBottom: 40,
    },

    varButton: {
      backgroundColor: colors.tertiary,
      width: 100,
    },

    varButtonText: {
      fontFamily: "FogtwoNo5",
      fontSize: 25,
      color: colors.black,
      alignSelf: "center",
      padding: 5,
    },
  });
}

export default VarContainer;
