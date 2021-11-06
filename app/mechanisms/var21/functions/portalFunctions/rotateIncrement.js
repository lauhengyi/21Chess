export default function rotateIncrement(increment, rotation) {
  switch (rotation) {
    case 0:
      return increment;
    case 90:
      return rotate90(increment);
    case 180:
      return rotate180(increment);
    case 270:
      return rotate270(increment);
  }
}

function rotate180(increment) {
  return -increment;
}

function rotate90(increment) {
  switch (increment) {
    case 8:
      return 1;
    case 1:
      return -8;
    case -8:
      return -1;
    case -1:
      return 8;
    case 7:
      return 9;
    case 9:
      return -7;
    case -7:
      return -9;
    case -9:
      return 7;
  }
}

function rotate270(increment) {
  const newIncrement = rotate180(increment);
  return rotate90(newIncrement);
}
