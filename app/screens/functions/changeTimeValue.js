import convertTimeToNum from "./convertTimeToNum";

function changeTimeValue(value, change) {
  //get hours, minutes, seconds
  let [hours, minutes, seconds] = convertTimeToNum(value);

  //categoriseChange
  //Check for add or minus
  let changeString = change;
  let isNegative = false;
  if (changeString[0] === "-") {
    changeString = changeString.slice(-(changeString.length - 1));
    isNegative = true;
  }

  let [changeHours, changeMinutes, changeSeconds] =
    convertTimeToNum(changeString);

  //Factor in negative
  if (isNegative) {
    changeHours = -changeHours;
    changeMinutes = -changeMinutes;
    changeSeconds = -changeSeconds;
  }

  //Carry out change
  hours += changeHours;
  minutes += changeMinutes;
  seconds += changeSeconds;

  //account for excess and negatives
  while (seconds < 0) {
    minutes -= 1;
    seconds += 60;
  }
  while (seconds > 59) {
    minutes += 1;
    seconds -= 60;
  }

  while (minutes < 0) {
    hours -= 1;
    minutes += 60;
  }
  while (minutes > 59) {
    hours += 1;
    minutes -= 60;
  }

  if (hours < 0) {
    hours = 0;
    minutes = 0;
    seconds = 0;
  }

  if (hours > 99) {
    hours = 99;
    minutes = 99;
    seconds = 99;
  }

  return formatNum(hours) + formatNum(minutes) + formatNum(seconds);
}

function formatNum(num) {
  let numString = String(num);
  while (numString.length < 2) {
    numString = "0" + numString;
  }
  return numString;
}

export default changeTimeValue;
