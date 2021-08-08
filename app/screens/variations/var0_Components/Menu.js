import React from "react";
import { Modal, Text, View, Pressable, StyleSheet } from "react-native";
import colors from "../../../config/colors";

function Menu(props) {
  const navigation = props.navigation;
  const exitText = "M";

  return (
    <Modal animationType="fade" visible={props.isMenu} transparent={true}>
      <View style={styles.background}>
        <View style={styles.menuContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Menu</Text>
            <View style={styles.exitContainer}>
              <Text
                onPress={() => props.onExitPress(false)}
                style={styles.exitButton}
              >
                {exitText}
              </Text>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <Pressable>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Restart</Text>
              </View>
            </Pressable>
            <Pressable>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Instructions</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Welcome")}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Exit game</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  menuContainer: {
    alignItems: "center",
    backgroundColor: colors.tertiary,
    borderWidth: 1,
    borderColor: colors.grey2,
    width: "60%",
    padding: 10,
  },

  headerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },

  header: {
    fontFamily: "FogtwoNo5",
    fontSize: 50,
    color: colors.black,
  },

  exitContainer: {
    position: "absolute",
    right: 0,
    alignSelf: "baseline",
    alignItems: "flex-end",
    alignSelf: "baseline",
  },

  exitButton: {
    fontFamily: "ElegantIcons",
    fontSize: 30,
    color: colors.black,
  },

  buttonsContainer: {},

  button: {
    backgroundColor: colors.primary,
    margin: 15,
    borderWidth: 1,
    borderColor: colors.grey2,
    alignItems: "center",
  },

  buttonText: {
    padding: 5,
    fontFamily: "ELM",
    fontSize: 20,
    color: colors.black,
  },
});

export default Menu;