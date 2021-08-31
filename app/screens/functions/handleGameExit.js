//Function that occurs when the game is exited midway via the menu exit button
async function handleGameExit(
  setMenu,
  setSaved,
  navigation,
  varNum,
  gameDetails,
  options,
  timeLeft
) {
  //Exit menu
  setMenu(false);
  //Navigate to welcome screen
  navigation.navigate("Welcome");
  //Store saved
  const saved = {
    varNum: varNum,
    gameDetails: gameDetails,
    options: options,
    timeLeft,
  };
  //Modify saved state
  setSaved(saved);
}
export default handleGameExit;
