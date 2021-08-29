import React from "react";
import { Pressable, Animated } from "react-native";

function Clickable(props) {
  const animatedValue = new Animated.Value(1);
  const animatedStyle = {
    transform: [{ scale: animatedValue }],
  };

  function handlePressIn() {
    Animated.spring(animatedValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  }

  function handlePressOut() {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }
  return (
    <Pressable
      onPress={() => props.onPress()}
      onPressIn={() => handlePressIn()}
      onPressOut={() => handlePressOut()}
    >
      <Animated.View style={animatedStyle}>{props.children}</Animated.View>
    </Pressable>
  );
}

export default Clickable;
