import React from "react";
import { Modal, Text, View, Pressable, StyleSheet } from "react-native";
import colors from "../../../config/colors";

function Menu(props) {
  return (
    <Modal animationType="fade" visible={props.isMenu} transparent={true}>
      <View style={styles.menuContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Menu</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Pressable>
            <View style={styles.button}>
              <Text style={styles.buttonText}>P1 resign</Text>
            </View>
          </Pressable>
          <Pressable>
            <View style={styles.button}>
              <Text style={styles.buttonText}>P2 resign</Text>
            </View>
          </Pressable>
          <Pressable>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Declare draw</Text>
            </View>
          </Pressable>
          <Pressable>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Instructions</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: colors.grey1,
    alignSelf: "center",
    alignItems: "center",
  },

  headerContainer: {},

  header: {
    fontFamily: "FogtwoNo5",
    fontSize: 50,
    color: colors.black,
  },

  buttonsContainer: {},

  button: {
    backgroundColor: colors.tertiary,
    margin: 15,
    alignItems: "center",
  },

  buttonText: {
    fontFamily: "ELM",
    fontSize: 20,
    color: colors.black,
  },
});

export default Menu;
