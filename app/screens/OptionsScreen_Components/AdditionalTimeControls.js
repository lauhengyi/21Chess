import React from "react";
import { View, Text, Pressable, Switch, StyleSheet } from "react-native";
import { set } from "react-native-reanimated";
import colors from "../../config/colors";
import TimeText from "../components/TimeText";
import changeTimeValue from "../functions/changeTimeValue";

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
  const subHeaderStyle = props.textStyle;
  const fastIncrementText = ">";
  const slowIncrementText = ":";
  const fastDecrementText = "?";
  const slowDecrementText = ";";

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
            <Text style={subHeaderStyle}>Time per player:</Text>
            <View style={styles.controller}>
              <Pressable
                onPress={() =>
                  handleTimePress(p1Time, "-500", setP1Time, setP2Time)
                }
              >
                <Text style={styles.buttonText}>{fastDecrementText}</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  handleTimePress(p1Time, "-100", setP1Time, setP2Time)
                }
              >
                <Text style={styles.buttonText}>{slowDecrementText}</Text>
              </Pressable>
              <View style={styles.valueText}>
                <TimeText value={p1Time} style={subHeaderStyle} />
              </View>
              <Pressable
                onPress={() =>
                  handleTimePress(p1Time, "100", setP1Time, setP2Time)
                }
              >
                <Text style={styles.buttonText}>{slowIncrementText}</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  handleTimePress(p1Time, "500", setP1Time, setP2Time)
                }
              >
                <Text style={styles.buttonText}>{fastIncrementText}</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.controllerContainer}>
            <Text style={subHeaderStyle}>Increment per player(min):</Text>
            <View style={styles.controller}>
              <Pressable
                onPress={() =>
                  handleOtherPress(
                    p1Increment,
                    "-5",
                    setP1Increment,
                    setP2Increment
                  )
                }
              >
                <Text style={styles.buttonText}>{fastDecrementText}</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  handleOtherPress(
                    p1Increment,
                    "-1",
                    setP1Increment,
                    setP2Increment
                  )
                }
              >
                <Text style={styles.buttonText}>{slowDecrementText}</Text>
              </Pressable>
              <View style={styles.valueText}>
                <Text style={subHeaderStyle}>{p1Increment}</Text>
              </View>
              <Pressable
                onPress={() =>
                  handleOtherPress(
                    p1Increment,
                    "1",
                    setP1Increment,
                    setP2Increment
                  )
                }
              >
                <Text style={styles.buttonText}>{slowIncrementText}</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  handleOtherPress(
                    p1Increment,
                    "5",
                    setP1Increment,
                    setP2Increment
                  )
                }
              >
                <Text style={styles.buttonText}>{fastIncrementText}</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.controllerContainer}>
            <Text style={subHeaderStyle}>Delay per player(sec):</Text>
            <View style={styles.controller}>
              <Pressable
                onPress={() =>
                  handleOtherPress(p1Delay, "-5", setP1Delay, setP2Delay)
                }
              >
                <Text style={styles.buttonText}>{fastDecrementText}</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  handleOtherPress(p1Delay, "-1", setP1Delay, setP2Delay)
                }
              >
                <Text style={styles.buttonText}>{slowDecrementText}</Text>
              </Pressable>
              <View style={styles.valueText}>
                <Text style={subHeaderStyle}>{p1Delay}</Text>
              </View>
              <Pressable
                onPress={() =>
                  handleOtherPress(p1Delay, "1", setP1Delay, setP2Delay)
                }
              >
                <Text style={styles.buttonText}>{slowIncrementText}</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  handleOtherPress(p1Delay, "5", setP1Delay, setP2Delay)
                }
              >
                <Text style={styles.buttonText}>{fastIncrementText}</Text>
              </Pressable>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.controllerContainer}>
            <View style={styles.bothPlayerControllerContainer}>
              <View style={styles.perPlayerControllerContainer}>
                <Text style={subHeaderStyle}>P1 time:</Text>
                <View style={styles.controller}>
                  <Pressable
                    onPress={() => handleTimePress(p1Time, "-500", setP1Time)}
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {fastDecrementText}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleTimePress(p1Time, "-100", setP1Time)}
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {slowDecrementText}
                    </Text>
                  </Pressable>
                  <View style={styles.perPlayerValueText}>
                    <TimeText value={p1Time} style={styles.perPlayerTimeText} />
                  </View>
                  <Pressable
                    onPress={() => handleTimePress(p1Time, "100", setP1Time)}
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {slowIncrementText}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleTimePress(p1Time, "500", setP1Time)}
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {fastIncrementText}
                    </Text>
                  </Pressable>
                </View>
              </View>
              <View style={styles.perPlayerControllerContainer}>
                <Text style={subHeaderStyle}>P2 time:</Text>
                <View style={styles.controller}>
                  <Pressable
                    onPress={() => handleTimePress(p2Time, "-500", setP2Time)}
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {fastDecrementText}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleTimePress(p2Time, "-100", setP2Time)}
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {slowDecrementText}
                    </Text>
                  </Pressable>
                  <View style={styles.perPlayerValueText}>
                    <TimeText value={p2Time} style={styles.perPlayerTimeText} />
                  </View>
                  <Pressable
                    onPress={() => handleTimePress(p2Time, "100", setP2Time)}
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {slowIncrementText}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleTimePress(p2Time, "500", setP2Time)}
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {fastIncrementText}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.controllerContainer}>
            <View style={styles.bothPlayerControllerContainer}>
              <View style={styles.perPlayerControllerContainer}>
                <Text style={subHeaderStyle}>P1 increment(min):</Text>
                <View style={styles.controller}>
                  <Pressable
                    onPress={() =>
                      handleOtherPress(p1Increment, "-5", setP1Increment)
                    }
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {fastDecrementText}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      handleOtherPress(p1Increment, "-1", setP1Increment)
                    }
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {slowDecrementText}
                    </Text>
                  </Pressable>
                  <View style={styles.perPlayerValueText}>
                    <Text style={styles.perPlayerTimeText}>{p1Increment}</Text>
                  </View>
                  <Pressable
                    onPress={() =>
                      handleOtherPress(p1Increment, "1", setP1Increment)
                    }
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {slowIncrementText}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      handleOtherPress(p1Increment, "5", setP1Increment)
                    }
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {fastIncrementText}
                    </Text>
                  </Pressable>
                </View>
              </View>
              <View style={styles.perPlayerControllerContainer}>
                <Text style={subHeaderStyle}>P2 increment(min):</Text>
                <View style={styles.controller}>
                  <Pressable
                    onPress={() =>
                      handleOtherPress(p2Increment, "-5", setP2Increment)
                    }
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {fastDecrementText}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      handleOtherPress(p2Increment, "-1", setP2Increment)
                    }
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {slowDecrementText}
                    </Text>
                  </Pressable>
                  <View style={styles.perPlayerValueText}>
                    <Text style={styles.perPlayerTimeText}>{p2Increment}</Text>
                  </View>
                  <Pressable
                    onPress={() =>
                      handleOtherPress(p2Increment, "1", setP2Increment)
                    }
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {slowIncrementText}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      handleOtherPress(p2Increment, "5", setP2Increment)
                    }
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {fastIncrementText}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.controllerContainer}>
            <View style={styles.bothPlayerControllerContainer}>
              <View style={styles.perPlayerControllerContainer}>
                <Text style={subHeaderStyle}>P1 delay(sec):</Text>
                <View style={styles.controller}>
                  <Pressable
                    onPress={() => handleOtherPress(p1Delay, "-5", setP1Delay)}
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {fastDecrementText}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleOtherPress(p1Delay, "-1", setP1Delay)}
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {slowDecrementText}
                    </Text>
                  </Pressable>
                  <View style={styles.perPlayerValueText}>
                    <Text style={styles.perPlayerTimeText}>{p1Delay}</Text>
                  </View>
                  <Pressable
                    onPress={() => handleOtherPress(p1Delay, "1", setP1Delay)}
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {slowIncrementText}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleOtherPress(p1Delay, "5", setP1Delay)}
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {fastIncrementText}
                    </Text>
                  </Pressable>
                </View>
              </View>
              <View style={styles.perPlayerControllerContainer}>
                <Text style={subHeaderStyle}>P2 delay(sec):</Text>
                <View style={styles.controller}>
                  <Pressable
                    onPress={() => handleOtherPress(p2Delay, "-5", setP2Delay)}
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {fastDecrementText}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleOtherPress(p2Delay, "-1", setP2Delay)}
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {slowDecrementText}
                    </Text>
                  </Pressable>
                  <View style={styles.perPlayerValueText}>
                    <Text style={styles.perPlayerTimeText}>{p2Delay}</Text>
                  </View>
                  <Pressable
                    onPress={() => handleOtherPress(p2Delay, "1", setP2Delay)}
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {slowIncrementText}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleOtherPress(p2Delay, "5", setP2Delay)}
                  >
                    <Text style={styles.perPlayerButtonText}>
                      {fastIncrementText}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );

  //Note: both value and change are strings of numbers i.e. NaN
  function handleTimePress(value, change, setFunction, set2Function) {
    const actualValue = parseInt(value);
    const actualChange = parseInt(change);
    let setValue;

    if (-actualChange >= actualValue && actualValue > 30) {
      setValue = "30";
    } else if (actualChange > 0 && actualValue === 30) {
      setValue = "30";
    } else if (actualValue === 0 && actualChange === 100) {
      setValue = "30";
    } else {
      setValue = changeTimeValue(value, change);
    }

    setFunction(setValue);
    if (set2Function) {
      set2Function(setValue);
    }
  }

  function handleOtherPress(value, change, setFunction, set2Function) {
    const actualValue = parseInt(value);
    const actualChange = parseInt(change);
    let setValue;

    if (-actualChange > actualValue) {
      setValue = "0";
    } else {
      setValue = String(actualValue + actualChange);
    }

    setFunction(setValue);
    if (set2Function) {
      set2Function(setValue);
    }
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  toggleOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  controllerContainer: {
    margin: 5,
  },

  controller: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    marginHorizontal: 5,
    fontFamily: "ElegantIcons",
    fontSize: 30,
    color: colors.black,
  },

  valueText: {
    width: 100,
    alignItems: "center",
  },

  bothPlayerControllerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  perPlayerControllerContainer: {},

  perPlayerValueText: {
    alignItems: "center",
    width: 80,
  },

  perPlayerButtonText: {
    marginHorizontal: 1,
    fontFamily: "ElegantIcons",
    fontSize: 20,
    color: colors.black,
  },

  perPlayerTimeText: {
    fontFamily: "ELM",
    fontSize: 15,
    color: colors.black,
  },
});

export default AdditionTimeControls;
