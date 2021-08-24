import React from "react";
import colorPalatte from "../../config/colorPalatte";
import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

function VarContainer(props) {
  const navigation = useNavigation();
  const variation = props.var;
  const settings = props.settings;
  const styles = getStyles(settings, colorPalatte);
  return (
    <>
      <View style={styles.variationOuterContainer}>
        <View style={styles.variationInnerContainer}>
          <Text style={styles.varTitle}>{props.title}</Text>
          <Image
            style={styles.varPreview}
            source={require("../../assets/images/previews/placeHolder.jpg")}
          />
          <Text style={styles.varHeader}>{props.header}</Text>
          <Text style={styles.varCaption}>{props.caption}</Text>
          <View style={styles.varButtonsContainer}>
            <Pressable
              onPress={() =>
                navigation.navigate("VarLoad", {
                  varNum: variation,
                  title: props.title,
                  header: props.header,
                  caption: props.caption,
                  settings: settings,
                })
              }
            >
              <View style={styles.varButton}>
                <Text style={styles.varButtonText}>Play</Text>
              </View>
            </Pressable>
            <Pressable>
              <View style={styles.varButton}>
                <Text style={styles.varButtonText}>Rules</Text>
              </View>
            </Pressable>
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
