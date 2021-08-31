function loadSaved(navigation, saved, settings) {
  //navigate to VarLoad
  navigation.navigate("VarLoad", {
    varNum: saved.varNum,
    screen: String(saved.varNum),
    params: {
      settings: settings,
      options: saved.options,
      saved: saved,
    },
  });
}

export default loadSaved;
