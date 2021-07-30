function convertTimeToNum(time) {
  //get time Text
  let timeString = time;

  //normalise time
  while (timeString.length < 6) {
    timeString = "0" + timeString;
  }

  const hours = parseInt(timeString[0] + timeString[1]);
  const minutes = parseInt(timeString[2] + timeString[3]);
  const seconds = parseInt(timeString[4] + timeString[5]);

  return [hours, minutes, seconds];
}

export default convertTimeToNum;
