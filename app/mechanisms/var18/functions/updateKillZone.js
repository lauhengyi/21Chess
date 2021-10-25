import getKillZone from "../getKillZone";

export default function updateKillZone(newDetails) {
  newDetails.killZone.countDown -= 1;
  if (killZone.countDown === 0) {
    //Remove every piece in the killzone
    let killedPieces = [];
    for (const piece of newDetails.boardLayout) {
      if (newDetails.killZone.matrix[piece.position]) {
        killedPieces.push(piece.id);
      }
    }
    for (const id of killedPieces) {
      newDetails.boardLayout = newDetails.boardLayout.filter(
        (piece) => piece.id !== id
      );
    }

    newDetails.killZone = getKillZone();
  }
}
