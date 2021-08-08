//Compares the side of a player to the status number of the status
//Returns true if player and status number corresponds

function checkStatus(side, statusNumber) {
  if (
    (side === true && statusNumber === 1) ||
    (side === false && statusNumber === 2)
  ) {
    return true;
  } else {
    return false;
  }
}

export default checkStatus;
