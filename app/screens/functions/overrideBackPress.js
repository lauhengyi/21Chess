import { useEffect } from "react";
import { BackHandler } from "react-native";
function overrideBackPress(setMenu) {
  //Override device back button to open menu instead
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);
  function handleBackButtonClick() {
    setMenu(true);
    return true;
  }
}

export default overrideBackPress;
