export default function checkBackStab(side, initPos, finPos) {
  const initY = Math.floor(initPos / 8);
  const finY = Math.floor(finPos / 8);
  if (side) {
    return initY > finY;
  } else {
    return finY > initY;
  }
}
