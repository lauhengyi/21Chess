import React from "react";
import { View, Text, Pressable, Switch, StyleSheet } from "react-native";
import colors from "../../config/colors";
import TimeController from "./TimeController";

function AdditionTimeControls(props) {
  const {
    isTimeLock,
    toggleTimeLock,
    p1Time,
    setP1Time,
    p2Time,
    setP2Time,
    p1Increment,
    setP1Increment,
    p2Increment,
    setP2Increment,
    p1Delay,
    setP1Delay,
    p2Delay,
    setP2Delay,
  } = props.timeDetails;

  function setTime(time) {
    setP1Time(time);
    setP2Time(time);
  }
  function setIncrement(increment) {
    setP1Increment(increment);
    setP2Increment(increment);
  }
  function setDelay(delay) {
    setP1Delay(delay);
    setP2Delay(delay);
  }

  const subHeaderStyle = props.textStyle;

  return (
    <View style={styles.background}>
      <View style={styles.controllerContainer}>
        <View style={styles.toggleOptionsContainer}>
          <Text style={subHeaderStyle}>Same time for both players</Text>
          <Switch
            trackColor={{ false: colors.grey1, true: colors.black }}
            thumbColor={colors.grey2}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTimeLock}
            value={isTimeLock}
          />
        </View>
      </View>
      {isTimeLock ? (
        <>
          <View style={styles.controllerContainer}>
            <TimeController
              text={"Time per player"}
              isTime={true}
              type={"both"}
              largeChange={"500"}
              smallChange={"100"}
              value={p1Time}
              setFunction={setTime}
            />
          </View>
          <View style={styles.controllerContainer}>
            <TimeController
              text={"Increment per player"}
              isTime={false}
              type={"both"}
              largeChange={"5"}
              smallChange={"1"}
              value={p1Increment}
              setFunction={setIncrement}
            />
          </View>
          <View style={styles.controllerContainer}>
            <TimeController
              text={"Delay per player"}
              isTime={false}
              type={"both"}
              largeChange={"5"}
              smallChange={"1"}
              value={p1Delay}
              setFunction={setDelay}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.controllerContainer}>
            <View style={styles.bothPlayerControllerContainer}>
              <TimeController
                text={"P1 time:"}
                isTime={true}
                type={"perPlayer"}
                largeChange={"500"}
                smallChange={"100"}
                value={p1Time}
                setFunction={setP1Time}
              />
              <TimeController
                text={"P2 time:"}
                isTime={true}
                type={"perPlayer"}
                largeChange={"500"}
                smallChange={"100"}
                value={p2Time}
                setFunction={setP2Time}
              />
            </View>
          </View>
          <View style={styles.controllerContainer}>
            <View style={styles.bothPlayerControllerContainer}>
              <TimeController
                text={"P1 increment:"}
                isTime={false}
                type={"perPlayer"}
                largeChange={"5"}
                smallChange={"1"}
                value={p1Increment}
                setFunction={setP1Increment}
              />
              <TimeController
                text={"P2 increment:"}
                isTime={false}
                type={"perPlayer"}
                largeChange={"5"}
                smallChange={"1"}
                value={p2Increment}
                setFunction={setP2Increment}
              />
            </View>
          </View>
          <View style={styles.controllerContainer}>
            <View style={styles.bothPlayerControllerContainer}>
              <TimeController
                text={"P1 delay:"}
                isTime={false}
                type={"perPlayer"}
                largeChange={"5"}
                smallChange={"1"}
                value={p1Delay}
                setFunction={setP1Delay}
              />
              <TimeController
                text={"P2 delay:"}
                isTime={false}
                type={"perPlayer"}
                largeChange={"5"}
                smallChange={"1"}
                value={p2Delay}
                setFunction={setP2Delay}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  toggleOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  bothPlayerControllerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  controllerContainer: {
    margin: 5,
  },
});

export default AdditionTimeControls;