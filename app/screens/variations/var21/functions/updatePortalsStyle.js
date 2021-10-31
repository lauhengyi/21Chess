export default function updatePortalsStyle(
  style,
  color,
  position,
  portalDetails
) {
  const borderWidth = 2;
  if (!matrix[position + 8]) {
    style.borderTopWidth = borderWidth;
    style.borderTopColor = color;
  }
  if (!matrix[position + 1]) {
    style.borderRightWidth = borderWidth;
    style.borderRightColor = color;
  }
}

//return whether square have portal
function updatePortalStyles(style, position, portal, color1, color2) {
  if (portal.positions.includes(position)) {
    let frontColor = color1;
    let backColor = color2;
    if (!portal.direction) {
      frontColor = color2;
      backColor = color1;
    }
    if (portal.type === "x") {
    } else if (portal.type === "y") {
    }
  }
}
