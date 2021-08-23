import React from "react";
import colors from "../config/colors";
import { View, StyleSheet, Text, Pressable } from "react-native";

function WelcomeScreen({ navigation, route }) {
  return (
    <>
      <View style={styles.background}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>CHESS</Text>
          <Text style={styles.caption}>Var. 21</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Pressable onPress={() => navigation.navigate("Select")}>
            <Text style={styles.button}>Play</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.button}>Random</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Settings")}>
            <Text style={styles.button}>Settings</Text>
          </Pressable>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>Lau Heng Yi</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.white,
  },

  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30%",
  },

  title: {
    fontFamily: "FogtwoNo5",
    fontSize: 120,
    color: colors.black,
  },

  caption: {
    fontFamily: "FogtwoNo5",
    fontSize: 30,
    color: colors.black,
  },

  buttonsContainer: {
    marginTop: "10%",
    alignItems: "center",
  },

  button: {
    fontFamily: "FogtwoNo5",
    fontSize: 60,
    marginBottom: "5%",
    color: colors.black,
  },

  nameContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },

  name: {
    fontFamily: "FogtwoNo5",
    fontSize: 15,
    margin: 5,
    color: colors.black,
  },
});

export default WelcomeScreen;
