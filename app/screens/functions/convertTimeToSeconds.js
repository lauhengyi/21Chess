import convertTimeToNum from "./convertTimeToNum";

function convertTimeToSeconds(number) {
  const [hours, minutes, seconds] = convertTimeToNum(number);
  return String(hours * 3600 + minutes * 60 + seconds);
}

export default convertTimeToSeconds;
