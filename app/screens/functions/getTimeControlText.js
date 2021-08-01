import convertTimeToNum from "./convertTimeToNum";

//show time control text for one player
function getTimeControlText(time, increment, delay) {
  const [hours, minutes, seconds] = convertTimeToNum(time);

  //Add hours to minutes
  let timeText = String(hours * 60 + minutes);
  //Update time text for 30 seconds
  if (seconds === 30) {
    timeText = "0.5";
  }

  let incrementText = "";
  if (increment != "0") {
    incrementText = "|" + increment;
  }

  let delayText = "";
  if (delay != "0") {
    delayText = " d" + delay;
  }

  if (increment === "0" && delay === "0") {
    timeText = timeText + "min";
  } else if (increment === "0") {
    timeText = timeText + "|0";
  }

  return timeText + incrementText + delayText;
}

export default getTimeControlText;
