import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
function useOptions(varNum) {
  //Create loading component
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  //Create states for the options

  //Gamemodes
  const modeTypes = ["vs Computer", "vs Player (local)"];
  const [mode, setMode] = useState(1);
  const modeDetails = {
    values: modeTypes,
    selectedIndex: mode,
    onTabPress: setMode,
  };

  //Computer ai difficulty
  const comDiff = ["easy", "medium", "hard", "vs Heng Yi"];
  const [diff, setDiff] = useState(0);
  const diffDetails = {
    values: comDiff,
    selectedIndex: diff,
    onTabPress: setDiff,
  };

  //Autoturn
  const [isAutoturn, setAutoturn] = useState(true);
  const toggleAutoturn = () => setAutoturn((previousState) => !previousState);
  const isAutoturnDetails = {
    value: isAutoturn,
    onValueChange: toggleAutoturn,
  };

  const [isFlipped, setFlipped] = useState(true);
  const toggleFlipped = () => setFlipped((previousState) => !previousState);
  const isFlippedDetails = {
    value: isFlipped,
    onValueChange: toggleFlipped,
  };

  //Starting side
  const startingSide = ["white", "black"];
  const [side, setSide] = useState(1);
  const startingSideDetails = {
    values: startingSide,
    selectedIndex: side,
    onTabPress: setSide,
  };

  //Timer
  const [isChessClock, setChessClock] = useState(true);
  const toggleChessClock = () =>
    setChessClock((previousState) => !previousState);
  const isChessClockDetails = {
    value: isChessClock,
    onValueChange: toggleChessClock,
  };
  //Clicked button in time select
  const [clickedButton, setClickedButton] = useState(6);

  const [isTimeLock, setTimeLock] = useState(true);
  const toggleTimeLock = () => setTimeLock((previousState) => !previousState);
  const [isAdditional, setAdditional] = useState(false);
  const toggleAdditional = () =>
    setAdditional((previousState) => !previousState);
  const isAdditionalDetails = {
    value: isAdditional,
    onValueChange: toggleAdditional,
  };

  const [p1Time, setP1Time] = useState("1000");
  const [p2Time, setP2Time] = useState("1000");
  const [p1Increment, setP1Increment] = useState("0");
  const [p2Increment, setP2Increment] = useState("0");
  const [p1Delay, setP1Delay] = useState("0");
  const [p2Delay, setP2Delay] = useState("0");

  const timeDetails = {
    clickedButton: clickedButton,
    setClickedButton: setClickedButton,
    isTimeLock: isTimeLock,
    toggleTimeLock: toggleTimeLock,
    p1Time: p1Time,
    setP1Time: setP1Time,
    p2Time: p2Time,
    setP2Time: setP2Time,
    p1Increment: p1Increment,
    setP1Increment: setP1Increment,
    p2Increment: p2Increment,
    setP2Increment: setP2Increment,
    p1Delay: p1Delay,
    setP1Delay: setP1Delay,
    p2Delay: p2Delay,
    setP2Delay: setP2Delay,
  };

  //Default value
  const defaultOptions = {
    mode: 1,
    diff: 1,
    isAutoturn: true,
    isFlipped: false,
    startingSide: 1,
    isChessClock: true,
    isAdditional: false,
    timeDetails: {
      clickedButton: 6,
      isTimeLock: true,
      p1Time: "1000",
      p2Time: "1000",
      p1Increment: "0",
      p2Increment: "0",
      p1Delay: "0",
      p2Delay: "0",
    },
  };

  //The value to store after changes in options
  const options = {
    mode: mode,
    diff: diff,
    isAutoturn: isAutoturn,
    isFlipped: isFlipped,
    startingSide: side,
    isChessClock: isChessClock,
    isAdditional: isAdditional,
    timeDetails: {
      clickedButton: clickedButton,
      isTimeLock: isTimeLock,
      p1Time: p1Time,
      p2Time: p2Time,
      p1Increment: p1Increment,
      p2Increment: p2Increment,
      p1Delay: p1Delay,
      p2Delay: p2Delay,
    },
  };

  //Create key for async options storage
  const optionsKey = "@options" + String(varNum);
  useEffect(() => {
    async function getOptions() {
      try {
        const jsonValue = await AsyncStorage.getItem(optionsKey);
        return jsonValue != null ? JSON.parse(jsonValue) : defaultOptions;
      } catch (e) {
        throw new Error("Unable to get options");
      }
    }
    if (!loading) {
      //Load the details in
      getOptions()
        .then((options) => {
          setMode(options.mode);
          setDiff(options.diff);
          setAutoturn(options.isAutoturn);
          setFlipped(options.isFlipped);
          setSide(options.startingSide);
          setChessClock(options.isChessClock);
          setAdditional(options.isAdditional);
          setClickedButton(options.timeDetails.clickedButton);
          setTimeLock(options.timeDetails.isTimeLock);
          setP1Time(options.timeDetails.p1Time);
          setP2Time(options.timeDetails.p2Time);
          setP1Increment(options.timeDetails.p1Increment);
          setP2Increment(options.timeDetails.p2Increment);
          setP1Delay(options.timeDetails.p1Delay);
          setP2Delay(options.timeDetails.p2Delay);
        })
        .finally(() => setLoaded(true));
    }
  }, [loading]);

  useEffect(() => {
    async function saveOptions() {
      try {
        const jsonValue = JSON.stringify(options);
        await AsyncStorage.setItem(optionsKey, jsonValue);
      } catch (e) {
        throw new Error("Unable to save options");
      }
    }
    if (!loading) {
      saveOptions();
    }
  }, [options]);
  if (loading) {
    setLoading(false);
  }

  return {
    loaded,
    modeDetails,
    diffDetails,
    isAutoturnDetails,
    isFlippedDetails,
    startingSideDetails,
    isChessClockDetails,
    isAdditionalDetails,
    timeDetails,
  };
}

export default useOptions;
