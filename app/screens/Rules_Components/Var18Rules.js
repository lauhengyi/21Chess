import React from "react";
import RulesText from "./RulesText";

function Var18Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        This land is dangerous. Every now and then, meteor showers will occur in
        certain areas, obliterating anyone unfortunate enough to still be
        inside.
      </RulesText>
      <RulesText settings={settings}>
        In this variation, there will be designated 'Kill Zones' outlined, of
        which after a certain number of moves, any piece in that zone will be
        captured.
      </RulesText>
      <RulesText settings={settings}>
        The number of moves left will be indicated in the kill zones. After the
        countdown reaches 0, the pieces in that area will be removed from the
        baord and a new "Kill Zone" will be designated, starting a new
        countdown.
      </RulesText>
      <RulesText settings={settings}>
        If the king gets killed in the "Kill Zone", the opponent wins.
      </RulesText>
      <RulesText settings={settings}>
        In other words, just avoid the kill zones before the countdown reaches
        0.
      </RulesText>
    </>
  );
}

export default Var18Rules;
