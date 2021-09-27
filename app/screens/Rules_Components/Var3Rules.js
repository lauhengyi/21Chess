import React from "react";
import RulesText from "./RulesText";

function Var3Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        It is just regular chess, except each piece have the ability to eat
        their own allied pieces.
      </RulesText>
      <RulesText settings={settings}>
        In other words, every piece can capture every other piece. Yeah that's
        it.
      </RulesText>
    </>
  );
}

export default Var3Rules;
