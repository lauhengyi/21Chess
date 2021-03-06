import { color } from "jimp";
import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import colorPalatte from "../../config/colorPalatte";
import Clickable from "../components/Clickable";

function CreditsPopUp(props) {
  const isVisible = props.isVisible;
  const styles = getStyles(props.settings, colorPalatte);
  const exitText = "M";
  //Create component for the main credits that accept a props header and a string name as a child
  function CreditsMain(props) {
    const header = props.header;
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.mainHeader}>{header}</Text>
        <Text style={styles.mainName}>{props.children}</Text>
      </View>
    );
  }

  //Create component for the special thanks that accept a props header and a string name as a child
  function CreditsSpecial(props) {
    const header = props.header;
    return (
      <View style={styles.specialContainer}>
        <Text style={styles.specialName}>{props.children}</Text>
        <Text style={styles.specialHeader}>{header}</Text>
      </View>
    );
  }
  return (
    <Modal visible={isVisible} transparent={true} animationType={"fade"}>
      <View style={styles.background}>
        <View style={styles.creditsContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Credits</Text>
            <View style={styles.exitContainer}>
              <Clickable onPress={() => props.setVisible(false)}>
                <Text style={styles.exitButton}>{exitText}</Text>
              </Clickable>
            </View>
          </View>
          <View style={styles.creditsMainContainer}>
            <CreditsMain header={"Creator"}>Lau Heng Yi</CreditsMain>
            <CreditsMain header={"Game Designer"}>Lau Heng Yi</CreditsMain>
            <CreditsMain header={"Developer"}>Lau Heng Yi</CreditsMain>
            <CreditsMain header={"Human Resources"}>Lau Heng Yi</CreditsMain>
          </View>
          <Text style={styles.subHeader}>Special thanks to:</Text>
          <View style={styles.creditsSpecialContainer}>
            <CreditsSpecial
              header={"for giving me his phone to bug test my app"}
            >
              Teo Jun Hao
            </CreditsSpecial>
            <CreditsSpecial header={"for informing me of chess rules"}>
              Ho Xu Wen
            </CreditsSpecial>
            <CreditsSpecial
              header={"for providing me with snacks while coding"}
            >
              Jowen Ng
            </CreditsSpecial>
            <CreditsSpecial header={"for providing me his phone for googling"}>
              Akshay Changaroth
            </CreditsSpecial>
            <CreditsSpecial header={"for contributing his bandwidth"}>
              Eng Kai
            </CreditsSpecial>
            <CreditsSpecial header={"for figuring out the portal mechanics"}>
              Tan Ek Hohn
            </CreditsSpecial>
          </View>
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

    creditsContainer: {
      alignSelf: "center",
      backgroundColor: colors.tertiary,
      width: "80%",
      borderColor: colors.grey1,
      borderWidth: 1,
      alignItems: "center",
      padding: 10,
      borderRadius: 10,
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

    mainContainer: {
      alignItems: "center",
    },

    mainHeader: {
      fontFamily: "ELM",
      fontSize: 20,
      color: colors.black,
    },

    mainName: {
      fontFamily: "ELM",
      fontSize: 15,
      color: colors.grey3,
    },

    subHeader: {
      fontFamily: "ELM",
      fontSize: 30,
      color: colors.black,
      marginTop: 15,
    },

    creditsSpecialContainer: {},

    specialContainer: {
      marginVertical: 5,
    },

    specialName: {
      fontFamily: "ELMB",
      fontSize: 15,
      color: colors.black,
      marginRight: 3,
    },
    specialHeader: {
      fontFamily: "ELM",
      fontSize: 15,
      color: colors.grey3,
    },
  });
}

export default CreditsPopUp;
