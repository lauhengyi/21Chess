export default function updateAllPortalStyles(
  style,
  colors,
  position,
  portalDetails
) {
  updatePortalStyles(
    style,
    position,
    portalDetails.currentPortals[0],
    "red",
    "orange"
  );
  updatePortalStyles(
    style,
    position,
    portalDetails.currentPortals[1],
    "red",
    "orange"
  );
  updatePortalStyles(
    style,
    position,
    portalDetails.nextPortals[0],
    "blue",
    "green"
  );
  updatePortalStyles(
    style,
    position,
    portalDetails.nextPortals[1],
    "blue",
    "green"
  );
}

//return whether square have portal
function updatePortalStyles(style, position, portal, color1, color2) {
  if (portal.type === "x") {
    if (portal.positions1.includes(position)) {
      const color = portal.direction ? color1 : color2;
      updateXPosition1(style, color);
    } else if (portal.positions2.includes(position)) {
      const color = portal.direction ? color2 : color1;
      updateXPosition2(style, color);
    }
  } else if (portal.type === "y") {
    if (portal.positions1.includes(position)) {
      const color = portal.direction ? color1 : color2;
      updateYPosition1(style, color);
    } else if (portal.positions2.includes(position)) {
      const color = portal.direction ? color2 : color1;
      updateYPosition2(style, color);
    }
  }
}

function updateXPosition1(style, color) {
  style.borderTopWidth = 4;
  style.borderTopColor = color;
}
function updateXPosition2(style, color) {
  style.borderBottomWidth = 4;
  style.borderBottomColor = color;
}
function updateYPosition1(style, color) {
  style.borderRightWidth = 4;
  style.borderRightColor = color;
}
function updateYPosition2(style, color) {
  style.borderLeftWidth = 4;
  style.borderLeftColor = color;
}
