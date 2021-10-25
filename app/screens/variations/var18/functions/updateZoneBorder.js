export default function updateZoneBorder(style, color, position, matrix) {
  const borderWidth = 2;
  if (checkTopEdge(position) || !matrix[position + 8]) {
    style.borderTopWidth = borderWidth;
    style.borderTopColor = color;
  }
  if (checkBottomEdge(position) || !matrix[position - 8]) {
    style.borderBottomWidth = borderWidth;
    style.borderBottomColor = color;
  }
  if (checkLeftEdge(position) || !matrix[position - 1]) {
    style.borderLeftWidth = borderWidth;
    style.borderLeftColor = color;
  }
  if (checkRightEdge(position) || !matrix[position + 1]) {
    style.borderRightWidth = borderWidth;
    style.borderRightColor = color;
  }
}

function checkTopEdge(position) {
  return position > 55;
}

function checkBottomEdge(position) {
  return position < 8;
}

function checkLeftEdge(position) {
  return (position + 8) % 8 === 0;
}

function checkRightEdge(position) {
  return (position + 9) % 8 === 0;
}
