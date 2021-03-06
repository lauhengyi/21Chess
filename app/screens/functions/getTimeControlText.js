import convertTimeToNum from "./convertTimeToNum";
import convertTimeToSeconds from "./convertTimeToSeconds";

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
  if (parseInt(increment) != "0") {
    incrementText = "|" + convertTimeToSeconds(increment);
  }

  let delayText = "";
  if (parseInt(delay) != 0) {
    delayText = " d" + convertTimeToSeconds(delay);
  }

  if (parseInt(increment) === 0 && parseInt(delay) === 0) {
    timeText = timeText + "min";
  } else if (increment === "0") {
    timeText = timeText + "|0";
  }

  return timeText + incrementText + delayText;
}

export default getTimeControlText;
