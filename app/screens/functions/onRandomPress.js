export default function onRandomPress(navigation, settings) {
  const varNum = Math.floor(Math.random() * 22);
  navigation.navigate("VarLoad", {
    varNum: varNum,
    settings: settings,
  });
}
