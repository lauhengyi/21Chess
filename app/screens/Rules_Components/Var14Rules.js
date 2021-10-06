import React from "react";
import RulesText from "./RulesText";

function Var14Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        This variation is like regular chess but your own pieces gave the
        ability to merge with other, gaining the movements of both pieces.
      </RulesText>
      <RulesText settings={settings}>
        For a piece to merge, the piece must be able to 'capture' its own allied
        pieces, and the merged piece will be where both pieces merge.
      </RulesText>
      <RulesText settings={settings}>
        The only piece that cannot be merged with another piece is the king.
      </RulesText>
      <RulesText settings={settings}>
        Once a piece is merged, it can no longer be unmerged.
      </RulesText>
    </>
  );
}

export default Var14Rules;
