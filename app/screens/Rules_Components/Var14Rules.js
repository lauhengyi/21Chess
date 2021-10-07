import React from "react";
import RulesText from "./RulesText";

function Var14Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        This variation is like regular chess but your own pieces gave the
        ability to stack with other pieces, allowing it to gain the movements of
        both pieces.
      </RulesText>
      <RulesText settings={settings}>
        For a piece to stack, the piece must be able to 'capture' its own allied
        pieces, and the stacked piece will be where both pieces has stacked.
      </RulesText>
      <RulesText settings={settings}>
        Other than the king, every piece can stack with any other piece of the
        same side and of a different type, but once a piece is stacked, it can
        no longer be unstacked.
      </RulesText>
      <RulesText settings={settings}>
        Naturally, special type-specific moves like castling for rooks,
        promotion and double moving for pawns will no longer be possible after
        stacking.
      </RulesText>
      <RulesText settings={settings}>
        Also, there are some pieces that after stacking, will not have any
        improved mobility, like a queen stacked with a rook, a bishop or a pawn.
        However, sometimes stacking these pieces together can still prove useful
        in maneuvering the piece to a better location.
      </RulesText>
    </>
  );
}

export default Var14Rules;
